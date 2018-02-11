import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateOptions } from '../store/actions'
import './controlPanel.css'

function mapStateToProps(state){
    console.log(state)
    let options = state.activeComponent.dropAreaKey ? state.layout[state.activeComponent.dropAreaKey][state.activeComponent.index].options : {}
    console.log(options)
    return {
        activeComponent : state.activeComponent,
        options : options,
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
        let code = JSON.stringify(nextProps.options, null, 4)
        this.setState({textareaValue : code})
    }

    saveChange(){
        let option = this.refs.textarea.value.trim();
        //console.log(option)
        this.props.dispatch(updateOptions(this.props.activeComponent, option))
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

export default connect(mapStateToProps)(ControlPanel)