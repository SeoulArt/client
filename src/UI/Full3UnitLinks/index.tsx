import { Link } from "react-router-dom";
import styles from "./index.module.css";

interface Props {
    list: {
        key: number;
        text: string;
        img: string;
        link: string;
        disabled?: boolean;
    }[];
}

const Full3UnitLinks = ({ list }: Props) => {
    return (
        <ul className={styles.layout}>
            {list.map(({ key, text, img, link, disabled }, index) => (
                <li key={key}>
                    {disabled ? (
                        <div>
                            {index === 1 ? (
                                <>
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                    <img src={img} alt="playIcon" />
                                </>
                            ) : (
                                <>
                                    <img src={img} alt="playIcon" />
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                </>
                            )}
                        </div>
                    ) : link[0] === "h" ? (
                        <a href={link} target="_blank">
                            {index === 1 ? (
                                <>
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                    <img src={img} alt="playIcon" />
                                </>
                            ) : (
                                <>
                                    <img src={img} alt="playIcon" />
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                </>
                            )}
                        </a>
                    ) : (
                        <Link to={link}>
                            {index === 1 ? (
                                <>
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
                                    <img src={img} alt="playIcon" />
                                </>
                            ) : (
                                <>
                                    <img src={img} alt="playIcon" />
                                    {disabled ? (
                                        <div>
                                            <span>{text}</span>
                                            <span>comming soon...</span>
                                        </div>
                                    ) : (
                                        <span>{text}</span>
                                    )}
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
