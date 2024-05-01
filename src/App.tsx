import MobileLayout from "layout/MobileLayout";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import OauthCallback from "pages/OauthCallback";
import Onboarding from "pages/Onboarding";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import authStore from "store/authStore";

function App() {
    const { user } = authStore();

    return (
        <BrowserRouter>
            <MobileLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    {!user && (
                        <Route
                            path="/oauth/callback/:provider"
                            element={<OauthCallback />}
                        />
                    )}
                    <Route
                        path="*"
                        element={<Navigate to={"/onboarding"} replace />}
                    />
                </Routes>
            </MobileLayout>
        </BrowserRouter>
    );
}

export default App;
