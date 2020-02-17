import { currencyConstants } from 'rx/constants'

const initialState = {
  isCurrencyRatesRequest: false,
  isCurrencyRatesSuccess: false,
  isCurrencyRatesFailure: false,
  currencyRates: null,
  currencyRatesError: ''
}

export function currency(state = initialState, action) {
  switch (action.type) {
    case currencyConstants.CURRENCY_REQUEST:
      return {
        ...state,
        isCurrencyRatesRequest: true,
        isCurrencyRatesSuccess: false,
        isCurrencyRatesFailure: false,
      }
    case currencyConstants.CURRENCY_SUCCESS:
      return {
        ...state,
        isCurrencyRatesRequest: false,
        isCurrencyRatesSuccess: true,
        currencyRates: action.data,
      }
    case currencyConstants.CURRENCY_FAILURE:
      return {
        ...state,
        isCurrencyRatesFailure: true,
        currencyRatesError: action.error
      }
    default:
      return state
  }
}
