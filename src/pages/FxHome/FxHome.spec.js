import React from 'react'
import { shallow } from 'enzyme'
import FxHome from './FxHome'

const setup = () => {
  const wrapper = shallow(<FxHome />)
  return { wrapper }
}

describe('<FxHome /> component', () => {
  it('renders component', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
