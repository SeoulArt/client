import Header from "@/layout/Header";
import LayoutWithHeaderAndMenu from "@/layout/LayoutWithHeaderAndMenu";
import MobileLayout from "@/layout/MobileLayout";
import Home from "@/pages/Home";
import MyPage from "@/pages/MyPage";
import OauthCallback from "@/pages/OauthCallback";
import Onboarding from "@/pages/Onboarding";
import Plays from "@/pages/Plays";
import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import authStore from "@/store/authStore";
import PlayDetail from "@/pages/Plays/PlayDetail";
import Creators from "@/pages/Plays/Creators";
import CreatorDetail from "@/pages/Plays/Creators/CreatorDetail";
import QnA from "@/pages/QnA";
import QnADetail from "@/pages/QnA/QnADetail";
import Questions from "@/pages/QnA/Questions";
import CreateQuestion from "@/pages/QnA/CreateQuestion";
import { CustomError, Token, User } from "@/types";
import baseAxios from "@/queries/baseAxios";
import Ticketing from "@/pages/Ticketing";
import Loading from "@/components/Loading";
import Modal from "@/UI/Modal";
import UIStore from "@/store/UIStore";
import toast from "react-hot-toast";
import RejectInApp from "@/components/RejectInApp";
import useAxiosInterceptor from "@/hooks/useAxiosInterceptor";
import CreatorDescription from "@/pages/MyPage/CreatorDescription";
import MyProfile from "@/pages/MyPage/MyProfile";
import Review from "@/pages/Review";
import ReviewDetail from "@/pages/Review/ReviewDetail";
import Reviews from "@/pages/Review/Reviews";
import CreateReview from "@/pages/Review/CreateReview";
import Phone from "@/pages/MyPage/Phone";
import MyQuestions from "@/pages/MyPage/MyQuestions";
import MyAnswers from "@/pages/MyPage/MyAnswers";
import MyReviews from "@/pages/MyPage/MyReviews";

const IS_FIRST_TIME = "isFirstTime";

const IS_KAKAO = navigator.userAgent.toLowerCase().includes("kakao");

function App() {
    useAxiosInterceptor();
    const {
        user,
        setIsLoading,
        login,
        isLoading,
        isTypingPhoneNumber,
        cancelTicket,
    } = authStore();
    const { isOpened } = UIStore();
    const [isFirstTime, setIsFirstTime] = useState(
        JSON.parse(localStorage.getItem(IS_FIRST_TIME) || "true")
    );

    const skipOnboarding = () => {
        setIsFirstTime(false);
        localStorage.setItem(IS_FIRST_TIME, "false");
    };
    useEffect(() => {
        if (IS_KAKAO) return;
        (async () => {
            if (
                location.pathname === "/oauth/callback/kakao" ||
                location.pathname === "/oauth/callback/naver"
            )
                return setIsLoading(false);
            try {
                const response = await baseAxios.post<
                    { user: User } & Token & CustomError
                >("/auth/refresh");
                if (response.status !== 200)
                    throw new Error(response.data.message);
                login({
                    ...response.data,
                });
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (IS_KAKAO) return;
        try {
            if (!user || user?.phoneNumber || isTypingPhoneNumber) return;
            user?.ticketPlayList.forEach(async ({ ticketId }, index) => {
                await baseAxios.delete("/ticket", {
                    data: {
                        ticketId,
                    },
                });
                cancelTicket(ticketId);
                if (user?.ticketPlayList.length - 1 === index) {
                    toast.error(
                        "번호가 등록되지 않아 모든 예매가 취소되었습니다."
                    );
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, [user, user?.phoneNumber, isTypingPhoneNumber]);

    if (IS_KAKAO) {
        location.href =
            "kakaotalk://web/openExternal?url=" +
            encodeURIComponent(location.href);
        return <RejectInApp />;
    }

    if (isLoading) return <Loading />;

    return (
        <>
            {isOpened && <Modal />}
            <BrowserRouter>
                <Routes>
                    <Route element={<MobileLayout />}>
                        <Route
                            path="/onboarding"
                            element={
                                <Onboarding onSkipOnboarding={skipOnboarding} />
                            }
                        />
                        {isFirstTime ? (
                            <Route
                                path="*"
                                element={
                                    <Navigate to={"/onboarding"} replace />
                                }
                            />
                        ) : (
                            <>
                                <Route
                                    element={
                                        <>
                                            <Header />
                                            <Outlet />
                                        </>
                                    }
                                >
                                    <Route
                                        element={<LayoutWithHeaderAndMenu />}
                                    >
                                        <Route path="/" element={<Home />} />
                                        <Route path="/plays">
                                            <Route
                                                path=""
                                                element={<Plays />}
                                            />
                                            <Route
                                                path=":id"
                                                element={<PlayDetail />}
                                            />
                                        </Route>
                                        <Route path="/creators">
                                            <Route
                                                path=""
                                                element={<Creators />}
                                            />
                                            <Route
                                                path=":id"
                                                element={<CreatorDetail />}
                                            />
                                        </Route>
                                        <Route path="/qna">
                                            <Route path="" element={<QnA />} />
                                            <Route
                                                path=":playId/questions/new"
                                                element={<CreateQuestion />}
                                            />
                                            <Route
                                                path=":playId/questions/:questionId"
                                                element={<QnADetail />}
                                            />
                                            <Route
                                                path=":playId/questions"
                                                element={<Questions />}
                                            />
                                        </Route>
                                        <Route
                                            path="/contents"
                                            element={<div>contents</div>}
                                        />
                                        <Route path="/ticketing">
                                            <Route
                                                path=""
                                                element={<Ticketing />}
                                            />
                                        </Route>
                                        <Route path="/review">
                                            <Route
                                                path=""
                                                element={<Review />}
                                            />
                                            <Route
                                                path=":playId/reviews/new"
                                                element={<CreateReview />}
                                            />
                                            <Route
                                                path=":playId/reviews"
                                                element={<Reviews />}
                                            />
                                            <Route
                                                path=":playId/reviews/:reviewId"
                                                element={<ReviewDetail />}
                                            />
                                        </Route>
                                    </Route>
                                    <Route path="/mypage">
                                        <Route path="" element={<MyPage />} />
                                        <Route
                                            path="my-profile"
                                            element={<MyProfile />}
                                        />
                                        <Route
                                            path="creator"
                                            element={<CreatorDescription />}
                                        />
                                        <Route
                                            path="phone"
                                            element={<Phone />}
                                        />
                                        <Route
                                            path="question"
                                            element={<MyQuestions />}
                                        />
                                        <Route
                                            path="answer"
                                            element={<MyAnswers />}
                                        />
                                        <Route
                                            path="review"
                                            element={<MyReviews />}
                                        />
                                    </Route>
                                </Route>
                                {
                                    <Route
                                        path="/oauth/callback/:provider"
                                        element={<OauthCallback />}
                                    />
                                }
                                <Route
                                    path="*"
                                    element={<Navigate to={"/"} replace />}
                                />
                            </>
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
