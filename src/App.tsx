import MobileLayout from "layout/MobileLayout";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <MobileLayout>
            <BrowserRouter>
                <header>I'm head</header>
                <Routes>
                    <Route path="/" element={<div>heeloo</div>}></Route>
                </Routes>
            </BrowserRouter>
        </MobileLayout>
    );
}

export default App;
