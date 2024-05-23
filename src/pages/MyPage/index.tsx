import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import styles from "./index.module.css";
import baseAxios from "@/queries/baseAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
interface OauthResponse {
    url: string;
}

const MyPage = () => {
    const { user, logout } = authStore();
    const navigate = useNavigate();
    const [isBeingAuthenticated, setIsBeingAuthenticated] = useState(false);
    const isAuthenticated = user !== null;

    const handleOauthLogin = async (provider: "Kakao" | "Naver") => {
        if (isBeingAuthenticated) return;
        setIsBeingAuthenticated(true);
        try {
            const response = await baseAxios.get<OauthResponse>(
                `/auth/${
                    import.meta.env.MODE === "development"
                        ? "local" + provider
                        : provider.toLowerCase()
                }/url`
            );
            if (response.status !== 200) throw Error();
            document.location.href = response.data.url;
        } catch (error) {
            toast.error("로그인 중 문제가 발생했습니다.");
            localStorage.removeItem("redirectUrl");
        } finally {
            setIsBeingAuthenticated(false);
        }
    };

    const resetUser = () => {
        logout();
        navigate("/");
    };

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
                    <Button buttonType="default" onClick={resetUser}>
                        로그아웃
                    </Button>
                ) : (
                    <>
                        <Button
                            buttonType="kakao"
                            onClick={() => handleOauthLogin("Kakao")}
                            disabled={isBeingAuthenticated}
                        >
                            카카오로 계속하기
                        </Button>
                        <Button
                            buttonType="naver"
                            onClick={() => handleOauthLogin("Naver")}
                            disabled={isBeingAuthenticated}
                        >
                            네이버로 계속하기
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyPage;
