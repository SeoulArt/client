import Button from "UI/Button";
import authStore from "store/authStore";
import styles from "./index.module.css";

const MyPage = () => {
    const { user } = authStore();

    const isAuthenticated = user !== null;

    return (
        <div className={styles.layout}>
            <h2 className={styles.heading3}>프로필</h2>
            <div className={styles.explains}>
                <span>
                    {isAuthenticated
                        ? "로그인한 상태입니다."
                        : "로그인한 상태가 아닙니다."}
                </span>
                <span>
                    {isAuthenticated
                        ? "로그아웃을 하고 싶으시면 아래 버튼을 눌러주세요."
                        : "아래 간편 로그인을 통해 회원이 되어주세요."}
                </span>
            </div>
            <div className={styles.buttons}>
                {isAuthenticated ? (
                    <Button buttonType="default">로그아웃</Button>
                ) : (
                    <>
                        <Button buttonType="kakao">카카오로 계속하기</Button>
                        <Button buttonType="naver">네이버로 계속하기</Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyPage;
