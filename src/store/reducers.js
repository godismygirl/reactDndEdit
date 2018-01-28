import { combineReducers } from 'redux'
import { ADD_LAYOUT, REMOVE_LAYOUT } from './actions'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Layout from '../components/layout'

const initialState = {
    availableComponent : [],
    layout:[1,2,3]
}

function updateLayout(state = [{i: 'a', x: 0, y: 0, w: 1, h: 2}], action){
    switch (action.type){
        case ADD_LAYOUT : 
            return addLayout(state, action)
        case REMOVE_LAYOUT : 
            return removeLayout(state, action)
        default:
            return state
    }
}

function addLayout(state, action){
    alert('trigger add layout')
    ReactDOM.render(
        <Layout />,action.dropNode
    )
    return Object.assign({},state.layout,[{i: 'a', x: 0, y: 0, w: 1, h: 2}])
}

function removeLayout(state, action){
    alert('trigger remove layout')
    console.log(state)
    return Object.assign({},state.layout,[{i: 'a', x: 0, y: 0, w: 1, h: 2}])
}

const visiualEditor = combineReducers({
    availableComponent: [],
    layout: updateLayout,
})

export default visiualEditor
  