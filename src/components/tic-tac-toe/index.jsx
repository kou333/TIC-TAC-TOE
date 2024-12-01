
import React, { useState, useEffect } from 'react'; 
import './style.css';

function Square({ value, onClick }) {
    return <button onClick={onClick} className="square">{value}</button>;
}

export default function TicTacToe() {
    const [squares, setSquare] = useState(Array(9).fill(''));
    const [isXTurn, setIsXturn] = useState(true);
    const [status, setStatus] = useState('');

    function getWinner(squares) {
        const winningPattern = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningPattern.length; i++) {
            const [x, y, z] = winningPattern[i];
            if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
                return squares[x]; // Winner found
            }
        }
        return null; // No winner
    }

    function handleClick(currentSquare) {
        let cpySquares = [...squares];

        // If there's a winner or the square is already filled, ignore the click
        if (getWinner(cpySquares) || cpySquares[currentSquare]) return;
        cpySquares[currentSquare] = isXTurn ? 'X' : 'O';

        setIsXturn(!isXTurn);
        setSquare(cpySquares);
    }

    useEffect(() => {
        const winner = getWinner(squares);

        // Log to check if winner is detected
        console.log("Current squares:", squares);
        console.log("Winner detected:", winner);

        if (winner) {
            setStatus(`Winner is ${winner}!`);
        } else if (squares.every((square) => square !== '')) {
            setStatus('This is a draw! Please restart the game.');
        } else {
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
        }
    }, [squares, isXTurn]); // Only run when squares or isXTurn changes

    return (
        <div className="tic-tac-toe-container">
            <div className="status">{status}</div>  {/* Display the game status */}
            <div className="row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </div>
    );
}
