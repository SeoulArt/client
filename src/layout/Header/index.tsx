import Avatar from "@/assets/avatar.svg";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import authStore from "@/store/authStore";

const Header = () => {
    const { user } = authStore();
    const { pathname } = useLocation();

    return (
        <header className={styles.layout}>
            <div className={styles.flex}>
                <Link to={"/"}>
                    <h1 className={styles.heading}>Playground</h1>
                </Link>
                {pathname === "/mypage" || (
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
