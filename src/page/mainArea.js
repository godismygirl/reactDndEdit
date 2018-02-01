import React, { Component } from 'react';
import Layout from '../components/layout';

import { connect } from 'react-redux'
import { CHANGE_LAYOUT } from '../store/actions'

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

import { getComponentByName } from '../util/helper'
import { LAYOUT } from '../config/componentList'

function getStyle(backgroundColor){
    return {
        backgroundColor,
        height:'100%',
	}
}

const mainTarget = {
    drop(props, monitor,component){
        const hasDroppedOnChild = monitor.didDrop();
        // console.log(component.props)
        // console.log(props)
		if ( !hasDroppedOnChild) {
			return {
                dropAreaKey : component.props.dropAreaKey
            }
		}

		// component.setState({
		// 	hasDropped: true,
		// 	hasDroppedOnChild,
		// })
        //console.log(monitor.getItem().componentName);
  
    }
}

function collect(connect, monitor){
    return{
        connectDropTarget : connect.dropTarget(),
        // isOver : monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        //canDrop : monitor.canDrop(),
    }
}

function injectState(state){
    return {
        layout : state.layout,
    }
}

class MainArea extends Component {
    constructor(props) {
        super(props)
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.createLayout = this.createLayout.bind(this);
        this.renderLayout = this.renderLayout.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
	}

    createLayout(layout){
        if( layout && layout.length > 0 ){
            return  layout.map(item => 
                <div key={item.i} data-grid={item}>
                    { item.component === LAYOUT ? this.renderLayout(item) : this.renderComponent(item.component) }
                    {/* {item.component ? this.renderComponent(item.component) : this.renderLayout(item)} */}
                </div>
            )
        }
    }

    renderLayout(layoutItem){
        return <Layout dropAreaKey={layoutItem.i} layout={layoutItem.layout}>
            {this.createLayout(layoutItem.layout)}
        </Layout>
    }

    renderComponent(name){
        return getComponentByName(name);
    }

    onLayoutChange(layout){

        this.props.dispatch({
            type : CHANGE_LAYOUT,
            key: this.props.dropAreaKey,
            newLayout : layout,
        })
    }

    render(){
        const {connectDropTarget,isOverCurrent }=this.props;
        // const { hasDropped, hasDroppedOnChild } = this.state;
        let backgroundColor = '#f8f8f8'

        if (isOverCurrent) {
			backgroundColor = 'darkgreen'
		}

        return connectDropTarget(
            <div className="main-area"  style={getStyle(backgroundColor)}>
                <Layout layout={this.props.layout} dropAreaKey="root">
                    {this.createLayout(this.props.layout)}
                </Layout>
            </div>
        )
    } 
}

export default connect(injectState)(DropTarget(DndTypes.LIST_ITEM, mainTarget, collect)(MainArea))