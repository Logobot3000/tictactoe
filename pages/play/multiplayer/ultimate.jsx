import styles from '@/styles/play.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

let socket;

export default function Ultimate() {
    const [squares, setSquares] = useState(Array(49).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const [room, setRoom] = useState('');
    const [playerRole, setPlayerRole] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        socketInitializer();

        return () => {
            socket.disconnect();
        }
    }, []);

    async function socketInitializer() {
        await fetch("api/ultimate-socket");

        socket = io();

        const urlParams = new URLSearchParams(window.location.search);
        const roomParam = urlParams.get('room');
        setRoom(roomParam);

        socket.emit('joinRoom', roomParam);

        socket.on('playerSymbol', (symbol) => {
            setPlayerRole(symbol);
        });

        socket.on('gameState', (data) => {
            setSquares(data.squares);
            setXTurn(data.xTurn);
            setGameOver(!!getWinner(data.squares));
        });
    }

    const winner = getWinner(squares);

    let nextToPlay;
    let status;

    if (winner) {
        nextToPlay = null;
        status = `Winner: ${winner[0]}`;
    } else if (!playerRole || (xTurn && playerRole === 'O') || (!xTurn && playerRole === 'X')) {
        nextToPlay = null;
        status = 'Waiting for opponent...';
    } else {
        nextToPlay = `Next to play: ${xTurn ? 'X' : 'O'}`;
        status = null;
    }

    function playAgain() {
        setSquares(Array(49).fill(null));
        setGameOver(false);
        socket.emit('playAgain', room);
    }

    function handleClick(i) {
        if (
            squares[i] ||
            winner ||
            !playerRole ||
            (xTurn && playerRole === 'O') ||
            (!xTurn && playerRole === 'X')
        ) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xTurn ? 'X' : 'O';

        const move = {
            room: room,
            squares: nextSquares,
            xTurn: !xTurn,
            winner: winner,
        };
        socket.emit('move', move);
    }

    return (
        <>
            <div className={styles.container}>
                {
                    status ? '' : <div>
                        <h3 className={styles.nextToPlay}>
                            {nextToPlay}, Room: {room}, <Link href="/">Home</Link>
                        </h3>
                        <Board squares={squares} onSquareClick={handleClick} />
                    </div>
                }
            </div>
            <div className={styles.winnerContainer}>
                {
                    status ?
                        <div className={styles.winnerContainerFlex}>
                            <div className={styles.winner}>
                                <h1>{status}</h1>
                                <h5>{winner === 'Tie' ? '0.5 - 0.5' : winner && winner[0] === 'X' ? '1 - 0' : winner ? '0 - 1' : ''}</h5>
                                <h3 className={styles.padding}>{winner === 'Tie' ? '' : winner && winner[1] ? `4 in a row: ${winner[1][0]}, ${winner[1][1]}, ${winner[1][2]}, ${winner[1][3]}` : ''}</h3>
                                {gameOver && ( // Conditionally render "Play Again" button
                                    <button className={styles.winnerButton} onClick={playAgain}>
                                        Play Again
                                    </button>
                                )}
                                <Link className={styles.winnerButton} href={'/'}>Go to Home</Link>
                            </div>
                        </div> : ''
                }
            </div>
        </>
    );
}

function Board({ squares, onSquareClick }) {
    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardRow}>
                <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
                <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
                <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
                <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
                <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
                <Square value={squares[9]} onSquareClick={() => onSquareClick(9)} />
                <Square value={squares[10]} onSquareClick={() => onSquareClick(10)} />
                <Square value={squares[11]} onSquareClick={() => onSquareClick(11)} />
                <Square value={squares[12]} onSquareClick={() => onSquareClick(12)} />
                <Square value={squares[13]} onSquareClick={() => onSquareClick(13)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[14]} onSquareClick={() => onSquareClick(14)} />
                <Square value={squares[15]} onSquareClick={() => onSquareClick(15)} />
                <Square value={squares[16]} onSquareClick={() => onSquareClick(16)} />
                <Square value={squares[17]} onSquareClick={() => onSquareClick(17)} />
                <Square value={squares[18]} onSquareClick={() => onSquareClick(18)} />
                <Square value={squares[19]} onSquareClick={() => onSquareClick(19)} />
                <Square value={squares[20]} onSquareClick={() => onSquareClick(20)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[21]} onSquareClick={() => onSquareClick(21)} />
                <Square value={squares[22]} onSquareClick={() => onSquareClick(22)} />
                <Square value={squares[23]} onSquareClick={() => onSquareClick(23)} />
                <Square value={squares[24]} onSquareClick={() => onSquareClick(24)} />
                <Square value={squares[25]} onSquareClick={() => onSquareClick(25)} />
                <Square value={squares[26]} onSquareClick={() => onSquareClick(26)} />
                <Square value={squares[27]} onSquareClick={() => onSquareClick(27)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[28]} onSquareClick={() => onSquareClick(28)} />
                <Square value={squares[29]} onSquareClick={() => onSquareClick(29)} />
                <Square value={squares[30]} onSquareClick={() => onSquareClick(30)} />
                <Square value={squares[31]} onSquareClick={() => onSquareClick(31)} />
                <Square value={squares[32]} onSquareClick={() => onSquareClick(32)} />
                <Square value={squares[33]} onSquareClick={() => onSquareClick(33)} />
                <Square value={squares[34]} onSquareClick={() => onSquareClick(34)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[35]} onSquareClick={() => onSquareClick(35)} />
                <Square value={squares[36]} onSquareClick={() => onSquareClick(36)} />
                <Square value={squares[37]} onSquareClick={() => onSquareClick(37)} />
                <Square value={squares[38]} onSquareClick={() => onSquareClick(38)} />
                <Square value={squares[39]} onSquareClick={() => onSquareClick(39)} />
                <Square value={squares[40]} onSquareClick={() => onSquareClick(40)} />
                <Square value={squares[41]} onSquareClick={() => onSquareClick(41)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[42]} onSquareClick={() => onSquareClick(42)} />
                <Square value={squares[43]} onSquareClick={() => onSquareClick(43)} />
                <Square value={squares[44]} onSquareClick={() => onSquareClick(44)} />
                <Square value={squares[45]} onSquareClick={() => onSquareClick(45)} />
                <Square value={squares[46]} onSquareClick={() => onSquareClick(46)} />
                <Square value={squares[47]} onSquareClick={() => onSquareClick(47)} />
                <Square value={squares[48]} onSquareClick={() => onSquareClick(48)} />
            </div>
        </div>
    )
}

function Square({ value, onSquareClick }) {
    return (
        <button className={styles.ultimateSquare} onClick={onSquareClick}>
            {value}
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