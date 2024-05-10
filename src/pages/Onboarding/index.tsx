import Button from "UI/Button";
import styles from "./index.module.css";
import { useRef } from "react";
import useWaitImageLoad from "hooks/useWaitImageLoad";
import { useNavigate } from "react-router";

const Onboarding = ({ onSkipOnboarding }: { onSkipOnboarding: () => void }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const isImageLoaded = useWaitImageLoad(imgRef);
    const navigate = useNavigate();

    const handleStart = () => {
        onSkipOnboarding();
        navigate("/");
    };

    return (
        <div className={styles.layout}>
            <div className={styles.logoContainer}>
                {isImageLoaded && (
                    <p>
                        <span>Welcome</span>
                        <span>To</span>
                        <span>My PlayGround</span>
                    </p>
                )}

                <img
                    ref={imgRef}
                    src="logo.svg"
                    alt="playground logo"
                    width={300}
                    height={300}
                />
            </div>
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
