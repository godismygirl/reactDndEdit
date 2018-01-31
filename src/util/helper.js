import React from 'react';
import Title from '../components/title';

export function getComponentByName(name){
    switch ( name ) {
        case 'title' :
            return <Title />
        default : 
            return
    }   
}

export function getActionTypeByName(name){
    switch (name) {
        case '' :
            return 
        default : 
            return 
    }
}