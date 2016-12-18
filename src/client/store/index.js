// third party imports
import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import promiseMiddleware from "redux-promise"
// local imports
import reducer from "./reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, promiseMiddleware)
  )
)

export default store
