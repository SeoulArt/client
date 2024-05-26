import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import styles from "./index.module.css";
import baseAxios from "@/queries/baseAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import myPageArrow from "@/assets/myPageArrow.svg";
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
            {!isAuthenticated && (
                <div className={styles.explains}>
                    <span> 로그인한 상태가 아닙니다.</span>
                    <span>아래 간편 로그인을 통해 회원이 되어주세요.</span>
                </div>
            )}
            {isAuthenticated && (
                <div className={styles.userUnits}>
                    <div className={styles.imageConfig}>
                        <h3>이미지 설정</h3>
                        <div>
                            <div>
                                <img
                                    src={user.profileImage}
                                    alt={"내 프로필 이미지"}
                                />
                                {user.username}
                            </div>
                            <button
                                onClick={() => navigate("/mypage/my-profile")}
                            >
                                수정하기
                            </button>
                        </div>
                    </div>
                    {user.role === "ROLE_CREATOR" && (
                        <>
                            {user.role === "ROLE_CREATOR" && (
                                <div className={styles.creator}>
                                    <h3>창작자 소개</h3>
                                    <button
                                        onClick={() =>
                                            navigate("/mypage/creator")
                                        }
                                    >
                                        <span>
                                            {user.description
                                                ? "수정하기"
                                                : "등록하기"}
                                        </span>
                                        <img src={myPageArrow} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
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
