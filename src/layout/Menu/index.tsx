import triangle from "@/assets/triangle.svg";
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
                    <Link to="/" onClick={() => setIsOpened(false)}>
                        작품
                    </Link>
                    <div>
                        <Link to="/contents" onClick={() => setIsOpened(false)}>
                            콘텐츠
                        </Link>
                        <Link to="/review" onClick={() => setIsOpened(false)}>
                            후기
                        </Link>
                    </div>
                    <a
                        href="https://booking.naver.com/booking/12/bizes/1029318?fbclid=PAZXh0bgNhZW0CMTEAAaazWvv1rO4qA5n_VbbBVRSBx1TiC2emu0-m0QWszRP7Jkrga-UBOfKd87A_aem_AcfP9Q6iagf17KwTd7JVlUppDEAMNZNDQTIr2fgFCCTMy9_4aUIwzvQ66bUH5nrfyI98hd5Lhf6bs4iFIell90Lj"
                        target="_blank"
                    >
                        예매
                    </a>
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
                <img
                    src={
                        import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/menu.svg"
                    }
                />
            </button>
        </div>
    );
};

export default Menu;
