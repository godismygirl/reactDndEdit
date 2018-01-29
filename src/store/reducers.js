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
    console.log(action)
    console.log(state)

    function addRootLayoutItem(state){
        let newState = Object.assign([], state);

        function getPosition(){
            let x = 0;
            let y = 0;
            if(newState.length > 0){
                let prevItem = newState[newState.length - 1];
                console.log(prevItem)
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
        let newProp = {
            i : newState.length.toString(),
            w : 4,
            h : 2,
            x : getPosition().x,
            y : getPosition().y,
        }

        newState.push(newProp);

        return newState
    }

    function addInnerLayoutItem(){

    }

    if(action.key === 'root'){
        return addRootLayoutItem(state)
        //return Object.assign([], state, {i: (state.length + 1).toString(),})
    }

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
  