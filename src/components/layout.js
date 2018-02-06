import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';

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
                dropAreaKey : props.dropAreaKey,
                p : props.layout,
            }
        }
    }
}

function getStyle(backgroundColor){
    return {
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

        this.props.dispatch({
            type : CHANGE_LAYOUT,
            key: this.props.dropAreaKey,
            newLayout : layout,
        })
    }

    render(){
        const {connectDropTarget, isOverCurrent }=this.props;
        // const { hasDropped, hasDroppedOnChild } = this.state;

        let backgroundColor = '#f8f8f8'

        if (isOverCurrent) {
			backgroundColor = 'darkgreen'
		}

        return connectDropTarget(
            <div style={getStyle(backgroundColor)}>
                <ReactGridLayout onDragStart={this.onDragStart} compactType={null} layout={this.props.layout} onLayoutChange={this.onLayoutChange}>
                    {this.props.children}
                </ReactGridLayout>
            </div>
        )
    }
}

export default connect()(DropTarget(DndTypes.LIST_ITEM, target, collect)(Layout));