const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: 'http://18.218.62.85:3000',
        methods: ['GET', 'POST'],
    },
});

const gameStates = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);

        if (!gameStates[room]) {
            gameStates[room] = {
                squares: Array(9).fill(null),
                xTurn: true,
                winner: null,
                players: [],
            };
        }

        const gameState = gameStates[room];

        if (gameState.players.length < 2) {
            // Assign the player to X or O
            const symbol = gameState.players.length === 0 ? 'X' : 'O';
            gameState.players.push(socket.id);

            // Emit the assigned symbol to the player
            socket.emit('playerSymbol', symbol);
        }

        io.to(room).emit('gameState', gameState);
    });

    socket.on('move', ({ room, squares, xTurn, winner }) => {
        if (gameStates[room]) {
            gameStates[room].squares = squares;
            gameStates[room].xTurn = xTurn;
            gameStates[room].winner = winner;

            io.to(room).emit('gameState', gameStates[room]);
        }
    });

    socket.on('playAgain', (room) => {
        if (gameStates[room]) {
            gameStates[room].squares = Array(9).fill(null);
            gameStates[room].xTurn = true;
            gameStates[room].winner = null;

            io.to(room).emit('gameState', gameStates[room]);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Clean up any necessary resources or handle disconnection logic

        // Find the room that the disconnected socket belongs to
        const roomToRemove = Object.entries(gameStates).find(
            ([room, gameState]) => gameState.players.includes(socket.id)
        );

        // Remove the player from the room
        if (roomToRemove) {
            const [room, gameState] = roomToRemove;
            gameState.players = gameState.players.filter((player) => player !== socket.id);

            // If the room has no players left, remove the room from gameStates
            if (gameState.players.length === 0) {
                delete gameStates[room];
            }
        }
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
