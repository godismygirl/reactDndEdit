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

function getComponent(component, options){
    console.log(options)
    switch (component) {
        case 'title' :
            return <Title />
        case 'chart' :
            return <Chart option = {options}/>
        default : 
            return
    }   
}


export { getComponent, getDefaultOptions }
