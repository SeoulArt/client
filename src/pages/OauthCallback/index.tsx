import baseAxios from "queries/baseAxios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
// import authStore from "store/authStore";

const OauthCallback = () => {
    // const {login} = authStore()
    const { provider } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (!code || (provider !== "kakao" && provider !== "naver"))
            return navigate("/");

        (async () => {
            try {
                await baseAxios.post(`/oauth/login/${provider}`, code);
                // login(user);
            } catch (error) {
                alert(error);
                navigate("/");
            }
        })();
    }, []);

    return <div>로딩 중</div>;
};

export default OauthCallback;
