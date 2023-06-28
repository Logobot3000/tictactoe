import styles from '@/styles/play.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Play({ room }) {
    const [roomId, setRoomId] = useState(room);
    const [joinRoomId, setJoinRoomId] = useState('');

    async function createRoom() {
        const response = await fetch('/api/createRoom', { method: 'GET' });
        const data = await response.json();
        setRoomId(data.room);
    }

    return (
        <div className={styles.centeredContainer}>
            {roomId ? (
                <div>
                    <h2>Room ID: {roomId}</h2>
                    <h4>Share this room ID with your opponent to join the game.</h4>
                    <br /><br />
                    <Link className='joinButton' href={`/play/multiplayer/normal?room=${roomId}`}>
                        Join Room (Normal)
                    </Link>
                    <Link className='joinButton' href={`/play/multiplayer/elite?room=${roomId}`}>
                        Join Room (Elite)
                    </Link>
                </div>
            ) : (
                <div>
                    <h2>Create a New Room</h2>
                    <button onClick={createRoom} className='choiceButton'>Create Room</button>
                    <h2>Or Join an Already Existing Room</h2>
                    <label className={styles.whiteText}>Room code goes here:</label>
                    <input onChange={event => setJoinRoomId(event.target.value)} type='text' value={joinRoomId} accept='string'/>
                    <br /><br />
                    <Link className='choiceButton' href={`/play/multiplayer/normal?room=${joinRoomId}`}>Join Room (Normal)</Link>
                    <Link className='choiceButton' href={`/play/multiplayer/elite?room=${joinRoomId}`}>Join Room (Elite)</Link>
                </div>
            )}
        </div>
    );
}
