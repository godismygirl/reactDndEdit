import { combineReducers } from 'redux'
import { CHANGE_LAYOUT, REMOVE_LAYOUT, ADD_COMPONENT } from './actions'
import defaultEchartsOption from '../config/defaultEchartsOption'

function updateLayout(state = [], action){

    switch (action.type){
        case ADD_COMPONENT : 
            return addComponent(state, action)
        case CHANGE_LAYOUT : 
            return changeLayout(state, action)
        case REMOVE_LAYOUT : 
            return removeLayout(state, action)
        default:
            return state
    }
}

function addComponent(state, action){
    console.log('===trigger add component===')
    // console.log(action)
    // console.log(state)
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

    let nextState = Object.assign([], state);
    let location = nextState;
    let i = location.length.toString();
    let h = 2;

    if(action.key !=='root'){
        let indexKey = action.key.split('');
        indexKey.forEach(element => {
            location = location[parseInt(element, 10)].layout;
        });
        i = action.key + location.length.toString();
        h = 1;
    }

    location.push({
        i : i,
        w : 4,
        h : h,
        x : getPosition(location).x,
        y : getPosition(location).y,
        layout : [], 
        component : action.component,
    });

    return nextState;
}

function changeLayout(state, action){
    console.log('===trigger change layout===')
    //console.log(action)
    let nextState = Object.assign([], state);
    let location = nextState;

    if(action.key !== 'root' ){
        let indexKey = action.key.split('');
        indexKey.forEach(element => {
            location = location[parseInt(element, 10)].layout;
        });
    }

    action.newLayout.forEach( (item, index) => {
        location[index].x = item.x ;
        location[index].y = item.y ;
        location[index].w = item.w ;
        location[index].h = item.h ;
    })
    //console.log(nextState)
    return nextState;
}

function removeLayout(state, action){
    //alert('trigger remove layout')
    let nextState = Object.assign([], state);

    return nextState;
}

function updateComponents(state = {}, action){
    switch (action.type){
        case ADD_COMPONENT : 
            return renderComponent(state, action)
        default:
            return state
    }
}

function renderComponent(state={}, action){
    console.log('====render component====')
    //console.log(action)
    let nextState = Object.assign({}, state);

    if(!state[action.key]){
        nextState[action.key] = defaultEchartsOption;
    }
    
    return nextState
}


const visiualEditor = combineReducers({
    components: updateComponents,
    layout: updateLayout,
})

export default visiualEditor
  