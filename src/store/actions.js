import { getDefaultOptions } from '../util/helper'

const ADD_COMPONENT = 'ADD_COMPONENT';
const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
const REMOVE_LAYOUT = 'REMOVE_LAYOUT';
const RENDER_PANEL = 'RENDER_PANEL';
const UPDATE_OPTIONS = 'UPDATE_OPTIONS';

function addComponent(componentName , dropAreaKey){
    let defaultOptions = getDefaultOptions(componentName);
    return {
        type : ADD_COMPONENT,
        dropAreaKey : dropAreaKey,
        component : componentName,
        options : defaultOptions,
    }
}

function changeLayout(dropAreaKey, newLayout){
    return {
        type : CHANGE_LAYOUT,
        dropAreaKey : dropAreaKey,
        newLayout : newLayout,
    }
}

function renderPanel(dropAreaKey, index){
    return {
        type : RENDER_PANEL,
        dropAreaKey : dropAreaKey,
        index : parseInt(index, 10),
    }
}

function updateOptions(activeComponent, newOptions){
    return {
        type : UPDATE_OPTIONS,
        activeComponent : activeComponent,
        newOptions : newOptions,
    }
}

export { 
    ADD_COMPONENT, 
    CHANGE_LAYOUT, 
    REMOVE_LAYOUT, 
    RENDER_PANEL, 
    UPDATE_OPTIONS, 
    
    addComponent, 
    changeLayout, 
    renderPanel,
    updateOptions,
}
