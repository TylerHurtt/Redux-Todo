import API from 'goals-todos-api';

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

function receiveItems(todos, goals) {
  return {
    type: RECEIVE_ITEMS,
    todos,
    goals,
  };
}

export function handleReceiveItems() {
  return async (dispatch) => {
    const [todos, goals] = await Promise.all([
      API.fetchTodos(),
      API.fetchGoals(),
    ]);
    dispatch(receiveItems(todos, goals));
  };
}
