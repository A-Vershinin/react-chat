/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import WelcomePage from './WelcomePage.jsx';

jest.mock('./LoginForm', () => () => 'LoginForm');
jest.mock('./SignUpForm', () => () => 'SignUpForm');
jest.mock('./ErrorMessage', () => () => 'ErrorMessage');

const mockProps = {
  classes: {
    paper: 'some text a',
    tabContent: 'some text b',
  },
  login: jest.fn(),
  signup: jest.fn(),
  isAuthenticated: false,
  error: null,
};

describe('<WelcomePage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/welcome" render={props => <WelcomePage {...mockProps} {...props} />} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/']}>
          <Route path="/welcome" render={props => <WelcomePage {...mockProps} {...props} />} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when user is isAuthenticated', () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/']}>
          <Route path="/welcome" render={props => <WelcomePage {...mockProps} {...props} />} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
