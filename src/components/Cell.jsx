import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import { GameContext } from '../contexts/GameContext';
import { PropTypes } from 'prop-types';
import '../style/Cell.css';

//cellValue: 0 - dead, 1 - live
//TODO: when to update lastAlive? 1. when press start; 2. when simulating 3. when clicked
const Cell = props => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const { currentBoard, lastAlive } = boardState;
    const [gameState] = useContext(GameContext);
    const [color, setColor] = useState('white');

    const colors = [
        '#f7fcf0',
        '#e0f3db',
        '#ccebc5',
        '#a8ddb5',
        '#7bccc4',
        '#4eb3d3',
        '#2b8cbe',
        '#0868ac',
        '#084081',
        '#022146',
        'white',
        'black',
    ];

    //     D   L
    // idx 0 - 9
    // total rounds: 20
    // lastAlive: 10, 11-20 dead -> idx 4 / idx 0 ??
    // lastAlive[props.id] <= gameState.rounds - 10 -> idx = 0
    // idx = 10-(gameState.rounds-lastAlive[props.id])
    const getColor = () => {
        let idx;
        let board = boardState.currentBoard;
        // if heatmap is active
        if (gameState.display) {
            idx =
                10 -
                (gameState.rounds - lastAlive[props.id][1] >= 10
                    ? 9
                    : gameState.rounds - lastAlive[props.id][1]) -
                1;
            // let ratio = (lastAlive[props.id][1])/gameState.rounds;
            // if(gameState.rounds === 0) {
            //     idx = lastAlive[props.id][1] ? 9 : 0;
            // }else{
            //     let ratio = lastAlive[props.id][1]/(gameState.rounds+1);
            //     idx = Math.floor(ratio * 10);
            // }

            // console.log("heatmap!")
        } else {
            if (board[props.id] === 0) {
                idx = 11;
            } else {
                idx = 10;
            }
            // console.log("B&W");
            // console.log(Math.floor(59/60*10));
        }
        return colors[idx];
    };

    const toggleCellStatus = () => {
        // if game is in 'start' mode, return;
        let liveCells = boardState.liveCells;
        if (gameState.mode === 0) {
            return;
        }
        //if this cell was dead in the prev round, we record the current round in lastAlive for this cell
        if (currentBoard[props.id] === 0) {
            let last = lastAlive[props.id][1];
            let secondLast = last;
            last = gameState.rounds;
            lastAlive[props.id] = [secondLast, last];
            liveCells += 1;
            // lastAlive[props.id] = gameState.rounds;
        }
        // round 1: cellA = 0; round 2: cellA = 1 => 0
        // if this cell was alive in the prev round, update 'last' with 'secondLast'
        if (currentBoard[props.id] === 1) {
            // let last = lastAlive[idx][1];
            let secondLast = lastAlive[props.id][0];
            lastAlive[props.id] = [secondLast, secondLast];
            liveCells -= 1;
        }
        currentBoard[props.id] = 1 - currentBoard[props.id];
        setBoardState(state => ({
            ...state,
            currentBoard: currentBoard,
            lastAlive: lastAlive,
            liveCells: liveCells,
        }));
        console.log(
            'id: ' + currentBoard[props.id],
            'lastAlive: ' + lastAlive[props.id]
        );
    };

    useEffect(() => {
        setColor(getColor);
    }, [
        gameState.display,
        gameState.rounds,
        boardState.currentBoard[props.id],
    ]);

    return (
        <div
            className="cell"
            style={{ backgroundColor: color }}
            onClick={toggleCellStatus}>
            {/* {props.id}|{currentBoard[props.id]} */}
            {props.id}
        </div>
    );
};
Cell.propTypes = {
    id: PropTypes.number,
};
export default Cell;
