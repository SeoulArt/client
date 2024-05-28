import { PLAYS_MAP } from "@/constants";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

interface Props {
    linkTo: "qna" | "review";
}

const ThreePlayCircles = ({ linkTo }: Props) => {
    return (
        <div className={styles.layout}>
            {Array.from(PLAYS_MAP.keys()).map((playId) => (
                <div key={playId}>
                    <Link to={`/${linkTo}/${playId}/questions`} />
                </div>
            ))}
        </div>
    );
};

export default ThreePlayCircles;
