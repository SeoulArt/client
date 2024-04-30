import React from "react";
import styles from "./MobileLayout.module.css";
import { useLocation } from "react-router";
import Header from "layout/Header";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();

    const isOnboardingPage = pathname === "/onboarding";

    return (
        <div className={styles.wrapper}>
            <div className={styles.mobileContent}>
                {isOnboardingPage || (
                    <Header isOnMyPage={pathname === "/mypage"} />
                )}
                {children}
            </div>
        </div>
    );
};

export default MobileLayout;
