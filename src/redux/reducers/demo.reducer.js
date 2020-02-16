import { demoConstants } from 'rx/constants'

const initialState = {
  isDemoRequest: null,
  isDemoSuccess: null,
  isDemoFailure: null,
  demo: null,
  demoError: null
}

export function demo(state = initialState, action) {
  switch (action.type) {
    case demoConstants.DEMO_REQUEST:
      return {
        ...state,
        isDemoRequest: true,
        isDemoSuccess: null,
        isDemoFailure: null,
        demo: null,
        demoError: null
      }
    case demoConstants.DEMO_SUCCESS:
      return {
        ...state,
        isDemoRequest: null,
        isDemoSuccess: true,
        isDemoFailure: null,
        demo: action.data,
        demoError: null
      }
    case demoConstants.DEMO_FAILURE:
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
