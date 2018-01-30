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
		// this.state = {
		// 	hasDropped: false,
		// 	hasDroppedOnChild: false,
		// }
	}

    static defaultProps = {
        dropAreaName: 'mainArea',
        dropAreaKey : 'root'
    }

    createLayout(layout){
        if( layout && layout.length > 0 ){
            return  layout.map(item => 
                <div key={item.i} data-grid={item}>
                    <Layout dropAreaKey={item.i}>
                        {this.createLayout(item.layout)}
                    </Layout>
                </div>
            )
        }

        if(layout.component && layout.component.length > 0){

        }
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
                <ReactGridLayout layout={this.props.layout} onLayoutChange={this.onLayoutChange} compactType={null} >
                    {this.createLayout(this.props.layout)}   
                </ReactGridLayout>
            </div>
        )
    } 
}

export default connect(injectState)(DropTarget(DndTypes.LIST_ITEM, mainTarget, collect)(MainArea))