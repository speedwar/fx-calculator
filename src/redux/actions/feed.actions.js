import { demoConstants } from 'rx/constants'
import { feedService } from 'utils'

export const feedActions = {
  getFeed
}

function getFeed() {
  return (dispatch) => {
    dispatch(request())
    feedService.getDemo()
      .then((response) => {
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(data) {
    return { type: demoConstants.DEMO_REQUEST, data }
  }
  function success(data) {
    return { type: demoConstants.DEMO_SUCCESS, data }
  }
  function failure(error) {
    return { type: demoConstants.DEMO_FAILURE, error }
  }
}
