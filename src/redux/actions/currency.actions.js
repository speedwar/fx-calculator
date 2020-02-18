import { currencyConstants } from 'rx/constants'
import currencyRates from 'utils/mockdata/currencyRates'

export const currencyActions = {
  getCurrency,
  storeCurrency,
}

/**
 * get currency rates
 * Since API is not given, I tried to mimic promise constructor
 * It will always fetch date from currencyRates.json
 */
function getCurrency() {
  return (dispatch) => {
    dispatch(request())
    dispatch(success(currencyRates))

    /**
     * If API is available, you could use below code
     */
    // currencyService.getCurrency()
    //   .then((response) => {
    //     dispatch(success(response));
    //   })
    //   .catch((error) => {
    //     dispatch(failure(error));
    //   });
  }

  function request(data) {
    return { type: currencyConstants.CURRENCY_REQUEST, data }
  }
  function success(data) {
    return { type: currencyConstants.CURRENCY_SUCCESS, data }
  }
  // function failure(error) {
  //   return { type: demoConstants.CURRENCY_FAILURE, error }
  // }
}

function storeCurrency(data) {
  return (dispatch) => {
    dispatch(success(data))
  }

  function success(data) {
    return { type: currencyConstants.STORE_CURRENCY_SUCCESS, data }
  }
}
