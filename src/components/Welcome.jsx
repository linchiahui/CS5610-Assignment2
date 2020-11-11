import React from 'react';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { BoardContext } from '../contexts/BoardContext';
import '../style/bootstrap.min.css';
import '../style/Welcome.css';

const Welcome = () => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const [redirect, setRedirect] = useState(false);
    const [redirectRule, setRedirectRule] = useState(false);

    const validateInput = (nRow, nCol) => {
        console.log(nRow, nCol);
        let msg;
        if (
            isNaN(nRow) ||
            nRow < 10 ||
            nRow > 200 ||
            isNaN(nCol) ||
            nCol < 10 ||
            nCol > 200
        ) {
            msg = 'Input is invalid. Please enter integer between 10 and 1000.';
        } else {
            msg = 'Submit successfully!';
            setRedirect(true);
        }
        document.getElementById('msg').innerHTML = msg;
    };
    const setNumRow = e => {
        const value = e.target.value;
        setBoardState(state => ({ ...state, nRow: value }));
    };
    const setNumCol = e => {
        const value = e.target.value;
        setBoardState(state => ({ ...state, nCol: value }));
    };
    if (redirect) {
        // console.log(redirect + nRow.toString() + nCol.toString());
        return <Redirect to={{ pathname: '/life' }} />;
    }

    if (redirectRule) {
        return <Redirect to={{ pathname: '/rule' }} />;
    }

    const gameRule = () => {
        setRedirectRule(true);
    };

    return (
        <div className="container">
            <h1>Welcome to Game of Life!</h1>
            <p>Please select the number of rows and columns for the grid </p>
            <p>
                <span>Number of rows:</span>
                <input
                    type="number"
                    name="nRow"
                    placeholder="please enter an integer from 10 to 1000"
                    onChange={e => setNumRow(e)}
                />
            </p>
            <p>
                <span>Number of columns: </span>
                <input
                    type="number"
                    name="nCol"
                    placeholder="please enter an integer from 10 to 1000"
                    onChange={e => setNumCol(e)}
                />
            </p>
            <input
                className="btn btn-primary"
                type="button"
                value="Submit"
                onClick={() => {
                    validateInput(boardState.nRow, boardState.nCol);
                }}
            />
            <input
                className="btn btn-info"
                type="button"
                value="Game Rule"
                onClick={() => {
                    gameRule();
                }}
            />
            <p id="msg"></p>
        </div>
    );
};

export default Welcome;
