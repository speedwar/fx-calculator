import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'rx/reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function promiseMiddleware({dispatch}) {
  const isPromise = (val) => (
    val && typeof val.then === 'function'
  )

  return (next) => (action) => {
    return isPromise(action.payload)
      ? action.payload.then(
          (result) => dispatch({...action, payload: result}),
          (error) => dispatch({...action, payload: error, error: true})
        )
      : next(action)
  }
}

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      promiseMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  )
)
