import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import './layout.css';

console.log(WidthProvider)

const ReactGridLayout = WidthProvider(RGL);

class Layout extends Component {
    static defaultProps = {
        className: "layout",
        items: 3,
        cols: 12,
        rowHeight: 30
    }

    dragStartHandler(
        layout: Layout, 
        oldItem: LayoutItem, 
        newItem: LayoutItem,
        placeholder: LayoutItem, 
        e: MouseEvent, 
        element: HTMLElement
    ){
        e.stopPropagation();
    }

    render(){
        var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 3, h: 2},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
          ];

          var layout2 = [
            {i: 'd', x: 0, y: 0, w: 1, h: 2},
            {i: 'e', x: 1, y: 0, w: 3, h: 2},
            {i: 'f', x: 4, y: 0, w: 1, h: 2}
          ];
        return (
                    
                    <ReactGridLayout layout={layout} compactType={null} rowHeight={30}>
                        <div key="a">a</div>
                        <div key="b">
                            <ReactGridLayout layout={layout2} onDragStart={this.dragStartHandler.bind(this)}  compactType={null} rowHeight={30}>
                                <div key="d"></div>
                                <div key="e"></div>
                                <div key="f"></div>
                            </ReactGridLayout>
                        </div>
                        <div key="c">c</div>
                    </ReactGridLayout>

        )
    }
}

export default Layout;
