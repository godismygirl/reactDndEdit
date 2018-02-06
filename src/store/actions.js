const ADD_COMPONENT = 'ADD_COMPONENT';
const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
const REMOVE_LAYOUT = 'REMOVE_LAYOUT';
const RENDER_COMPONENT = 'RENDER_LAYOUT';

function addComponent(componentName , key){
    return {
        type : ADD_COMPONENT,
        key : key,
        component : componentName,
    }
}

export { ADD_COMPONENT, CHANGE_LAYOUT, REMOVE_LAYOUT, RENDER_COMPONENT, addComponent }
