import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import FxCalculator from './FxCalculator'

const mockStore = configureStore()

// redux states
const initialState = {}

const defaultProps = {
  currencyStore: {
    baseCurrencyAmount: 10,
    baseCurrency: 'AUD',
    termCurrency: 'USD',
  },
}

//creates the store with any initial state or middleware needed  
const setup = (partialProps) => {
  const props = {
    ...defaultProps,
    ...partialProps,
  }
  const store = mockStore(initialState)
  const wrapper = shallow(
    <Provider store={store}>
      <FxCalculator { ... props } />
    </Provider>
    ).dive()

  return { wrapper, props  }
}

describe('<FxCalculator /> component', () => {
  it('renders component with snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
