/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatPage from './ChatPage.jsx';

jest.mock('./Sidebar', () => () => 'Sidebar');
jest.mock('./ChatHeader', () => () => 'ChatHeader');
jest.mock('./ChatMessages', () => () => 'ChatMessages');
jest.mock('./ErrorMessage', () => () => 'ErrorMessage');

const mockProps = {
  classes: {
    root: 'some text',
  },
  isConnected: true,
  error: null,
  sendMessage: jest.fn(),
  fetchAllChats: jest.fn(),
  fetchMyChats: jest.fn(),
  setActiveChat: jest.fn(),
  socketsConnect: jest.fn(),
  mountChat: jest.fn(),
  unmountChat: jest.fn(),
  logout: jest.fn(),
  createChat: jest.fn(),
  deleteChat: jest.fn(),
  joinChat: jest.fn(),
  leaveChat: jest.fn(),
  editUser: jest.fn(),
  messages: [
    {
      chatId: '12345',
      content: 'some text',
      sender: {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        _id: '12345',
      },
      createdAt: '2018-03-16T10:53:23.200Z',
    },
  ],
  activeUser: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  },
  chats: {
    active: {},
    all: [],
    my: [],
  },
  match: {
    params: {
      chatId: '12345',
    },
  },
};

describe('<ChatPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter initialEntries={['/chat/123']}>
        <Route path="/chat/:chatId?" render={props => <ChatPage {...mockProps} {...props} />} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/chat/123']}>
          <Route path="/chat/:chatId?" render={props => <ChatPage {...mockProps} {...props} />} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when isConnected false', () => {
    const tree = renderer
      .create(<MemoryRouter initialEntries={['/chat/123']}>
          <Route path="/chat/:chatId?" render={props => <ChatPage {...mockProps} {...props} isConnected={false} />} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
