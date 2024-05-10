import Avatar from "assets/avatar.svg";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import authStore from "store/authStore";

const Header = ({ isOnMyPage }: { isOnMyPage: boolean }) => {
    const { user } = authStore();

    return (
        <header className={styles.layout}>
            <div className={styles.flex}>
                <Link to={"/"}>
                    <h1 className={styles.heading}>Playground</h1>
                </Link>
                {isOnMyPage || (
                    <Link to={"/mypage"}>
                        <img
                            src={user?.profileImage || Avatar}
                            alt={
                                user
                                    ? user.username + "님의 프로필 이미지"
                                    : "기본 프로필 이미지"
                            }
                        />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
