import styles from '@/styles/play.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

const socket = io('https://tictactoe-mu-wine.vercel.app:3001');

export default function Normal() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const [room, setRoom] = useState('');
    const [playerRole, setPlayerRole] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
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

        return () => {
            socket.off('playerSymbol');
            socket.off('gameState');
        };
    }, []);

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
        setSquares(Array(9).fill(null));
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
                {status ? (
                    ''
                ) : (
                    <div>
                        <h3 className={styles.nextToPlay}>
                            {nextToPlay}, Room: {room}, <Link href="/">Home</Link>
                        </h3>
                        <Board squares={squares} onSquareClick={handleClick} />
                    </div>
                )}
            </div>
            <div className={styles.winnerContainer}>
                {status ? (
                    <div className={styles.winnerContainerFlex}>
                        <div className={styles.winner}>
                            <h1>{status}</h1>
                            <h5>{winner === 'Tie' ? '0.5 - 0.5' : winner && winner[0] === 'X' ? '1 - 0' : winner ? '0 - 1' : ''}</h5>
                            <h3 className={styles.padding}>
                                {winner === 'Tie'
                                    ? ''
                                    : winner && winner[1]
                                        ? `3 in a row: ${winner[1][0]}, ${winner[1][1]}, ${winner[1][2]}`
                                        : ''}
                            </h3>
                            {gameOver && ( // Conditionally render "Play Again" button
                                <button className={styles.winnerButton} onClick={playAgain}>
                                    Play Again
                                </button>
                            )}
                            <Link className={styles.winnerButton} href={'/'}>
                                Go to Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    ''
                )}
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
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
                <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
                <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
                <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
                <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
            </div>
        </div>
    );
}

function Square({ value, onSquareClick }) {
    return (
        <button className={styles.square} onClick={onSquareClick}>
            {value}
        </button>
    );
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
        [2, 4, 6],
    ];
    for (let i = 0; i < winningPositions.length; i++) {
        const [posA, posB, posC] = winningPositions[i];
        if (squares[posA] && squares[posA] === squares[posB] && squares[posA] === squares[posC]) {
            return [squares[posA], winningPositions[i]];
        }
    }
    let isTie = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            isTie = false;
        }
    }
    if (isTie) {
        return 'Tie';
    }
    return null;
}
