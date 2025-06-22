/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { Count } from './Count';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          todo: 'Just some demo tasks',
          id: self.crypto.randomUUID(),
        }, 
        {
          todo: 'As an example',
          id: self.crypto.randomUUID(),
        }],
      inputVal: '',
      editing: false,
      editVal: '',
    };

    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }));
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: [...state.todos, { todo: state.inputVal, id: self.crypto.randomUUID() }],
      inputVal: '',
    }));
  }

  removeTodo(todoId) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  }

  editTodo(todo) {
    this.setState((state) => ({
      ...state,
      editing: todo.id,
      editVal: todo.todo,
    }));
  }

  updateTodo(todoItem) {
    const todoIndex =  this.state.todos.findIndex((todo) => todo.id === todoItem.id);
    const todosCopy = JSON.parse(JSON.stringify(this.state.todos));

    todosCopy[todoIndex] = { todo: this.state.editVal, id: todoItem.id };

    this.setState((state) => ({
      ...state,
      todos: todosCopy,
      editing: false,
      editVal: '',
    }));
  }

  cancelUpdate() {
    this.setState((state) => ({
      ...state,
      editing: false,
      editVal: '',
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          <Count todos={this.state.todos} />
          {this.state.todos.map((todo) => {
            if (this.state.editing === todo.id) {
              return (
                <Fragment key={todo.id}>
                   <input
                    type="text"
                    name="task-entry"
                    value={this.state.editVal}
                    onChange={this.handleEditChange}
                  />
                  <button type="button" onClick={this.cancelUpdate}>
                    Cancel
                  </button>
                  <button type="button" onClick={() => this.updateTodo(todo)}>
                    Resubmit
                  </button>
                </Fragment>
              );
            } else {
              return (
                <li key={todo.id}>
                  {todo.todo}
                  <button type="button" onClick={() => this.removeTodo(todo.id)}>
                    Delete
                  </button>
                  <button type="button" onClick={() => this.editTodo(todo)}>
                    Edit
                  </button>
                </li>
              );
            }
          }
        )}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
