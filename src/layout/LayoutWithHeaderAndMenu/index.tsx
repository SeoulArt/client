import Menu from "layout/Menu";
import { Outlet } from "react-router";
import styles from "./index.module.css";

const LayoutWithHeaderAndMenu = () => {
    return (
        <div className={styles.layout}>
            <Outlet />
            <Menu />
        </div>
    );
};

export default LayoutWithHeaderAndMenu;
