import React, { Component } from 'react'
import Layout from '../components/layout'

import { connect } from 'react-redux'
import { CHANGE_LAYOUT, RENDER_PANEL } from '../store/actions'

import { getComponent } from '../util/helper'
import { LAYOUT } from '../config/componentList'

function injectState(state, ownprops){
    console.log(ownprops)
    return {
        layout : state.layout["0"],
    }
}

class Viewport extends Component {

    constructor(props) {
        super(props)
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.createLayout = this.createLayout.bind(this);
        this.renderLayout = this.renderLayout.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
	}

    createLayout(layout){
        //console.log(layout)
        if( layout && layout.length > 0 ){
            return  layout.map(item => 
                <div key={item.i} data-grid={item} onClick={(e) => this.renderControlPanel(e, item.i)}>
                    { item.component.name === LAYOUT ? this.renderLayout(item) : this.renderComponent(item.component) }
                </div>
            )
        }
    }

    renderLayout(dropAreaKey){
        return <Layout dropAreaKey={dropAreaKey} renderChildren={(a,b) => this.renderChildren(a,b)}/>
    }

    renderComponent(component){
        return getComponent(component);
    }

    renderControlPanel(e, key){
        //console.log('uuuuuu')
        e.stopPropagation();
        this.props.dispatch({
            type : RENDER_PANEL,
            key: key,
        })
    }

    onLayoutChange(layout){
        this.props.dispatch({
            type : CHANGE_LAYOUT,
            key: this.props.dropAreaKey,
            newLayout : layout,
        })
    }

    renderChildren(layout, parentKey){
        console.log("layout: "+layout)
        console.log("parentKey: "+parentKey)
        // let key = parentKey + '-' + item.i;
        // console.log("key: "+key);
        // return <Layout dropAreaKey={key} renderChildren={ this.renderChildren(item, key)} />
        return (
            layout.map(item => 
                    <div key={item.i}>
                        {item.component.name === 'layout'? this.renderLayout(parentKey + '-' + item.i) : this.renderComponent(item.component)}
                    </div>
            )
        )
        
        
    }

    render(){

        return <Layout dropAreaKey="0" renderChildren={ (layout, parentKey) => this.renderChildren(layout, parentKey)} />

    } 
}

export default connect()(Viewport)