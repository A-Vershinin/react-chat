/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm.jsx';

const mockProps = {
  classes: {
    signUpButton: 'some text',
  },
  onSubmit: jest.fn(),
};

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <LoginForm {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <LoginForm {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
