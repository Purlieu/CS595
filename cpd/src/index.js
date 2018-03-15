import React from 'react';
import ReactDOM from 'react-dom';
import './mainpage.css';
import App from './SpotifyPlayer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.querySelector('#root'));

registerServiceWorker();