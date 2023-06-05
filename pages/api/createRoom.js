import { nanoid } from 'nanoid';

const activeRooms = new Set();

function createRoom() {
    const room = nanoid(8);
    activeRooms.add(room);
    return room;
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        const room = createRoom();
        res.status(200).json({ room });
    } else {
        res.status(405).end();
    }
}
