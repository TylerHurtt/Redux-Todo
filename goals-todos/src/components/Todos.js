import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import {
  handleAddTodo,
  handleRemoveTodo,
  handleToggleTodo,
} from '../actions/todos';

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ''))
    );
  };
  removeItem = (todo) => {
    this.props.dispatch(handleRemoveTodo(todo));
  };
  toggleComplete = (todo) => {
    this.props.dispatch(handleToggleTodo(todo));
  };
  render() {
    return (
      <div>
        <h2>Todo List</h2>
        <input
          type='text'
          ref={(input) => (this.input = input)}
          placeholder='Add Todo'
        />
        <button id='todo-btn' onClick={this.addItem}>
          Add Todo
        </button>
        <List
          items={this.props.todos}
          removeItem={this.removeItem}
          toggleComplete={this.toggleComplete}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todos);
