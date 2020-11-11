import React from 'react';
import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import { GameContext } from '../contexts/GameContext';
import { PropTypes } from 'prop-types';
import useIntervalSimulation from '../hooks/useIntervalSimulation';
import Cell from '../components/Cell';
import '../style/Board.css';

const Board = props => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const [gameState, setGameState] = useContext(GameContext);
    const { nRow, nCol } = boardState;
    const m = nRow;
    const n = nCol;
    const createBoard = () => {
        let rows = [];
        for (let i = 0; i < m; i++) {
            let cells = [];
            for (let j = 0; j < n; j++) {
                let cellID = i * n + j + 1;
                cells.push(<Cell key={cellID} id={cellID} />);
            }
            rows.push(<div className="row">{cells}</div>);
        }
        return <div className="board">{rows}</div>;
    };
    // const updateLastAlive = () => {
    //     for(id in boardState.currentBoard){
    //         if(lastAlive[id]){}
    //     }
    // }

    const simulate = oldBoard => {
        // console.log("simulate!");
        var lastAlive = boardState.lastAlive;
        let dirs = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
                dirs.push([i, j]);
            }
        }
        //  console.log("current:");
        //  console.log(oldBoard)
        let updated = {};
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let liveNeighbors = 0;
                for (let d of dirs) {
                    let dx = d[0];
                    let dy = d[1];
                    let nx = i + dx,
                        ny = j + dy;
                    // console.log(currentBoard[nx*n+ny+1]);
                    if (0 <= nx && nx < m && 0 <= ny && ny < n) {
                        // console.log(nx, ny);
                        liveNeighbors += oldBoard[nx * n + ny + 1];
                    }
                }
                //if the old cell was dead, it comes to live when it has exactly 3 live neighbors
                var idx = i * n + j + 1;
                if (oldBoard[idx] === 0) {
                    updated[idx] = liveNeighbors === 3 ? 1 : 0;
                }
                // if the old cell was alive
                else {
                    // the old cell dies with less than 2 or more than 3 live neighbors
                    if (liveNeighbors < 2 || liveNeighbors > 3) {
                        updated[idx] = 0;
                    } else {
                        updated[idx] = 1;
                    }
                }
                // updateLastAlive
                if (updated[idx] === 1) {
                    let last = lastAlive[idx][1];
                    // console.log("last: " + last);
                    let secondLast = last;
                    last = gameState.rounds + 1;
                    lastAlive[idx] = [secondLast, last];
                }

                // console.log("old: " + currentBoard[idx] + " new: " + updated[idx] + " liveNeighbors: " + liveNeighbors);
            }
        }
        setBoardState(state => ({
            ...state,
            currentBoard: updated,
            lastAlive: lastAlive,
        }));
        setGameState(state => ({
            ...state,
            rounds: gameState.rounds + 1,
        }));
        // console.log("updated: ");
        // console.log(updated);
        // if(currentBoard === updated){console.log("updated!");}
    };
    useIntervalSimulation(() => {
        simulate(boardState.currentBoard);
    }, props.frequency);
    // useEffect(() =>{
    //     var newIntervalID;
    //     if(!gameState.mode){
    //         newIntervalID = setInterval(() => {
    //             simulate(boardState.currentBoard);
    //             // console.log(boardState.currentBoard)
    //         }, 2000);
    //         setIntervalID(newIntervalID);
    //         console.log("start: " + newIntervalID )
    //     }else{
    //         // clearInterval(intervalID);
    //         console.log("paused: " +  intervalID);
    //     }
    //     // console.log(gameState.mode);
    //     // console.log(intervalID);
    // }, [gameState.mode]);

    return <div className="board-pos">{createBoard()}</div>;
};
Board.propTypes = {
    frequency: PropTypes.number,
};
export default Board;
