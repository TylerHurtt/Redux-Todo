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

// Action creators
function addTodoAction(todo) {
  return {
    type: 'ADD_TODO',
    todo: { ...todo },
  };
}
function removeTodoAction(id) {
  return {
    type: 'REMOVE_TODO',
    id,
  };
}
function toggleTodoAction(id) {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
}
function addGoalAction(goal) {
  return {
    type: 'ADD_GOAL',
    goal: { ...goal },
  };
}
function removeGoalAction(id) {
  return {
    type: 'REMOVE_GOAL',
    id,
  };
}
function toggleGoalAction(id) {
  return {
    type: 'TOGGLE_GOAL',
    id,
  };
}

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

// Dom Code
let todoId = -1;
let goalId = -1;
function generateId(listString) {
  console.log(listString);
  if (listString !== 'todo' && listString !== 'goal') throw new error();
  return listString === 'todo' ? (todoId += 1) : (goalId += 1);
}
const todoInput = document.getElementById('todo');
function addTodo() {
  const name = todoInput.value;
  if (name !== '') {
    todoInput.value = '';
    store.dispatch(
      addTodoAction({
        id: generateId('todo'),
        name,
        complete: false,
      })
    );
  }
}
const goalInput = document.getElementById('goal');
function addGoal() {
  const name = goalInput.value;
  if (name !== '') {
    goalInput.value = '';
    store.dispatch(
      addGoalAction({
        id: generateId('goal'),
        name,
        complete: false,
      })
    );
  }
}

const todoButton = document.getElementById('todo-btn');
const goalButton = document.getElementById('goal-btn');

todoButton.addEventListener('click', addTodo);
goalButton.addEventListener('click', addGoal);

function createRemoveBtn(onClick) {
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'X';
  removeBtn.style.backgroundColor = 'red';
  removeBtn.style.color = 'white';

  removeBtn.addEventListener('click', onClick);
  return removeBtn;
}

const todoList = document.getElementById('todo-list');
function addTodoToDOM(todo) {
  const node = document.createElement('li');
  const text = document.createTextNode(todo.name);
  const removeBtn = createRemoveBtn(() =>
    store.dispatch(removeTodoAction(todo.id))
  );

  node.appendChild(text);
  node.appendChild(removeBtn);

  node.style.textDecoration = todo.complete ? 'line-through' : 'none';
  node.addEventListener('click', () =>
    store.dispatch(toggleTodoAction(todo.id))
  );

  todoList.appendChild(node);
}

const goalList = document.getElementById('goal-list');
function addGoalToDOM(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);
  const removeBtn = createRemoveBtn(() =>
    store.dispatch(removeGoalAction(goal.id))
  );

  node.appendChild(text);
  node.appendChild(removeBtn);

  node.style.textDecoration = goal.complete ? 'line-through' : 'none';
  node.addEventListener('click', () =>
    store.dispatch(toggleGoalAction(goal.id))
  );

  goalList.appendChild(node);
}

const store = createStore(app);

store.subscribe(() => {
  const { todos, goals } = store.getState();

  todoList.innerHTML = '';
  goalList.innerHTML = '';

  todos.forEach((todo) => addTodoToDOM(todo));
  goals.forEach((goal) => addGoalToDOM(goal));
});

// store.dispatch(
//   addTodoAction({
//     id: 0,
//     name: 'Walk the dog',
//     complete: false,
//   })
// );

// store.dispatch(
//   addTodoAction({
//     id: 1,
//     name: 'Wash the car',
//     complete: false,
//   })
// );

// store.dispatch(
//   addTodoAction({
//     id: 2,
//     name: 'Go to the gym',
//     complete: true,
//   })
// );

// store.dispatch(removeTodoAction(1));

// store.dispatch(toggleTodoAction(0));

// store.dispatch(
//   addGoalAction({
//     id: 0,
//     name: 'Learn Redux',
//   })
// );

// store.dispatch(
//   addGoalAction({
//     id: 1,
//     name: 'Lose 20 pounds',
//   })
// );
//
// store.dispatch(removeGoal(0));
