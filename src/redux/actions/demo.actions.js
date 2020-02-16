import { demoConstants } from 'rx/constants'
// import { demoService } from 'utils'

export const demoActions = {
  getDemo
}

/**
 * request product list
 *
 * Since API is not given, I tried to mimic promise constructor
 * It will always fetch date from products.json
 */
function getDemo() {
  return (dispatch) => {
    dispatch(request())
    dispatch(success())

    /**
     * If API is available, use below code
     */
    // demoService.getDemo()
    //   .then((response) => {
    //     dispatch(success(response));
    //   })
    //   .catch((error) => {
    //     dispatch(failure(error));
    //   });
  };

  function request(data) {
    return { type: demoConstants.DEMO_REQUEST, data }
  }
  function success(data) {
    return { type: demoConstants.DEMO_SUCCESS, data }
  }
  // function failure(error) {
  //   return { type: demoConstants.DEMO_FAILURE, error }
  // }
}
