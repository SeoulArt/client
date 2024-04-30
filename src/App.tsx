import MobileLayout from "layout/MobileLayout";
import Home from "pages/Home";
import MyPage from "pages/MyPage";
import Onboarding from "pages/Onboarding";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <MobileLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
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
