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
import { CustomError, User } from "@/types";
import baseAxios from "@/queries/baseAxios";
import Ticketing from "@/pages/Ticketing";
import Loading from "@/components/Loading";

const LOCAL_STORAGE_KEY = "isFirstTime";

function App() {
    const { login, logout, isLoading } = authStore();
    const [isFirstTime, setIsFirstTime] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "true")
    );

    const skipOnboarding = () => {
        setIsFirstTime(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "false");
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await baseAxios.post<User & CustomError>(
                    "/auth/refresh"
                );
                if (response.status !== 200)
                    throw new Error(response.data.message);
                login({
                    ...response.data,
                });
            } catch (error) {
                logout();
            }
        })();
    }, []);

    if (isLoading) return <Loading />;

    return (
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
                            element={<Navigate to={"/onboarding"} replace />}
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
                                <Route element={<LayoutWithHeaderAndMenu />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/plays">
                                        <Route path="" element={<Plays />} />
                                        <Route
                                            path=":id"
                                            element={<PlayDetail />}
                                        />
                                    </Route>
                                    <Route path="/creators">
                                        <Route path="" element={<Creators />} />
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
                                    <Route
                                        path="/community"
                                        element={<div>community</div>}
                                    />
                                </Route>
                                <Route path="/mypage" element={<MyPage />} />
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
    );
}

export default App;
