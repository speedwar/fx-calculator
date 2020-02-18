import { currencyConstants } from 'rx/constants'

const initialState = {
  isCurrencyRatesRequest: false,
  isCurrencyRatesSuccess: false,
  isCurrencyRatesFailure: false,
  currencyRates: null,
  currencyRatesError: {},
  currencyStore: {
    baseCurrencyAmount: null,
    baseCurrency: null,
    termCurrency: null,
  },
  currencyTDP: [ // Two decimal places currency
    'AUD',
    'CAD',
    'CNY',
    'CZK',
    'DKK',
    'EUR',
    'GBP',
    'JPY',
    'NOK',
    'NZD',
    'USD',
  ]
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
        currencyRatesError: action.error,
      }
 
    // `convert` button event
    case currencyConstants.STORE_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyStore: action.data,
      }
    default:
      return state
  }
}
