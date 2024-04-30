import React from "react";
import styles from "./MobileLayout.module.css";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.mobileContent}>{children}</div>
        </div>
    );
};

export default MobileLayout;
