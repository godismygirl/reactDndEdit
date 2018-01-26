import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import './layout.css';

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

const mainTarget = {
    drop(props, monitor, component){
       // console.log(monitor.getItem().componentName + ' dropped in '+props.dropAreaName);
       //return {'ref':props.ref}
       console.log(ReactDOM.findDOMNode(component.refs.test))
       //console.log(component)
    },
    canDrop(props){
        return 'yes'
    }
}

function collect(connect, monitor){
    return{
        connectDropTarget : connect.dropTarget(),
        isOver : monitor.isOver(),
        canDrop : monitor.canDrop(),
    }
}

class MainArea extends Component {
    constructor(props){
        super(props);
    }
    static defaultProps = {
        dropAreaName: 'mainArea',
    }
    render(){
        const {connectDropTarget,isOver,canDrop,dropAreaName }=this.props;
        return connectDropTarget(
            <div className="main-area">
                <ReactGridLayout ref='test'>
                    {this.props.children}
                </ReactGridLayout>
            </div>
        )
    } 
}

export default DropTarget(DndTypes.LIST_ITEM, mainTarget, collect)(MainArea);