// Action types
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon'
  }
}

{
  type: 'REMOVE_GOAL',
  id: 0
}

function todos(state = [], action) {
  if(action.type === 'ADD_TODO') 
    return state.concat([action.todo])

  return state
}

function createStore() {
  // 1. The state.
  let state;
  // Array of listener functions
  let listeners = [];
  // 2. Get State.
  const getState = () => state;
  // 3. Listen for state changes.
  const subscribe = (listener) => {
    // push listener callback into listeners array
    listeners.push(listener);
    // return unsubscribe function
    return () => {
      // remove listener from listeners array
      listeners.filter((l) => l !== listener);
    };
  };
  return {
    getState,
    subscribe,
  };
  // 4. Update state.
}
