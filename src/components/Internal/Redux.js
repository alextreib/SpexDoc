import {
  combineReducers,
  createStore,
} from 'redux';

// actions.js
export const activateGeod = geod => ({
  type: 'ACTIVATE_GEOD',
  geod,
});

export const closeGeod = () => ({
  type: 'CLOSE_GEOD',
});

// reducers.js
export const geod = (state = {}, action) => {
  console.log("redux update")
  switch (action.type) {
    case 'ACTIVATE_GEOD':
      return action.geod;
    case 'CLOSE_GEOD':
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  geod,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
};

export const store = configureStore();





    // // Its API is { subscribe, dispatch, getState }.
    // let store = createStore(counterReducer);

    // // You can use subscribe() to update the UI in response to state changes.
    // // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // // There may be additional use cases where it's helpful to subscribe as well.

    // store.subscribe(() => console.log(store.getState()));

    // // The only way to mutate the internal state is to dispatch an action.
    // // The actions can be serialized, logged or stored and later replayed.
    // store.dispatch({ type: "counter/incremented" });
    // // {value: 1}

    // console.log(store);
