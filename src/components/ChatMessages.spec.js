/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatMessages from './ChatMessages.jsx';

jest.mock('./ChatMessageList', () => () => 'ChatMessageList');
jest.mock('./InputMessage', () => () => 'InputMessage');

const mockProps = {
  classes: {
    chatLayout: 'some text',
  },
  isConnected: true,
  sendMessage: jest.fn(),
  joinChat: jest.fn(),
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
  activeChat: {
    createdAt: '2018-03-16T10:53:23.200Z',
    creator: {
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      _id: '12345',
    },
    members: [
      {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        _id: '12345',
      },
    ],
    title: 'My Chat',
    updatedAt: '2018-03-16T10:53:23.200Z',
  },
};

describe('<ChatMessages />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatMessages {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatMessages {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when isConnected false', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatMessages {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
