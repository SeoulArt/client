import { useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { PLAYS_MAP, PlayId } from "@/constants";
import play1Icon from "@/assets/play1Icon.png";
import play2Icon from "@/assets/play2Icon.png";
import play3Icon from "@/assets/play3Icon.png";

const PLAYS_WITH_ICONS: [PlayId, string, string][] = Array.from(
    PLAYS_MAP.entries()
).map(([key, name]) => [
    key,
    name,
    key === 1 ? play1Icon : key === 3 ? play2Icon : play3Icon,
]);

const Plays = () => {
    useEffect(() => {
        // 작품 3개 가져오기
    }, []);

    return (
        <ul className={styles.layout}>
            {PLAYS_WITH_ICONS.map(([key, name, img]) => (
                <li key={key}>
                    <Link to={`/plays/${key}`}>
                        {key === 3 ? (
                            <>
                                <span>{name}</span>
                                <img src={img} alt="playIcon" />
                            </>
                        ) : (
                            <>
                                <img src={img} alt="playIcon" />
                                <span>{name}</span>
                            </>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Plays;
