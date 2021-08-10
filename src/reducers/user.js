const initialState = {
  loggedInUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { loggedInUser: action.payload };
    case "LOGOUT":
      return { loggedInUser: {} };

    default:
      return state;
  }
};

export default userReducer;
