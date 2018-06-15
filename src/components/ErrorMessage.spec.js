/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage.jsx';

// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({ fromNow: () => '2 days ago' }));

const mockProps = {
  error: new Error('Boom!'),
};

describe('<ErrorMessage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorMessage {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ErrorMessage {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
