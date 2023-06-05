import styles from '@/styles/play.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AI() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [difficulty, setDifficulty] = useState(0);

    function setDifficultyZero() {
        setDifficulty(0);
    }

    function setDifficultyOne() {
        setDifficulty(1);
    }

    function setDifficultyTwo() {
        setDifficulty(2);
    }

    const winner = getWinner(squares);
    let status;
    winner ? status = `Winner: ${winner[0]}` : status = null;
    if (winner === 'Tie') status = 'Tie';

    function playAgain() {
        setSquares(Array(9).fill(null));
    }

    return (
        <>
            <div className={styles.container}>
                {
                    status ? '' : <div>
                        <h3 className={styles.nextToPlay}>
                            Difficulty: { difficulty }, Set Difficulty: <button onClick={setDifficultyZero}>0</button> <button onClick={setDifficultyOne}>1</button> <button onClick={setDifficultyTwo}>2</button>, <Link href='/' className='link'>Home</Link>
                        </h3>
                        <Board squares={ squares } setSquares={ setSquares } winner={ winner } difficulty={ difficulty }/>
                    </div>
                }
            </div>
            <div className={styles.winnerContainer}>
                {
                    status ? 
                    <div className={styles.winnerContainerFlex}>
                        <div className={styles.winner}>
                            <h1>{status}</h1>
                            <h5>{winner === 'Tie' ? '0.5 - 0.5' : winner[0] === 'X' ? '1 - 0' : '0 - 1'}</h5>
                            <h3 className={styles.padding}>{winner === 'Tie' ? '' : `3 in a row: ${winner[1][0]}, ${winner[1][1]}, ${winner[1][2]}`}</h3>
                            <button className={styles.winnerButton} onClick={playAgain}>Play Again</button>
                            <Link className={styles.winnerButton} href={'/'}>Go to Home</Link>
                        </div>
                    </div> : ''
                }
            </div>
        </>
    );
}

function Board({ squares, setSquares, winner, difficulty }) {
    async function handleClick(i) {
        if (squares[i] || winner) return;
        const nextSquares = squares.slice();
        nextSquares[i] = 'X';
        setSquares(nextSquares);
        await sleep(50);
        if (getWinner(nextSquares)) return;
        await AIPlace(nextSquares, setSquares, difficulty);
    }

    async function AIPlace(squares, setSquares, difficulty) {
        const response = await fetch('../api/ai-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ difficulty: difficulty, squares: squares })
        });
        const resp = await response.json();
        const pick = resp.pick;

        if (winner) return;
        const nextSquares = squares.slice();
        nextSquares[pick] = 'O';
        setSquares(nextSquares);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardRow}>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </div>
    )
}

function Square({ value, onSquareClick }) {
    return (
        <button className={styles.square} onClick={onSquareClick}>
                { value }
        </button>
    )
}

function getWinner(squares) {
    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningPositions.length; i++) {
        const [posA, posB, posC] = winningPositions[i];
        if (squares[posA] && squares[posA] === squares[posB] && squares[posA] === squares[posC]) return [squares[posA], winningPositions[i]];
    }
    let isTie = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) isTie = false;
    }
    if (isTie) return 'Tie';
    return null;
}