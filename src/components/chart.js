import React, { Component } from 'react';
import echarts from 'echarts';
import EchartsReactCore from './reactEchartsCore';
import { connect } from 'react-redux'

function mapStateToProps(state, ownProps){
    return {
        option : state.layout[ownProps.dropAreaKey][ownProps.keyIndex].options
    }
}

class Chart extends Component {
 
    render(){
        return(
            <EchartsReactCore
                dropAreaKey = {this.props.dropAreaKey}
                keyIndex = {this.props.keyIndex}
                echarts = {echarts}
                option = {this.props.option}
                onEvents = {this.props.onEvents}
            />
        )
    }
}

export default connect(mapStateToProps)(Chart)