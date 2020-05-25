/* Library Code */
function createStore(reducer) {
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
      listeners = listeners.filter((l) => l !== listener);
    };
  };
  // 4. Update state.
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

/* App Code */
// Constants
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

// Reducer function
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return (state = state.map((todo) =>
        todo.id !== action.id
          ? todo
          : {
              ...todo,
              complete: !todo.complete,
            }
      ));
    default:
      return state;
  }
}

// Reducer function
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case TOGGLE_GOAL:
      return (state = state.map((goal) =>
        goal.id !== action.id
          ? goal
          : {
              ...goal,
              complete: !goal.complete,
            }
      ));
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  },
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  },
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  },
});

store.dispatch({
  type: 'REMOVE_TODO',
  id: 1,
});

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0,
});

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Learn Redux',
  },
});

store.dispatch({
  type: 'ADD_GOAL',
  goal: {
    id: 1,
    name: 'Lose 20 pounds',
  },
});

store.dispatch({
  type: 'REMOVE_GOAL',
  id: 0,
});
