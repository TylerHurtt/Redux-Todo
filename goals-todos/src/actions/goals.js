import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}
function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

export function handleAddGoal(goal, callback) {
  return (dispatch) => {
    return API.saveGoal(goal)
      .then((goal) => dispatch(addGoal(goal), callback()))
      .catch(() => {
        alert('An error occurred, please try again.');
      });
  };
}
export function handleRemoveGoal(goal) {
  return (dispatch) => {
    dispatch(removeGoalAction(goal.id));
    return API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoalAction(goal));
      alert('An error occurred, please try again.');
    });
  };
}
