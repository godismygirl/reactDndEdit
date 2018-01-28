import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';

import { connect } from 'react-redux'

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

const mainTarget = {
    drop(props, monitor, component){
        console.log(props)
        return {
            dropNode : ReactDOM.findDOMNode(component.refs.rootLayout)
        }
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

function injectState(state){
    return {
        layout : state.layout,
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
                <ReactGridLayout ref='rootLayout' layout={this.props.layout}>
                    {this.props.children}
                </ReactGridLayout>
            </div>
        )
    } 
}

export default connect(injectState)(DropTarget(DndTypes.LIST_ITEM, mainTarget, collect)(MainArea));