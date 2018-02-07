import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './page/editor'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import editorStore from './store/reducers'

let store = createStore(editorStore)

ReactDOM.render(
    <Provider store={store}>
        <Editor />
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
