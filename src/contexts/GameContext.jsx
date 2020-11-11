import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const GameContext = createContext([{}, () => {}]);

const GameContextProvider = props => {
    const [gameState, setGameState] = useState({
        mode: 1, //0: start, 1: pause
        display: 0, //0: black/white 1: heatmap
        rounds: 0,
    });
    return (
        <GameContext.Provider value={[gameState, setGameState]}>
            {props.children}
        </GameContext.Provider>
    );
};
GameContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { GameContext, GameContextProvider };
