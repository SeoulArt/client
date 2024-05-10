import triangle from "assets/triangle.svg";
import styles from "./index.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    const [isOpened, setIsOpened] = useState(false);

    if (isOpened)
        return (
            <>
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpened(false)}
                />
                <div className={styles.activeMenu}>
                    <Link to="/plays" onClick={() => setIsOpened(false)}>
                        작품
                    </Link>
                    <div>
                        <Link to="/contents" onClick={() => setIsOpened(false)}>
                            콘텐츠
                        </Link>
                        <Link
                            to="/community"
                            onClick={() => setIsOpened(false)}
                        >
                            커뮤니티
                        </Link>
                    </div>
                    <Link to="/ticketing" onClick={() => setIsOpened(false)}>
                        예매
                    </Link>
                    <div className={`${styles.circle} ${styles.active}`}>
                        <img src={triangle} />
                    </div>
                </div>
            </>
        );

    return (
        <div className={styles.menuWrapper}>
            <button
                className={styles.menuContent}
                onClick={() => setIsOpened(true)}
            >
                <div className={styles.circle} />
                <img src={triangle} />
            </button>
        </div>
    );
};

export default Menu;
