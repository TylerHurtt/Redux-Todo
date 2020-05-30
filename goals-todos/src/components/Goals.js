import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { handleAddGoal, handleRemoveGoal } from '../actions/goals';

class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddGoal(this.input.value, () => (this.input.value = ''))
    );
  };
  removeItem = (goal) => {
    this.props.dispatch(handleRemoveGoal(goal));
  };
  render() {
    return (
      <div>
        <h2>Goal List</h2>
        <input
          type='text'
          ref={(input) => (this.input = input)}
          placeholder='Add Goal'
        />
        <button id='goal-btn' onClick={this.addItem}>
          Add Goal
        </button>
        <List items={this.props.goals} removeItem={this.removeItem} />
      </div>
    );
  }
}

export default connect((state) => ({
  goals: state.goals,
}))(Goals);
