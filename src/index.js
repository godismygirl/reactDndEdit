import React from 'react'
import ReactDOM from 'react-dom'
import Viewport from './page/viewport'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import visiualEditor from './store/reducers'

let store = createStore(visiualEditor)

ReactDOM.render(
    <Provider store={store}>
        <Viewport />
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
