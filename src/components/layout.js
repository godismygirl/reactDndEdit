import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

const target = {
    drop(props, monitor){
        //console.log(monitor.getItem().componentName);
        return props
    },
    // canDrop(props){
    //     return 'yes'
    // }
}

function collect(connect, monitor){
    return{
        connectDropTarget : connect.dropTarget(),
        //isOver : monitor.isOver(),
        //canDrop : monitor.canDrop(),
    }
}

class Layout extends Component {
    render(){
        const {connectDropTarget,isOver,canDrop }=this.props;
        return connectDropTarget(
            <div key={this.props.key}>
                <ReactGridLayout layout={this.props.layout}>
                    {this.props.children}
                </ReactGridLayout>
            </div>
        )
    }
}

export default DropTarget(DndTypes.LIST_ITEM, target, collect)(Layout);