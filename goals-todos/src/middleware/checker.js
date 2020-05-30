import { ADD_TODO } from '../actions/todos';
import { ADD_GOAL } from '../actions/goals';

const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')
  )
    return alert('nope not a good idea');
  else if (action.type === ADD_GOAL && action.goal.name.includes('bitcoin'))
    return alert('nope not a good idea');
  return next(action);
};

export default checker;
