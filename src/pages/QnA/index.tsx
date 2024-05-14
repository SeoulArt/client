import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { PLAYS_MAP } from "@/constants";

const QnA = () => {
    return (
        <div className={styles.layout}>
            {Array.from(PLAYS_MAP.keys()).map((playId) => (
                <div key={playId}>
                    <Link to={`/qna/${playId}`} />
                </div>
            ))}
        </div>
    );
};

export default QnA;
