import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

class Layout extends Component {
    render(){
        return(
            <div key={this.props.key}>
                it's a simple test component
            </div>
        )
    }
}

export default Layout;