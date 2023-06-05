export default function aiHandler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' });
        return;
    }
    const body = req.body;
    let pick;

    if (body.difficulty === 0) pick = chooseSquare(body.squares);
    if (body.difficulty === 1) pick = chooseSquareWhileDefensive(body.squares);
    if (body.difficulty === 2) pick = chooseSquareWhileDefensiveAndOffensive(body.squares);

    res.status(200).json({ pick: pick });
}

function chooseSquareWhileDefensiveAndOffensive(squares) {
    const almostWinningPositions = [
        [0, 1],
        [1, 2],
        [0, 2],
        [3, 4],
        [4, 5],
        [3, 5],
        [6, 7],
        [7, 8],
        [6, 8],
        [0, 3],
        [3, 6],
        [0, 6],
        [1, 4],
        [4, 7],
        [1, 7],
        [2, 5],
        [5, 8],
        [2, 8],
        [0, 4],
        [4, 8],
        [0, 8],
        [2, 4],
        [4, 6],
        [2, 6]
    ];
    const missingNumbers = [
        2,
        0,
        1,
        5,
        3,
        4,
        8,
        6,
        7,
        6,
        0,
        3,
        7,
        1,
        4,
        8,
        2,
        5,
        8,
        0,
        4,
        6,
        2,
        4
    ];
    for (let i = 0; i < almostWinningPositions.length; i++) {
        let [posA, posB] = almostWinningPositions[i];
        if (squares[posA] && squares[posA] === 'O' && squares[posB] == 'O' && squares[missingNumbers[i]] === null) return missingNumbers[i];
    }
    for (let i = 0; i < almostWinningPositions.length; i++) {
        let [posA, posB] = almostWinningPositions[i];
        if (squares[posA] && squares[posA] === squares[posB] && squares[missingNumbers[i]] === null) return missingNumbers[i];
    }
    return chooseSquare(squares);
}

function chooseSquare(squares) {
    let pick = RNG(0, 8);
    if (squares[pick] !== null) pick = chooseSquare(squares);
    return pick;
}

function chooseSquareWhileDefensive(squares) {
    const almostWinningPositions = [
        [0, 1],
        [1, 2],
        [0, 2],
        [3, 4],
        [4, 5],
        [3, 5],
        [6, 7],
        [7, 8],
        [6, 8],
        [0, 3],
        [3, 6],
        [0, 6],
        [1, 4],
        [4, 7],
        [1, 7],
        [2, 5],
        [5, 8],
        [2, 8],
        [0, 4],
        [4, 8],
        [0, 8],
        [2, 4],
        [4, 6],
        [2, 6]
    ];
    const missingNumbers = [
        2,
        0,
        1,
        5,
        3,
        4,
        8,
        6,
        7,
        6,
        0,
        3,
        7,
        1,
        4,
        8,
        2,
        5,
        8,
        0,
        4,
        6,
        2,
        4
    ];
    for (let i = 0; i < almostWinningPositions.length; i++) {
        let [posA, posB] = almostWinningPositions[i];
        if (squares[posA] && squares[posA] === 'X' && squares[posB] == 'X' && squares[missingNumbers[i]] === null) return missingNumbers[i];
    }
    return chooseSquare(squares);
}

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}