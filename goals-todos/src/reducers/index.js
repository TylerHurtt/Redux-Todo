import { combineReducers } from 'redux';
import { todos } from '../actions/todos';
import { goals } from '../actions/goals';
import { loading } from '../actions/loading';

export default combineReducers({ todos, goals, loading });
