export const ADD_COMPONENT = 'ADD_COMPONENT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const REMOVE_LAYOUT = 'REMOVE_LAYOUT';

export function addComponent(componentName , key){
    return {
        type : ADD_COMPONENT,
        key : key,
        component : componentName,
    }
}
