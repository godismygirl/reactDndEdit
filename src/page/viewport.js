import React, { Component } from 'react'
import Layout from '../components/layout'

import { getComponent } from '../util/helper'
import { LAYOUT } from '../config/componentList'

class Viewport extends Component {

    renderChildren(dropAreaKey, item){
        //console.log("dropAreaKey: "+dropAreaKey)
        //let key = parentKey + '-' + item.i;
        if(item.component === LAYOUT){
            return <Layout dropAreaKey={dropAreaKey+'-'+item.i} renderChildren={ (a, b) => this.renderChildren(a, b) }/>
        } else{
            return getComponent(dropAreaKey, item);
        }
        
    }

    render(){
        return <Layout dropAreaKey="0" renderChildren={ (a, b) => this.renderChildren(a, b)} />
    } 
}

export default Viewport