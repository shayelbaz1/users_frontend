let nextTodoId = 0;
export const addTodo = (text) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id,
});

export function exampleAction(state) {
  return {
    type: "EXAMPLE_CASE",
    payload: state,
  };
}

export function setLoggedInUser(user) {
  console.log('user:', user)
  return {
    type: "SET_USER",
    payload: user,
  };
}
