import { useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { PLAYS } from "@/constants";

const Plays = () => {
    useEffect(() => {
        // 작품 3개 가져오기
    }, []);

    return (
        <ul className={styles.layout}>
            {PLAYS.map((play, index) => (
                <li key={play}>
                    <Link to={`/plays/${index}`}>
                        <span>{play}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Plays;
