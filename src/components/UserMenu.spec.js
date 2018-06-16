/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UserMenu from './UserMenu.jsx';

const mockProps = {
  classes: {
    userMenu: 'some text a',
    modalWrapper: 'some text b',
    modal: 'some text c',
  },
  onLogoutClick: jest.fn(),
  onEditProfileClick: jest.fn(),
  disabled: false,
};

describe('<UserMenu />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <UserMenu {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <UserMenu {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when UserMenu disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <UserMenu {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
