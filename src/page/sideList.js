import React, { Component } from 'react';
import SideListItem from './sideListItem';

class SideList extends Component{
    render(){
        
        return (
            <ul>
                {this.props.data.map((item, index) => 
                    <SideListItem onClick={() => this.props.onItemClick(item.name)} key={item.name} text={item.text} componentName={item.name}/>
                )}
            </ul>
        )
    }
}

export default SideList;


