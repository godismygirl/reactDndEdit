import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';

import { connect } from 'react-redux'
import { changeLayout, renderPanel } from '../store/actions'

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

const target = {
    drop(props, monitor,component){
        const hasDroppedOnChild = monitor.didDrop();
		if (!hasDroppedOnChild) {
			return{
                dropAreaKey : props.dropAreaKey,
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

function select(state, ownProps){
    // console.log(ownProps)
    return{
        layout : state.layout[ownProps.dropAreaKey]
    }
}

class Layout extends Component {

    constructor(props) {
        super(props)
        this.onDragStart = this.onDragStart.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
	}

    onDragStart(layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
        placeholder: LayoutItem, e: MouseEvent, element: HTMLElement){
        e.stopPropagation();
    }

    onLayoutChange(newLayout){
        this.props.dispatch(changeLayout(this.props.dropAreaKey, newLayout));
    }

    renderCodePanel(e, dropAreaKey, index){
        console.log('uuuuuu')
        e.stopPropagation();
        this.props.dispatch(renderPanel(dropAreaKey, index));
    }

    render(){
        const {connectDropTarget, isOverCurrent, dropAreaKey}=this.props;

        let backgroundColor = '#f8f8f8'

        if (isOverCurrent) {
			backgroundColor = 'darkgreen'
		}

        return connectDropTarget(
            <section style={getStyle(backgroundColor)}>
                {this.props.layout && 
                    <ReactGridLayout layout={this.props.layout} onDragStart={this.onDragStart} compactType={null} onLayoutChange={this.onLayoutChange} >
                        {this.props.layout.map(item => 
                            <div key={item.i} onClick={ (e)=> this.renderCodePanel(e, dropAreaKey, item.i) }>
                                {this.props.renderChildren(item.component, item.options, dropAreaKey+'-'+item.i)}
                            </div>
                        )}
                    </ReactGridLayout>
                }
            </section>
        )
    }
}

export default connect(select)(DropTarget(DndTypes.LIST_ITEM, target, collect)(Layout));