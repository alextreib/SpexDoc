import { combineReducers, createStore } from "redux";

// Only understand parts of it. 
// Logout working, 
// Source: https://blog.tylerbuchea.com/super-simple-react-redux-application-example/
export const loginRedux = (loginState) => ({
  type: "LOGIN",
  loginState,
});

export const logoutRedux = () => ({
  type: "LOGOUT",
});

// reducers.js
export const loginState = (state = {}, action) => {
  console.log("redux update");
  switch (action.type) {
    case "LOGIN":
      return action.loginState;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  loginState,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
