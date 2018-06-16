/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import InputMessage from './InputMessage.jsx';

const mockProps = {
  classes: {
    messageInputWrapper: 'some text',
    messageInput: 'some text 2',
  },
  onJoinButtonClick: jest.fn(),
  showJoinButton: false,
  disabled: false,
};

describe('<InputMessage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <InputMessage {...mockProps} />
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <InputMessage {...mockProps} />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders when chatItem disabled', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <InputMessage {...mockProps} disabled />
              </MemoryRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders when show joinButton', () => {
    const tree = renderer
      .create(<MemoryRouter>
          <InputMessage {...mockProps} showJoinButton />
              </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
