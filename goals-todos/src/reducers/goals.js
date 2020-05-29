import { ADD_GOAL, REMOVE_GOAL } from '../actions/goals';
import { RECEIVE_ITEMS } from '../actions/shared';

export default function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case TOGGLE_GOAL:
      return state.map((goal) =>
        goal.id !== action.id
          ? goal
          : {
              ...goal,
              complete: !goal.complete,
            }
      );
    case RECEIVE_ITEMS:
      return action.goals;
    default:
      return state;
  }
}
