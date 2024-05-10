import React from "react";
import styles from "./MobileLayout.module.css";
import { useLocation } from "react-router";
import Header from "layout/Header";
import { Toaster } from "react-hot-toast";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();

    const shouldHeaderHide =
        pathname === "/onboarding" ||
        pathname === "/oauth/callback/kakao" ||
        pathname === "/oauth/callback/naver";

    return (
        <div className={styles.wrapper}>
            <Toaster />
            <div className={styles.mobileContent}>
                {shouldHeaderHide || (
                    <Header isOnMyPage={pathname === "/mypage"} />
                )}
                {children}
            </div>
        </div>
    );
};

export default MobileLayout;
