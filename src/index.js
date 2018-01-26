import React from 'react';
import ReactDOM from 'react-dom';
import Viewport from './page/viewport';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <Viewport />
    , document.getElementById('root')
);

registerServiceWorker();
