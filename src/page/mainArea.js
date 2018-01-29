import React, { Component } from 'react';

import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import Layout from '../components/layout';

import { connect } from 'react-redux'
import { CHANGE_LAYOUT } from '../store/actions'

import { DndTypes } from '../config/dndTypes';
import { DropTarget } from 'react-dnd';

const ReactGridLayout = WidthProvider(RGL);

function getStyle(backgroundColor){
    return {
        backgroundColor,
        height:'100%',
	}
}

const mainTarget = {
    drop(props, monitor,component){
        const hasDroppedOnChild = monitor.didDrop();
        console.log(component.props)
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
		// this.state = {
		// 	hasDropped: false,
		// 	hasDroppedOnChild: false,
		// }
	}

    static defaultProps = {
        dropAreaName: 'mainArea',
        dropAreaKey : 'root'
    }

    trimGridData(item){
        return item
    }

    createLayoutItem(item){
        return (
            <div key={item.i}>
                <Layout dropAreaKey={item.i} layout={item.layout}>
                    {this.renderInner(item)}
                </Layout>
            </div>
        )
    }

    renderInner(data){
        if(data.layout){
            return data.layout.map( (item , index) => (
                this.createLayoutItem(item)
            ))
        }

        if(!data.layout && data.component){
            this.appendComponent(data.component)
        }
    }

    appendComponent(componentName){

    }

    onLayoutChange(layout){
        let self = this;

       // console.log(this.props)

        this.props.dispatch({
            type : CHANGE_LAYOUT,
            key: self.props.dropAreaKey,
            newLayout : layout,
        })
    }

    render(){
        const {connectDropTarget,isOverCurrent }=this.props;
        // const { hasDropped, hasDroppedOnChild } = this.state;

        let backgroundColor = 'rgba(0, 0, 0, .1)'

        if (isOverCurrent) {
			backgroundColor = 'darkgreen'
		}

        return connectDropTarget(
            <div className="main-area"  style={getStyle(backgroundColor)}>
                <ReactGridLayout layout={this.props.layout} onLayoutChange={this.onLayoutChange}>
                    {this.props.layout.map( (item, index) => this.createLayoutItem(item))}
                </ReactGridLayout>
            </div>
        )
    } 
}

export default DropTarget(DndTypes.LIST_ITEM, mainTarget, collect)(connect(injectState)(MainArea));