import React from 'react'
import Title from '../components/title'
import Chart from '../components/chart'
import defaultEchartOption from '../config/defaultEchartsOption'

function getComponentByName(name, key){
    console.log(key)
    switch ( name ) {
        case 'title' :
            return <Title />
        case 'chart' :
            return <Chart keyIndex={key}/>
        default : 
            return
    }   
}

export { getComponentByName }
