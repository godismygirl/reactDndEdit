import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import {observe} from './game';
import registerServiceWorker from './registerServiceWorker';
observe(knightPosition => ReactDOM.render(
    <Board knightPosition={knightPosition}/>
    , document.getElementById('root'))
);

registerServiceWorker();
