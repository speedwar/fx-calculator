import { combineReducers } from 'redux'
import { currency } from './currency.reducer'

const rootReducer = combineReducers({
  currency
})

export default rootReducer
