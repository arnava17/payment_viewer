import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from "./containers/App";
import store from "./store/index";

const render = function() {
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();
store.subscribe(render);

