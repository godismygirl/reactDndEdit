import React, { Component } from 'react';
import { ComponentList } from '../config/componentList';
import SideListItem from './sideListItem';

import component_layout from '../components/layout';
import component_title from '../components/title';

class SideList extends Component{
    render(){
        
        return (
            <ul>
                {ComponentList.map((item, index) => 
                    <SideListItem onClick={() => this.props.onItemClick(item.name)} key={item.name} text={item.text} componentName={item.name}/>
                )}
            </ul>
        )
    }
}

export default SideList;


