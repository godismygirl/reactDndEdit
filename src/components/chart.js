import React, { Component } from 'react';
import echarts from 'echarts';
import EchartsReactCore from './reactEchartsCore';
import { connect } from 'react-redux'

function injectState(state, props){
    return {
        option : state.components[props.keyIndex],
    }
}

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        console.log(this.props)
    }

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

export default connect(injectState)(Chart)