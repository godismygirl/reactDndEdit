import React, { Component } from 'react';
import echarts from 'echarts';
import EchartsReactCore from './reactEchartsCore';

class Chart extends Component {
    render(){
        return(
            <EchartsReactCore
                keyIndex = {this.props.keyIndex}
                echarts = {echarts}
                option = {this.props.option}
                onEvents = {this.props.onEvents}
            />
        )
    }
}

export default Chart