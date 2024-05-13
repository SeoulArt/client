import Header from "layout/Header";
import LayoutWithHeaderAndMenu from "layout/LayoutWithHeaderAndMenu";
import MobileLayout from "layout/MobileLayout";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import OauthCallback from "pages/OauthCallback";
import Onboarding from "pages/Onboarding";
import baseAxios from "queries/baseAxios";
import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import { User } from "src/types";
import authStore from "store/authStore";

const LOCAL_STORAGE_KEY = "isFirstTime";

function App() {
    const { user, login, logout } = authStore();
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
                const response = await baseAxios.post<User & Error>(
                    "/auth/refresh"
                );
                if (response.status !== 200)
                    throw new Error(response.data.message);
                login(response.data);
            } catch (error) {
                logout();
            }
        })();
    }, []);

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
                                    <Route
                                        path="/plays"
                                        element={<div>plays</div>}
                                    />
                                    <Route
                                        path="/creators"
                                        element={<div>creators</div>}
                                    />
                                    <Route
                                        path="/qna"
                                        element={<div>qna</div>}
                                    />
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
