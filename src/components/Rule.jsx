import React from 'react';
import { Link } from 'react-router-dom';
import '../style/bootstrap.min.css';
import '../style/Rule.css';

const Rule = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Game Rule</h1>
            </div>
            <div className="row justify-content-center">
                <Link id="game-rule-btn" className="btn btn-info" to="/">
                    Back To Home
                </Link>
            </div>
            <div className="row">
                <div className="col">
                    <p>Simulation Rule:</p>
                    <p>
                        1. Any live cell with fewer than two live neighbors
                        dies, as if caused by under-population.
                    </p>
                    <p>
                        2. Any live cell with two or three live neighbors lives
                        on to the next generation.
                    </p>
                    <p>
                        3. Any live cell with more than three live neighbors
                        dies, as if by over-population..
                    </p>
                    <p>
                        4. Any dead cell with exactly three live neighbors
                        becomes a live cell, as if by reproduction.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Instructions:</p>
                    <p>
                        Enter the frequency of simulation; Press start/pause to
                        start or pause the simulation; Press B&W/heatmap to toggle the display mode.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Rule;
