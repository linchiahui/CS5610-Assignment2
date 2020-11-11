import React, { useState, useContext, useEffect, useRef } from 'react';
import {GameContext} from '../contexts/GameContext';
import useInterval from './useInterval';

//Reference: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useIntervalSimulation = (callback, delay) =>{
    const savedCallback = useRef();
    const [gameState, setGameState] = useContext(GameContext);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (!gameState.mode && delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [gameState.mode, delay]);
}

export default useIntervalSimulation;