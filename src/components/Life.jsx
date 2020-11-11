import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';
import { GameContext } from '../contexts/GameContext';
import Board from '../components/Board';
import { Link } from 'react-router-dom';
import '../style/bootstrap.min.css';
import '../style/Life.css';

//state: currentBoard, lastAlive={cellId: index of generation where this cell is alive},
// numIterations, option(start, pause, restart), frequency?
const Life = () => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const [gameState, setGameState] = useContext(GameContext);
    const [frequency, setFrequency] = useState(2000);
    // const [liveCells, setLiveCells] = useState(0);
    const m = boardState.nRow;
    const n = boardState.nCol;

    let inputFrequency;
    //Randomly populate cells in board with 0 or 1 status and update lastAlive
    const createRandomBoard = () => {
        // lastAlive = {};
        let status = {};
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let idx = i * n + j + 1;
                status[idx] = Math.floor(Math.random() * 2);
                // if(status[idx] === 0){ lastAlive[idx] = [0,0]; }
                // else {lastAlive[idx] = [1,1];}
            }
        }
        // setBoardState((state) => ({
        //     ...state,
        //     lastAlive: lastAlive
        // }))
        return status;
    };
    const updateLastAlive = board => {
        let lastAlive = {};
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let idx = i * n + j + 1;
                if (board[idx] === 0) {
                    lastAlive[idx] = [0, 0];
                } else {
                    lastAlive[idx] = [1, 1];
                }
            }
        }
        return lastAlive;
    };

    const toggleGameMode = () => {
        let mode = gameState.mode;
        let rounds = gameState.rounds;
        //if game was paused, start game and increment rounds by 1
        if (mode === 1) {
            rounds++;
        }
        setGameState(state => ({
            ...state,
            mode: 1 - mode,
            rounds: rounds,
        }));
    };
    const toggleDisplay = () => {
        let display = gameState.display;
        setGameState(state => ({
            ...state,
            display: 1 - display,
        }));
    };
    const updateFrequency = e => {
        var msg = '';
        if (e.key === 'Enter') {
            if (gameState.mode) {
                if (validateFrequency()) {
                    setFrequency(inputFrequency);
                    msg = 'Frequency is set to ' + inputFrequency + ' ms.';
                } else {
                    msg =
                        'Frequency entered is in valid. Please enter a frequency between 50 - 2000ms. ';
                }
            } else {
                msg = 'Please pause the game to update frequency.';
            }
            document.getElementById('msg').innerHTML = msg;
        }
    };
    const validateFrequency = () => {
        if (
            isNaN(inputFrequency) ||
            inputFrequency < 20 ||
            inputFrequency > 2000
        ) {
            return false;
        }
        return true;
    };

    const restartGame = () => {
        var board = createRandomBoard();
        setGameState(() => ({
            mode: 1,
            display: 0,
            rounds: 0,
        }));
        setBoardState(state => ({
            ...state,
            currentBoard: board,
            lastAlive: updateLastAlive(board),
        }));
        console.log();
    };
    useEffect(() => {
        var board = createRandomBoard();
        setBoardState(state => ({
            ...state,
            currentBoard: board,
            lastAlive: updateLastAlive(board),
        }));
    }, []);
    useEffect(() => {
        let count = 0;
        for (let key in boardState.currentBoard) {
            count += boardState.currentBoard[key];
        }
        setBoardState(state => ({
            ...state,
            liveCells: count,
        }));
    }, [boardState.currentBoard]);
    return (
        <div className="game-page">
            <div className="row mb-3">
                <div className="col-xs-12 col-lg-4">
                    <Link className="btn btn-info" to="/">
                        Back To Home
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        onClick={toggleGameMode}
                        className="btn btn-primary">
                        Start/Pause
                    </button>
                    <button onClick={restartGame} className="btn btn-danger">
                        Restart
                    </button>
                    <button onClick={toggleDisplay} className="btn btn-warning">
                        B&W/HeatMap
                    </button>
                    <p>
                        Frequency:{' '}
                        <input
                            type="number"
                            name="frequency"
                            placeholder="50~2000ms"
                            onChange={e => {
                                inputFrequency = e.target.value;
                            }}
                            onKeyDown={e => updateFrequency(e)}
                        />
                    </p>
                    <p id="msg"></p>
                    <p>Mode: {gameState.mode ? 'paused' : 'start'}</p>
                    <p>Rounds: {gameState.rounds}</p>
                    <p>Display: {gameState.display ? 'Heatmap' : 'B&W'}</p>
                    <p>Live Cells: {boardState.liveCells}</p>
                    <p>
                        Number of Rows={m}, Number of Columns={n}
                    </p>
                </div>
            </div>
            {/* <div className="text-xs-right">
                <Link className="btn btn-info" to="/">
                    Back To Home
                </Link>
            </div> */}
            <br />

            <div>
                <Board frequency={frequency}></Board>
            </div>
        </div>
    );
};
export default Life;
