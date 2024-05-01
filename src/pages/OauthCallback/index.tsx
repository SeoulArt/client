import baseAxios from "queries/baseAxios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
// import authStore from "store/authStore";

const OauthCallback = () => {
    // const {login} = authStore()
    const { provider } = useParams();
    const navigate = useNavigate();
    const Address = new URL(window.location.href);
    const code = Address.searchParams.get("code") || "";

    useEffect(() => {
        if (code) {
            (async () => {
                try {
                    await baseAxios.post(`/oauth/login/${provider}`, code);
                    // login(user);
                } catch (error) {
                    console.log("코드 인증에 실패했습니다.");
                    navigate(-1);
                }
            })();
        }
    }, []);

    if (!code || (provider !== "kakao" && provider !== "naver"))
        return <Navigate to={"/onboarding"} replace />;
    return <div>로딩 중</div>;
};

export default OauthCallback;
