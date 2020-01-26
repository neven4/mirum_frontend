import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Provider from './Context/AppProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>
, document.getElementById('root'));

serviceWorker.register();

