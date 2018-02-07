import React, { Component } from 'react'
import SideList from './sideList'
import Viewport from './viewport'
import ControlPanel from './controlPanel'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { componentList } from '../config/componentList'
import './editor.css'

class Editor extends Component {
    render(){
        return (
            <div id="editor">
                <div className="side-list">
                    <SideList data={ componentList } />
                </div>
                <div className="viewport">
                    <Viewport />
                </div>
                <div className="control-panel">
                    <ControlPanel />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Editor)