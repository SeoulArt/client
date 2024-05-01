import MobileLayout from "layout/MobileLayout";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import OauthCallback from "pages/OauthCallback";
import Onboarding from "pages/Onboarding";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import authStore from "store/authStore";

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
            <MobileLayout>
                <Routes>
                    {!isFirstTime && <Route path="/" element={<Home />} />}
                    <Route path="/mypage" element={<MyPage />} />
                    <Route
                        path="/onboarding"
                        element={
                            <Onboarding onSkipOnboarding={skipOnboarding} />
                        }
                    />
                    {!user && (
                        <Route
                            path="/oauth/callback/:provider"
                            element={<OauthCallback />}
                        />
                    )}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={isFirstTime ? "/onboarding" : "/"}
                                replace
                            />
                        }
                    />
                </Routes>
            </MobileLayout>
        </BrowserRouter>
    );
}

export default App;
