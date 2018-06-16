/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatList from './ChatItem.jsx';

jest.mock('./ChatItem', () => () => 'ChatItem');

const mockProps = {
  classes: {
    chatsList: 'lorem lorem',
    noChats: 'lorem lorem abc',
  },
  chats: [
    {
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
  ],
  activeChat: {
    _id: '12345',
    title: 'My Chat',
    createdAt: '2018-03-16T10:53:23.200Z',
    updatedAt: '2018-03-16T10:53:23.200Z',
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
  },
  disabled: false,
};

describe('<ChatList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatList {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatList {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when ChatList disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatList {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
