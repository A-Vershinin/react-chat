/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ChatItem from './ChatItem.jsx';

jest.mock('./Avatar', () => () => 'Avatar');
// Return a fixed timestamp when moment().fromNow() is called
jest.mock('moment', () => () => ({ fromNow: () => '2 days ago' }));

const mockProps = {
  classes: {
    activeItem: 'lorem lorem',
  },
  title: 'some title',
  chatId: '12345',
  active: false,
  disabled: false,
  createdAt: '2018-03-16T10:53:23.200Z',
};

describe('<ChatItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ChatItem {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatItem {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when chatItem active', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatItem {...mockProps} active />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders when chatItem disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <ChatItem {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
