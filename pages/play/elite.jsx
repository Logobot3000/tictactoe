import styles from '@/styles/play.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Elite() {
    const [squares, setSquares] = useState(Array(25).fill(null));
    const [xTurn, setXTurn] = useState(true);

    const winner = getWinner(squares);
    let nextToPlay;
    let status;
    winner ? nextToPlay = null : nextToPlay = `Next to play: ${xTurn ? 'X' : 'O'}`;
    winner ? status = `Winner: ${winner[0]}` : status = null;
    if (winner === 'Tie') status = 'Tie';

    function playAgain() {
        setSquares(Array(25).fill(null));
        setXTurn(true);
    }

    return (
        <>
            <div className={styles.container}>
                {
                    status ? '' : <div>
                        <h3 className={styles.nextToPlay}>{ nextToPlay }, <Link href='/' className='link'>Home</Link></h3>
                        <Board squares={ squares } setSquares={ setSquares } xTurn={ xTurn } setXTurn={ setXTurn } winner={ winner }/>
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
                            <h3 className={styles.padding}>{winner === 'Tie' ? '' : `4 in a row: ${winner[1][0]}, ${winner[1][1]}, ${winner[1][2]}, ${winner[1][3]}`}</h3>
                            <button className={styles.winnerButton} onClick={playAgain}>Play Again</button>
                            <Link className={styles.winnerButton} href={'/'}>Go to Home</Link>
                        </div>
                    </div> : ''
                }
            </div>
        </>
    );
}

function Board({ squares, setSquares, xTurn, setXTurn, winner }) {
    function handleClick(i) {
        if (squares[i] || winner) return;
        const nextSquares = squares.slice();
        xTurn ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
        setSquares(nextSquares);
        setXTurn(!xTurn);
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardRow}>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
                <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
                <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
                <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
                <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
                <Square value={squares[16]} onSquareClick={() => handleClick(16)}/>
                <Square value={squares[17]} onSquareClick={() => handleClick(17)}/>
                <Square value={squares[18]} onSquareClick={() => handleClick(18)}/>
                <Square value={squares[19]} onSquareClick={() => handleClick(19)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[20]} onSquareClick={() => handleClick(20)}/>
                <Square value={squares[21]} onSquareClick={() => handleClick(21)}/>
                <Square value={squares[22]} onSquareClick={() => handleClick(22)}/>
                <Square value={squares[23]} onSquareClick={() => handleClick(23)}/>
                <Square value={squares[24]} onSquareClick={() => handleClick(24)}/>
            </div>
        </div>
    )
}

function Square({ value, onSquareClick }) {
    return (
        <button className={styles.eliteSquare} onClick={onSquareClick}>
                { value }
        </button>
    )
}

function getWinner(squares) {
    const winningPositions = [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [20, 21, 22, 23],
        [21, 22, 23, 24],
        [0, 5, 10, 15],
        [5, 10, 15, 20],
        [1, 6, 11, 16],
        [6, 11, 16, 21],
        [2, 7, 12, 17],
        [7, 12, 17, 22],
        [3, 8, 13, 18],
        [8, 13, 18, 23],
        [4, 9, 14, 19],
        [9, 14, 19, 24],
        [1, 7, 13, 19],
        [5, 11, 17, 23],
        [0, 6, 12, 18],
        [6, 12, 18, 24],
        [4, 8, 12, 16],
        [8, 12, 16, 20],
        [3, 7, 11, 15],
        [9, 13, 17, 21]
    ];
    for (let i = 0; i < winningPositions.length; i++) {
        const [posA, posB, posC, posD] = winningPositions[i];
        if (squares[posA] && squares[posA] === squares[posB] && squares[posA] === squares[posC] && squares[posA] === squares[posD]) return [squares[posA], winningPositions[i]];
    }
    let isTie = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) isTie = false;
    }
    if (isTie) return 'Tie';
    return null;
}