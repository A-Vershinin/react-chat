/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatMessageList from './ChatMessageList.jsx';

jest.mock('./ChatMessageItem', () => () => 'ChatMessageItem');

const mockProps = {
  classes: {
    messagesWrapper: 'some text',
    paper: 'some text',
  },
  match: {
    params: {
      chatId: '12345',
    },
  },
  activeUser: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  },
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
};

describe('<ChatMessageList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatMessageList {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatMessageList {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
