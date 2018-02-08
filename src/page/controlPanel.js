import React, { Component } from 'react'
import { connect } from 'react-redux'
import {UPDATE_COMPONET} from '../store/actions'
import './controlPanel.css'

function injectState(state){
    //let keyIndex = state.currentOptionKey;
    let location = state;
    let currentOption = "";
    let currentKey = "";

    if(state.currentOptionKey !==""){
        let keyIndex = state.currentOptionKey.split('');
        keyIndex.forEach(element => {
            location = location.layout[parseInt(element, 10)];
        });
        currentKey = state.currentOptionKey;
        currentOption = location.component.option;
    }

    return{
        currentKey : currentKey,
        currentOption : currentOption,
    }
}

class ControlPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            textareaValue:''
        }
    }
    componentWillReceiveProps(nextProps){
        let code = JSON.stringify(nextProps.currentOption, null, 4)
        this.setState({textareaValue:code})
    }

    saveChange(){
        //alert(this.refs.textarea.value)
        let option = this.refs.textarea.value.trim();
        this.props.dispatch({
            type : UPDATE_COMPONET,
            key : this.props.currentKey,
            newOption : option,
        })
    }

    onValueChange(event){
        this.setState({
            textareaValue:event.target.value
        })
    }

    render(){
        return (
            <div className="control-panel">
                <div className="save-change"><button onClick={() => this.saveChange()}>save</button></div>
                <textarea ref="textarea" onChange={(e) => this.onValueChange(e)} value={ this.state.textareaValue}/>
            </div>
        )
    }
}

export default connect(injectState)(ControlPanel)