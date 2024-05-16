import Loading from "@/components/Loading";
import baseAxios from "@/queries/baseAxios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import authStore from "@/store/authStore";
import { CustomError, User } from "@/types";

const OauthCallback = () => {
    const { login } = authStore();
    const { provider } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (!code || (provider !== "kakao" && provider !== "naver"))
            return navigate("/");

        (async () => {
            try {
                const response = await baseAxios.post<User & CustomError>(
                    `/auth/${provider}/login`,
                    { code }
                );
                if (response.status !== 200)
                    throw new Error(response.data.message);
                login({
                    ...response.data,
                });
                toast.success(`환영합니다 ${response.data.username}님`);
            } catch (error) {
                console.log(error);
                toast.error("로그인 중 문제가 발생하였습니다.");
            } finally {
                const redirectUrl = localStorage.getItem("redirectUrl") || "/";
                localStorage.removeItem("redirectUrl");
                navigate(redirectUrl);
            }
        })();
    }, []);

    return <Loading isPageLoading={false} />;
};

export default OauthCallback;
