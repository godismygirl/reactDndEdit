import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './boardSquare';
import Knight from './knight';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    static propTypes = {
        knightPosition : PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
    }

    renderSquare(i){
        const x = i % 8;
        const y = Math.floor(i/8);
        const black = (x+y) % 2 === 1;
        return (
            <div key={i}  style={{
                width:'80px',
                height:'80px'
            }}>
                <BoardSquare x={x} y={y} black={black}>
                    {this.renderPiece(x,y)}
                </BoardSquare>
            </div>

        )
    }

    renderPiece(x,y){
        const [knightX, knightY] = this.props.knightPosition;
        if(x===knightX && y===knightY){
            return <Knight />
        }
    }

    render() {
        const squares = [];
        for(let i=0; i<64; i++){
            squares.push(this.renderSquare(i))
        }
        return (
            <div style={{
                width: '640px',
                height: '640px',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Board)