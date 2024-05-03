import Loading from "components/Loading";
import baseAxios from "queries/baseAxios";
import { useEffect } from "react";
import toast from "react-hot-toast";
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
                const response = await baseAxios.post(
                    `/auth/${provider}/token`,
                    { code }
                );
                // login(user);
                console.log(response);
                toast.success("환영합니다 user님");
            } catch (error) {
                toast.error("로그인 중 문제가 발생하였습니다.");
                navigate("/");
            }
        })();
    }, []);

    return <Loading />;
};

export default OauthCallback;
