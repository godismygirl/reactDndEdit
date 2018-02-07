import React, { Component } from 'react';

import { connect } from 'react-redux'
import { addComponent } from '../store/actions'

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
        if(monitor.didDrop()){
            props.dispatch(addComponent(props.componentName, monitor.getDropResult().dropAreaKey))
        }

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
            <li>
                { this.props.text }
            </li>
        )
    }
}

export default connect()(DragSource(DndTypes.LIST_ITEM, listSource, collect)(SideListItem))