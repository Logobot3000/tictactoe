import styles from '@/styles/play.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';

let socket;

export default function Elite() {
    const [squares, setSquares] = useState(Array(25).fill(null));
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
        await fetch("api/elite-socket");

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
        setSquares(Array(25).fill(null));
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
                        <Board squares={ squares } onSquareClick={ handleClick }/>
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
                <Square value={squares[0]} onSquareClick={() => onSquareClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => onSquareClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => onSquareClick(2)}/>
                <Square value={squares[3]} onSquareClick={() => onSquareClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => onSquareClick(4)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[5]} onSquareClick={() => onSquareClick(5)}/>
                <Square value={squares[6]} onSquareClick={() => onSquareClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => onSquareClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => onSquareClick(8)}/>
                <Square value={squares[9]} onSquareClick={() => onSquareClick(9)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[10]} onSquareClick={() => onSquareClick(10)}/>
                <Square value={squares[11]} onSquareClick={() => onSquareClick(11)}/>
                <Square value={squares[12]} onSquareClick={() => onSquareClick(12)}/>
                <Square value={squares[13]} onSquareClick={() => onSquareClick(13)}/>
                <Square value={squares[14]} onSquareClick={() => onSquareClick(14)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[15]} onSquareClick={() => onSquareClick(15)}/>
                <Square value={squares[16]} onSquareClick={() => onSquareClick(16)}/>
                <Square value={squares[17]} onSquareClick={() => onSquareClick(17)}/>
                <Square value={squares[18]} onSquareClick={() => onSquareClick(18)}/>
                <Square value={squares[19]} onSquareClick={() => onSquareClick(19)}/>
            </div>
            <div className={styles.boardRow}>
                <Square value={squares[20]} onSquareClick={() => onSquareClick(20)}/>
                <Square value={squares[21]} onSquareClick={() => onSquareClick(21)}/>
                <Square value={squares[22]} onSquareClick={() => onSquareClick(22)}/>
                <Square value={squares[23]} onSquareClick={() => onSquareClick(23)}/>
                <Square value={squares[24]} onSquareClick={() => onSquareClick(24)}/>
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