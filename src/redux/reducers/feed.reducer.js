import { feedConstants } from 'rx/constants'

const initialState = {
  isDemoRequest: null,
  isDemoSuccess: null,
  isDemoFailure: null,
  demo: null,
  demoError: null
}

export function feed(state = initialState, action) {
  switch (action.type) {
    case feedConstants.FEED_REQUEST:
      return {
        ...state,
        isDemoRequest: true,
        isDemoSuccess: null,
        isDemoFailure: null,
        demo: null,
        demoError: null
      }
    case feedConstants.FEED_SUCCESS:
      return {
        ...state,
        isDemoRequest: null,
        isDemoSuccess: true,
        isDemoFailure: null,
        demo: action.data,
        demoError: null
      }
    case feedConstants.FEED_FAILURE:
      return {
        ...state,
        isDemoRequest: null,
        isDemoSuccess: null,
        isDemoFailure: true,
        demoError: action.error
      }
    default:
      return state
  }
}
