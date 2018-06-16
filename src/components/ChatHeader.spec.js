/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatHeader from './ChatHeader.jsx';

jest.mock('./Avatar', () => () => 'Avatar');
jest.mock('./ChatMenu', () => () => 'ChatMenu');
jest.mock('./UserMenu', () => () => 'UserMenu');

const mockProps = {
  activeUser: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  },
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
  logout: jest.fn(),
  leaveChat: jest.fn(),
  deleteChat: jest.fn(),
  editUser: jest.fn(),
  isConnected: true,
};

describe('<ChatHeader />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatHeader {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without active chat', () => {
    const tree = renderer.create(<ChatHeader {...mockProps} activeChat={null} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
