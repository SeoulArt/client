import React from "react";
import styles from "./MobileLayout.module.css";
import { useLocation } from "react-router";
import Header from "layout/Header";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();
    console.log(pathname);
    const shouldHeaderHide =
        pathname === "/onboarding" ||
        pathname === "/oauth/callback/kakao" ||
        pathname === "/oauth/callback/naver";

    return (
        <div className={styles.wrapper}>
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
