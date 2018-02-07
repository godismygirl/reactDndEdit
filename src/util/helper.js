import React from 'react'
import Title from '../components/title'
import Chart from '../components/chart'
import defaultEchartOption from '../config/defaultEchartsOption'

function getDefaultOptions(name){
    switch ( name ) {
        case 'title' :
            return {
                text : 'title'
            }
        case 'chart' :
            return defaultEchartOption
        default : 
            return {}
    }   
}

function getComponent(component){

    switch ( component.name ) {
        case 'title' :
            return <Title />
        case 'chart' :
            return <Chart option = {component.option}/>
        default : 
            return
    }   
}


export { getComponent, getDefaultOptions }
