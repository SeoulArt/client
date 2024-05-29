import Button from "@/UI/Button";
import styles from "./index.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router";

const Onboarding = ({ onSkipOnboarding }: { onSkipOnboarding: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const handleStart = () => {
        onSkipOnboarding();
        navigate("/");
    };

    return (
        <div className={styles.layout}>
            <video
                className={styles.video}
                ref={videoRef}
                src={import.meta.env.VITE_STORAGE_HOSTNAME + "/Onboarding.mp4"}
                autoPlay
                muted
                loop
                width={"100%"}
            />

            <footer className={styles.footer}>
                <Button onClick={handleStart}>시작하기</Button>
                <span className={styles.explain}>
                    서울예술대학교 연극제작실습I / III 에서 진행한 플랫폼입니다.
                </span>
            </footer>
        </div>
    );
};

export default Onboarding;
