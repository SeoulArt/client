import Avatar from "assets/avatar.svg";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Header = ({ isOnMyPage }: { isOnMyPage: boolean }) => {
    return (
        <header className={styles.layout}>
            <div className={styles.flex}>
                <Link to={"/"}>
                    <h1 className={styles.heading}>Playground</h1>
                </Link>
                {isOnMyPage || (
                    <Link to={"/mypage"}>
                        <img src={Avatar} alt="기본 프로필 이미지" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
