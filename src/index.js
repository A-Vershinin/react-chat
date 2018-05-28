import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
import App from './components/App.jsx';


const node = document.getElementById('root');

ReactDOM.render(<App />, node);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(<App />, node)
  })
}
