import Header from "@/layout/Header";
import LayoutWithHeaderAndMenu from "@/layout/LayoutWithHeaderAndMenu";
import MobileLayout from "@/layout/MobileLayout";
import Home from "@/pages/Home";
import MyPage from "@/pages/MyPage";
import OauthCallback from "@/pages/OauthCallback";
import Onboarding from "@/pages/Onboarding";
import Plays from "@/pages/Plays";
import { useState } from "react";
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

const LOCAL_STORAGE_KEY = "isFirstTime";

function App() {
    const { user } = authStore();
    const [isFirstTime, setIsFirstTime] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "true")
    );

    const skipOnboarding = () => {
        setIsFirstTime(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "false");
    };

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
                                            path=":id"
                                            element={<QnADetail />}
                                        />
                                    </Route>
                                    <Route
                                        path="/contents"
                                        element={<div>contents</div>}
                                    />
                                    <Route
                                        path="/ticketing"
                                        element={<div>ticketing</div>}
                                    />
                                    <Route
                                        path="/community"
                                        element={<div>community</div>}
                                    />
                                </Route>
                                <Route path="/mypage" element={<MyPage />} />
                            </Route>
                            {!user && (
                                <Route
                                    path="/oauth/callback/:provider"
                                    element={<OauthCallback />}
                                />
                            )}
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
