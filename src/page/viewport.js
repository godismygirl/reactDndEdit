import React, { Component } from 'react'
import Layout from '../components/layout'

import { getComponent } from '../util/helper'
import { LAYOUT } from '../config/componentList'

class Viewport extends Component {

    renderChildren(component, options, dropAreaKey){
        //console.log("dropAreaKey: "+dropAreaKey)
        //let key = parentKey + '-' + item.i;
        if(component === LAYOUT){
            return <Layout dropAreaKey={dropAreaKey} renderChildren={ (a, b, c) => this.renderChildren(a, b, c) }/>
        } else{
            return getComponent(component, options);
        }
        
    }

    render(){
        return <Layout dropAreaKey="0" renderChildren={ (a, b, c) => this.renderChildren(a, b, c)} />
    } 
}

export default Viewport