import Link from "next/link";
import styles from '@/styles/home.module.css';

export default function Home() {
    return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <h1>Tic-Tac-Toe</h1>
        </div>
        <div className={styles.mainContainer}>
            <Link href={'/play/normal'}><h1>Play</h1></Link>
            <h5 className={styles.pBottom}>3x3, 3 in a row</h5>
            <Link href={'/multiplayer'}><h1>Play Multiplayer</h1></Link>
            <h5 className={styles.pBottom}>3x3, 3 in a row</h5>
            <Link href={'/play/ai'}><h1>Play vs. AI</h1></Link>
            <h5 className={styles.pBottom}>3x3, 3 in a row</h5>
            <Link href={'/play/elite'}><h1>Play Elite</h1></Link>
            <h5 className={styles.pBottom}>5x5, 4 in a row</h5>
            <Link href={'/play/ultimate'}><h1>Play Ultimate</h1></Link>
            <h5 className={styles.pBottom}>7x7, 4 in a row</h5>
        </div>
    </div>);
} 