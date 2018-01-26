import React, { Component } from 'react';
import SideList from './sideList';
import MainArea from './mainArea';
import './viewport.css';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Viewport extends Component {
    render(){
        return(
            <div id="viewport">
                <div className="left-area">
                    <SideList  onItemClick={e => alert(e) }/>
                </div>
                <MainArea/>
            </div>
        )
        
    }
}

export default DragDropContext(HTML5Backend)(Viewport);