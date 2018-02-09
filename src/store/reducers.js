import { combineReducers } from 'redux'
import { CHANGE_LAYOUT, REMOVE_LAYOUT, ADD_COMPONENT, RENDER_PANEL, UPDATE_OPTIONS } from './actions'

// const initialState = {
//     currentOption : {},
//     layout : []
// }
function updateLayout(state = {}, action){

    switch (action.type){
        case ADD_COMPONENT : 
            return addComponent(state, action)
        case CHANGE_LAYOUT : 
            return changeLayout(state, action)
        case REMOVE_LAYOUT : 
            return removeLayout(state, action)
        case UPDATE_OPTIONS :
            return updateOptions(state, action)
        default:
            return state
    }
}

function addComponent(state, action){

    function getPosition(arrLayout){
        let x = 0;
        let y = 0;
        if(arrLayout.length > 0){
            let prevItem = arrLayout[arrLayout.length - 1];
            if( 12 - prevItem.x - prevItem.w >= 4 ){
                x = prevItem.x + prevItem.w;
                y = prevItem.y
            }
        }
        return {
            x : x,
            y : y,
        }
    }

    console.log("======== add component ========")
    let nextState = Object.assign({}, state);
    if(!nextState[action.dropAreaKey]){
        nextState[action.dropAreaKey] = []
    }

    nextState[action.dropAreaKey] = nextState[action.dropAreaKey].concat({
        i : nextState[action.dropAreaKey].length.toString(),
        w : 4,
        h : 2,
        x : getPosition(nextState[action.dropAreaKey]).x,
        y : getPosition(nextState[action.dropAreaKey]).y,
        component : action.component,
        options : action.options,
    })
    console.log(nextState)
    return nextState
}

function changeLayout(state, action){
    console.log('===== layout change =====')
    //console.log(action)
    let nextState = Object.assign([], state);

    action.newLayout.forEach( (item, index) => {
        nextState[action.dropAreaKey][index].x = item.x ;
        nextState[action.dropAreaKey][index].y = item.y ;
        nextState[action.dropAreaKey][index].w = item.w ;
        nextState[action.dropAreaKey][index].h = item.h ;
    })
    console.log(nextState)
    return nextState;
}

function removeLayout(state, action){
    //alert('trigger remove layout')
    let nextState = Object.assign([], state);

    return nextState;
}

function updateOptions(state, action){
    console.log("===== update Options ======")
    let nextState = Object.assign([], state);
    nextState[action.activeComponent.dropAreaKey][action.activeComponent.index].options = JSON.parse(action.newOptions);
    console.log(nextState)
    return nextState;
}

function activeComponent(state={}, action){
    switch (action.type){
        case RENDER_PANEL : {
            console.log('==========render panel============')
            let nextState = Object.assign("", state);
            nextState = {
                dropAreaKey : action.dropAreaKey,
                index : action.index,
            }
            console.log(nextState)
            return nextState;
        }
        default : 
            return state;
    }
}

const visiualEditor = combineReducers({
    activeComponent,
    layout : updateLayout,
})

export default visiualEditor
  