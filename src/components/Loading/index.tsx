import styles from "./index.module.css";

const Loading = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.spacer} />
            <img src="" alt="" />
            <div className={styles.bottom}>
                <span className={styles.notification}>
                    잠시만 기다려주세요.
                </span>
                <span className={styles.explain}>
                    페이지를 불러오고 있습니다.
                </span>
            </div>
        </div>
    );
};

export default Loading;
