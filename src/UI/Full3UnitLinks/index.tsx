import { Link } from "react-router-dom";
import styles from "./index.module.css";

interface Props {
    list: { key: number; text: string; img: string; link: string }[];
}

const Full3UnitLinks = ({ list }: Props) => {
    return (
        <ul className={styles.layout}>
            {list.map(({ key, text, img, link }, index) => (
                <li key={key}>
                    {link[0] === "h" ? (
                        <a href={link} target="_blank">
                            {index === 1 ? (
                                <>
                                    <span>{text}</span>
                                    <img src={img} alt="playIcon" />
                                </>
                            ) : (
                                <>
                                    <img src={img} alt="playIcon" />
                                    <span>{text}</span>
                                </>
                            )}
                        </a>
                    ) : (
                        <Link to={link}>
                            {index === 1 ? (
                                <>
                                    <span>{text}</span>
                                    <img src={img} alt="playIcon" />
                                </>
                            ) : (
                                <>
                                    <img src={img} alt="playIcon" />
                                    <span>{text}</span>
                                </>
                            )}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Full3UnitLinks;
