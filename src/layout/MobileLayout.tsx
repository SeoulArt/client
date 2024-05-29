import styles from "./MobileLayout.module.css";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import RouteChangeTracker from "@/RouteChangeTracker";

const MobileLayout = () => {
    RouteChangeTracker();

    return (
        <div className={styles.wrapper}>
            <Toaster />
            <div className={styles.mobileContent}>
                <Outlet />
            </div>
        </div>
    );
};

export default MobileLayout;
