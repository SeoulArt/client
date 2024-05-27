import Loading from "@/components/Loading";
import baseAxios from "@/queries/baseAxios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import authStore from "@/store/authStore";
import { CustomError, Token, User } from "@/types";

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
                const response = await baseAxios.post<
                    { user: User } & Token & CustomError
                >(
                    `/auth/${
                        (import.meta.env.MODE === "development"
                            ? "local/"
                            : "") + provider
                    }/login`,
                    { code }
                );
                if (response.status !== 200)
                    throw new Error(response.data.message);
                login({
                    ...response.data,
                });
                toast.success(`환영합니다 ${response.data.user.username}님`);
                const redirectUrl = localStorage.getItem("redirectUrl") || "/";
                navigate(redirectUrl);
            } catch (error) {
                toast.error("로그인 중 문제가 발생하였습니다.");
                navigate("/");
            } finally {
                localStorage.removeItem("redirectUrl");
            }
        })();
    }, []);

    return <Loading isPageLoading={false} />;
};

export default OauthCallback;
