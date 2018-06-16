/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Sidebar from './Sidebar.jsx';

jest.mock('./ChatList', () => () => 'ChatList');

const mockProps = {
  classes: {
    drawerPaper: 'some text a',
    drawerHeader: 'some text b',
  },
  chats: {
    active: {},
    all: [],
    my: [],
  },
  createChat: jest.fn(),
  isConnected: false,
};

describe('<Sidebar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Sidebar {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <Sidebar {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when isConnected true', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <Sidebar {...mockProps} isConnected />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
