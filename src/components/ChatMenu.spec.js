/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ChatMenu from './ChatMenu.jsx';

const mockProps = {
  disabled: false,
  activeUser: {
    isMember: true,
    isCreator: true,
    isChatMember: true,
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
  },
  onLeaveChat: jest.fn(),
  onDeleteChat: jest.fn(),
};

describe('<ChatMenu />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatMenu {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ChatMenu {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when ChatMenu disabled', () => {
    const tree = renderer.create(<ChatMenu {...mockProps} disabled />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
