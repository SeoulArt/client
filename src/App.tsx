import MobileLayout from "layout/MobileLayout";
import Onboarding from "pages/Onboarding";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <MobileLayout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Onboarding />}></Route>
                </Routes>
            </BrowserRouter>
        </MobileLayout>
    );
}

export default App;
