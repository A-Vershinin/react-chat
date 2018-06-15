/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatMessageItem from './ChatMessageItem.jsx';

jest.mock('./Avatar', () => () => 'Avatar');
// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({ fromNow: () => '2 days ago' }));

const mockProps = {
  classes: {
    message: 'some text',
    messageFromMe: 'some text',
    messageWrapper: 'some text',
    messageWrappperFromMe: 'some text',
    statusMessage: 'some text',
    statusMessageUser: 'some text',
  },
  statusMessage: true,
  sender: {
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    _id: '12345',
  },
  activeUser: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  },
  content: 'some content',
  createdAt: '2018-03-16T10:53:23.200Z',
};

describe('<ChatMessageItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatMessageItem {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatMessageItem {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when statusMessage false', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatMessageItem {...mockProps} statusMessage />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
