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

function getComponent(dropAreaKey, item){
    switch (item.component) {
        case 'title' :
            return <Title />
        case 'chart' :
            return <Chart dropAreaKey={dropAreaKey} keyIndex={parseInt(item.i, 10)} />
        default : 
            return
    }   
}


export { getComponent, getDefaultOptions }
