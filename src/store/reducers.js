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
    // console.log(action)
    // console.log(state)

    function getPosition(arrLayout){
        let x = 0;
        let y = 0;
        if(arrLayout.length > 0){
            let prevItem = arrLayout[arrLayout.length - 1];
            console.log(prevItem)
            if( 12 - prevItem.x - prevItem.w >= 4 ){
                x = prevItem.x + prevItem.w;
                y = prevItem.y
            }
        }
        //console.log("x: "+x+' / y: '+y)
        return {
            x : x,
            y : y,
        }
    }

    function addRootLayoutItem(state){
        let newState = Object.assign([], state);

        newState.push({
            i : newState.length.toString(),
            w : 4,
            h : 2,
            x : getPosition(newState).x,
            y : getPosition(newState).y,
            layout : [],
        });

        return newState
    }

    function addInnerLayoutItem(state, key){
        let newState = Object.assign([], state);
        let location = newState;
        let indexKey = key.split('');
        indexKey.forEach(element => {
            location = location[parseInt(element)].layout;
        });

        location.push({
            i : key + location.length.toString(),
            w : 4,
            h : 1,
            x : getPosition(location).x,
            y : getPosition(location).y,
            layout : [],
        });

        return newState;
    }

    if(action.key === 'root'){
        return addRootLayoutItem(state)
    }else{
        return addInnerLayoutItem(state, action.key)
    }
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
  