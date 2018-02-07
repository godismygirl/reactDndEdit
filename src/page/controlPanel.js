import React, { Component } from 'react'
import { connect } from 'react-redux'

function injectState(state){
    let keyIndex = state.currentOptionKey;
    let location = state.layout;
    // if(action.key !== 'root' ){
    //     let indexKey = action.key.split('');
    //     indexKey.forEach(element => {
    //         location = location[parseInt(element, 10)].layout;
    //     });
    // }
    return{

    }
}

class ControlPanel extends Component {
    renderPanel(){

    }
    render(){
        return (
            <div className="control-panel">
                {this.renderPanel()}
            </div>
        )
    }
}

export default connect(injectState)(ControlPanel)