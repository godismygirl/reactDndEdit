import React from 'react';
import Title from '../components/title';

function getComponentByName(name){
    switch ( name ) {
        case 'title' :
            return <Title />
        default : 
            return
    }   
}

export { getComponentByName }
