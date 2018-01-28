import React, { Component } from 'react';

import { connect } from 'react-redux'
import { ADD_LAYOUT } from '../store/actions'

import { DndTypes } from '../config/dndTypes';
import { DragSource } from 'react-dnd';

const listSource = {
    beginDrag(props){
        return {
            componentName : props.componentName,
        }
    },
    endDrag(props, monitor,component){
        //let dropNode = monitor.getDropResult().dropNode;
        console.log(props);
        // ReactDOM.render(
        //     <div>hello</div>, dropNode
        // )
        props.dispatch({
            type : ADD_LAYOUT,
            dropNode : monitor.getDropResult().dropNode,
            key:'a'
        })

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

export default connect()(DragSource(DndTypes.LIST_ITEM, listSource, collect)(SideListItem))