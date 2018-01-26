import React, { Component } from 'react';

import { DndTypes } from '../config/dndTypes';
import { DragSource } from 'react-dnd';

const listSource = {
    beginDrag(props){
        return {
            componentName : props.componentName,
        }
    },
    endDrag(props, monitor,component){
        console.log(monitor.getDropResult())
        //console.log(component)
    }
}

function collect(connect, monitor){
    return{
        connectDragSource : connect.dragSource()
    }
}

class SideListItem extends Component {
    render(){
        const { connectDragSource } = this.props;
        return connectDragSource (
            <li onClick={this.props.onClick}>
                { this.props.text }
            </li>
        )
    }
}

export default DragSource(DndTypes.LIST_ITEM, listSource, collect)(SideListItem)