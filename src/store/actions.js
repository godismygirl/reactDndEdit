import { getDefaultOptions } from '../util/helper'

const ADD_COMPONENT = 'ADD_COMPONENT';
const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
const REMOVE_LAYOUT = 'REMOVE_LAYOUT';
const RENDER_PANEL = 'RENDER_PANEL';

function addComponent(componentName , key){
    let option = getDefaultOptions(componentName);
    return {
        type : ADD_COMPONENT,
        key : key,
        component : {
            name : componentName,
            option : option
        }
    }
}

export { ADD_COMPONENT, CHANGE_LAYOUT, REMOVE_LAYOUT, RENDER_PANEL, addComponent }
