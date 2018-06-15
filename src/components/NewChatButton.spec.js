/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NewChatButton from './NewChatButton.jsx';

const mockProps = {
  classes: {
    newChatButton: 'some text a',
    modalWrapper: 'some text b',
    modal: 'some text c',
  },
  onCreateChat: jest.fn(),
  disabled: false,
};

describe('<NewChatButton />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <NewChatButton {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <NewChatButton {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when NewChatButton disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <NewChatButton {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
