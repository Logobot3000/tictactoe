import Link from "next/link";
import styles from '@/styles/home.module.css';

export default function Home() {
    return (
    <div className={styles.container}>
        <div className={styles.titleContainer}>
            <h1>Tic-Tac-Toe</h1>
        </div>
        <div className={styles.mainContainer}>
            <Link href={'/multiplayer'}><h1>Play</h1></Link>
            <h5 className={styles.pBottom}>Play Normal or Elite with others!</h5>
            <Link href={'/play/ai'}><h1>Play vs. AI</h1></Link>
            <h5 className={styles.pBottom}>Play Normal with 3 difficulties of AI!</h5>
            <br /><br />
            <Link href={'/play/normal'}><h2>Play Normal (One-device)</h2></Link>
            <h5 className={styles.pBottom}>3x3, 3 in a row</h5>
            <Link href={'/play/elite'}><h2>Play Elite (One-device)</h2></Link>
            <h5 className={styles.pBottom}>5x5, 4 in a row</h5>
            <Link href={'/play/ultimate'}><h2>Play Ultimate (One-device)</h2></Link>
            <h5 className={styles.pBottom}>7x7, 4 in a row</h5>
        </div>
    </div>);
} 