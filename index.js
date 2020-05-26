/* Library Code */
// function createStore(reducer) {
//   // 1. The state.
//   let state;
//   // Array of listener functions
//   let listeners = [];
//   // 2. Get State.
//   const getState = () => state;
//   // 3. Listen for state changes.
//   const subscribe = (listener) => {
//     // push listener callback into listeners array
//     listeners.push(listener);
//     // return unsubscribe function
//     return () => {
//       // remove listener from listeners array
//       listeners = listeners.filter((l) => l !== listener);
//     };
//   };
//   // 4. Update state.
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach((listener) => listener());
//   };

//   return {
//     getState,
//     subscribe,
//     dispatch,
//   };
// }

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

// Custom dispatch
function checkAndDispatch(store, action) {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')
  )
    return alert('nope not a good idea');
  else if (action.type === ADD_GOAL && action.goal.name.includes('bitcoin'))
    return alert('nope not a good idea');
  else store.dispatch(action);
  s;
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

// Combine Reducers
// function app(state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     goals: goals(state.goals, action),
//   };
// }

const store = Redux.createStore(Redux.combineReducers({ todos, goals }));

store.subscribe(() => {
  const { todos, goals } = store.getState();

  todoList.innerHTML = '';
  goalList.innerHTML = '';

  todos.forEach((todo) => addTodoToDOM(todo));
  goals.forEach((goal) => addGoalToDOM(goal));
});

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
    checkAndDispatch(
      store,
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
    checkAndDispatch(
      store,
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
    checkAndDispatch(store, removeTodoAction(todo.id))
  );

  node.appendChild(text);
  node.appendChild(removeBtn);

  node.style.textDecoration = todo.complete ? 'line-through' : 'none';
  node.addEventListener('click', () =>
    checkAndDispatch(store, toggleTodoAction(todo.id))
  );

  todoList.appendChild(node);
}

const goalList = document.getElementById('goal-list');
function addGoalToDOM(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);
  const removeBtn = createRemoveBtn(() =>
    checkAndDispatch(store, removeGoalAction(goal.id))
  );

  node.appendChild(text);
  node.appendChild(removeBtn);

  node.style.textDecoration = goal.complete ? 'line-through' : 'none';
  node.addEventListener('click', () =>
    checkAndDispatch(store, toggleGoalAction(goal.id))
  );

  goalList.appendChild(node);
}
