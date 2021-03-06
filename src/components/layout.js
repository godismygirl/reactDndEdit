import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";

import { connect } from 'react-redux'
import { CHANGE_LAYOUT } from '../store/actions'

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

const target = {
    drop(props, monitor,component){
        const hasDroppedOnChild = monitor.didDrop()
		if (!hasDroppedOnChild) {
			return{
                dropAreaKey : props.dropAreaKey
            }
        }
        // console.log(props)
		// component.setState({
		// 	hasDropped: true,
		// 	hasDroppedOnChild,
		// })
        //console.log(monitor.getItem().componentName);
        
    }
}

function getStyle(backgroundColor){
    return {
		border: '1px solid rgba(0,0,0,0.2)',
        backgroundColor,
        height:'100%',
	}
}

function collect(connect, monitor){
    return{
        connectDropTarget : connect.dropTarget(),
        isOver : monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
    }
}

class Layout extends Component {

    constructor(props) {
        super(props)
        this.onDragStart = this.onDragStart.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
		// this.state = {
		// 	hasDropped: false,
		// 	hasDroppedOnChild: false,
		// }
	}

    onDragStart(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
        placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){
        e.stopPropagation();
    }

    onLayoutChange(layout){

        let self = this;
        console.log(self.props)

        this.props.dispatch({
            type : CHANGE_LAYOUT,
            key: self.props.dropAreaKey,
            newLayout : layout,
        })
    }

    render(){
        const {connectDropTarget, isOverCurrent }=this.props;
        // const { hasDropped, hasDroppedOnChild } = this.state;

        let backgroundColor = 'rgba(0, 0, 0, .1)'

        if (isOverCurrent) {
			backgroundColor = 'darkgreen'
		}

        return connectDropTarget(
            <div style={getStyle(backgroundColor)}>
                <ReactGridLayout onDragStart={this.onDragStart} layout={this.props.layout} onLayoutChange={this.onLayoutChange}>
                    {this.props.children}
                </ReactGridLayout>
            </div>
        )
    }
}

export default DropTarget(DndTypes.LIST_ITEM, target, collect)(connect()(Layout));