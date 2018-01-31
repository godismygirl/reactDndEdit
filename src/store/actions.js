export const ADD_LAYOUT = 'ADD_LAYOUT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const REMOVE_LAYOUT = 'REMOVE_LAYOUT';
export const ADD_COMPONENT = 'ADD_COMPONENT';

export function addComponent(componentName , key){
    return {
        type : componentName === 'layout' ? 
        key : key,
    }
}

function getActionTypeByName(componentName){
  
}
