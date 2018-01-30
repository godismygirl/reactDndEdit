export const ADD_LAYOUT = 'ADD_LAYOUT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const REMOVE_LAYOUT = 'REMOVE_LAYOUT';

// state structure
// {
//     layout : [
//         {i:"0",x:"0",y:"0",w:"2",h:"2" ,component:"chart"},
//         {i:"1",x:"0",y:"0",w:"2",h:"2", layout:[
//             {i:"10",x:"0",y:"0",w:"2",h:"2",component:"chart"},
//             {i:"11",x:"0",y:"0",w:"2",h:"2",component:"chart"},
//             {i:"12",x:"0",y:"0",w:"2",h:"2",component:"chart"}
//         ]},
//         {i:"2",x:"0",y:"0",w:"2",h:"2", component:"title"},
//     ]
// }