import styles from '@/styles/play.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Ultimate() {
    const [squares, setSquares] = useState(Array(49).fill(null));
    const [xTurn, setXTurn] = useState(true);

    const winner = getWinner(squares);
    let nextToPlay;
    let status;
    winner ? nextToPlay = null : nextToPlay = `Next to play: ${xTurn ? 'X' : 'O'}`;
    winner ? status = `Winner: ${winner[0]}` : status = null;
    if (winner === 'Tie') status = 'Tie';

    function playAgain() {
        setSquares(Array(49).fill(null));
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
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
                <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
                <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
                <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
                <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
                <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
                <Square value={squares[16]} onSquareClick={() => handleClick(16)}/>
                <Square value={squares[17]} onSquareClick={() => handleClick(17)}/>
                <Square value={squares[18]} onSquareClick={() => handleClick(18)}/>
                <Square value={squares[19]} onSquareClick={() => handleClick(19)}/>
                <Square value={squares[20]} onSquareClick={() => handleClick(20)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[21]} onSquareClick={() => handleClick(21)}/>
                <Square value={squares[22]} onSquareClick={() => handleClick(22)}/>
                <Square value={squares[23]} onSquareClick={() => handleClick(23)}/>
                <Square value={squares[24]} onSquareClick={() => handleClick(24)}/>
                <Square value={squares[25]} onSquareClick={() => handleClick(25)}/>
                <Square value={squares[26]} onSquareClick={() => handleClick(26)}/>
                <Square value={squares[27]} onSquareClick={() => handleClick(27)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[28]} onSquareClick={() => handleClick(28)}/>
                <Square value={squares[29]} onSquareClick={() => handleClick(29)}/>
                <Square value={squares[30]} onSquareClick={() => handleClick(30)}/>
                <Square value={squares[31]} onSquareClick={() => handleClick(31)}/>
                <Square value={squares[32]} onSquareClick={() => handleClick(32)}/>
                <Square value={squares[33]} onSquareClick={() => handleClick(33)}/>
                <Square value={squares[34]} onSquareClick={() => handleClick(34)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[35]} onSquareClick={() => handleClick(35)}/>
                <Square value={squares[36]} onSquareClick={() => handleClick(36)}/>
                <Square value={squares[37]} onSquareClick={() => handleClick(37)}/>
                <Square value={squares[38]} onSquareClick={() => handleClick(38)}/>
                <Square value={squares[39]} onSquareClick={() => handleClick(39)}/>
                <Square value={squares[40]} onSquareClick={() => handleClick(40)}/>
                <Square value={squares[41]} onSquareClick={() => handleClick(41)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[42]} onSquareClick={() => handleClick(42)}/>
                <Square value={squares[43]} onSquareClick={() => handleClick(43)}/>
                <Square value={squares[44]} onSquareClick={() => handleClick(44)}/>
                <Square value={squares[45]} onSquareClick={() => handleClick(45)}/>
                <Square value={squares[46]} onSquareClick={() => handleClick(46)}/>
                <Square value={squares[47]} onSquareClick={() => handleClick(47)}/>
                <Square value={squares[48]} onSquareClick={() => handleClick(48)}/>
            </div>
        </div>
    )
}

function Square({ value, onSquareClick }) {
    return (
        <button className={styles.ultimateSquare} onClick={onSquareClick}>
                { value }
        </button>
    )
}

function getWinner(squares) {
    const winningPositions = [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [7, 8, 9, 10],
        [8, 9, 10, 11],
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [17, 18, 19, 20],
        [21, 22, 23, 24],
        [22, 23, 24, 25],
        [23, 24, 25, 26],
        [24, 25, 26, 27],
        [28, 29, 30, 31],
        [29, 30, 31, 32],
        [30, 31, 32, 33],
        [31, 32, 33, 34],
        [35, 36, 37, 38],
        [36, 37, 38, 39],
        [37, 38, 39, 40],
        [38, 39, 40, 41],
        [42, 43, 44, 45],
        [43, 44, 45, 46],
        [44, 45, 46, 47],
        [45, 46, 47, 48],
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [21, 28, 35, 42],
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        [15, 22, 29, 36],
        [22, 26, 36, 43],
        [2, 9, 16, 23],
        [9, 16, 23, 30],
        [16, 23, 30, 37],
        [23, 30, 37, 44],
        [3, 10, 17, 24],
        [10, 17, 24, 31],
        [17, 24, 31, 38],
        [24, 31, 38, 45],
        [4, 11, 18, 25],
        [11, 18, 25, 32],
        [18, 25, 32, 39],
        [25, 32, 39, 46],
        [5, 12, 19, 26],
        [12, 18, 26, 33],
        [18, 26, 33, 40],
        [26, 33, 40, 47],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [27, 34, 41, 48],
        [0, 8, 16, 24],
        [8, 16, 24, 32],
        [16, 24, 32, 40],
        [24, 32, 40, 48],
        [1, 9, 17, 25],
        [9, 17, 25, 33],
        [17, 25, 33, 41],
        [7, 15, 23, 31],
        [15, 23, 31, 39],
        [23, 31, 39, 47],
        [2, 10, 18, 26],
        [10, 18, 26, 34],
        [14, 22, 30, 38],
        [22, 30, 38, 46],
        [3, 11, 19, 27],
        [21, 29, 37, 45],
        [6, 12, 18, 24],
        [12, 18, 24, 30],
        [18, 24, 30, 36],
        [24, 30, 36, 42],
        [5, 11, 17, 23],
        [11, 17, 23, 29],
        [17, 23, 29, 35],
        [4, 10, 16, 22],
        [10, 16, 22, 28],
        [3, 9, 15, 21],
        [13, 19, 25, 31],
        [19, 25, 31, 36],
        [25, 31, 36, 43],
        [20, 26, 32, 38],
        [26, 32, 38, 44],
        [27, 33, 39, 45]

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