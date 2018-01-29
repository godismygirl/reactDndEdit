import { combineReducers } from 'redux'
import { ADD_LAYOUT, CHANGE_LAYOUT, REMOVE_LAYOUT } from './actions'

function updateLayout(state = [], action){
    switch (action.type){
        case ADD_LAYOUT : 
            return addLayout(state, action)
        case CHANGE_LAYOUT : 
            return changeLayout(state, action)
        case REMOVE_LAYOUT : 
            return removeLayout(state, action)
        default:
            return state
    }
}

function addLayout(state, action){
    console.log('===trigger add layout===')
    console.log(state)
 
    let lalal = Object.assign([],state,[{i: "0", x: 0, y: 0, w: 4, h: 2, layout:[{i: "01", x: 0, y: 0, w: 2, h: 2},{i: "02", x: 2, y: 0, w: 2, h: 2}]}])

    return lalal
}

function changeLayout(state, action){
    console.log('===trigger change layout===')
    console.log(action)
    return state;
    //return Object.assign({},state.layout,[{i: 'a', x: 0, y: 0, w: 1, h: 2}])
}

function removeLayout(state, action){
    alert('trigger remove layout')
    console.log(action)
    return Object.assign({},state.layout,[{i: 'a', x: 0, y: 0, w: 1, h: 2}])
}

const visiualEditor = combineReducers({
    availableComponent: [],
    layout: updateLayout,
})

export default visiualEditor
  