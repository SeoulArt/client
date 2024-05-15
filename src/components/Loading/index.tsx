import styles from "./index.module.css";
import blueCircle from "@/assets/loadingBlueCircle.svg";
import redCircle from "@/assets/loadingRedCircle.svg";
import yellowCircle from "@/assets/loadingYellowCircle.svg";
import greenCircle from "@/assets/loadingGreenCircle.svg";

const Loading = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.spacer} />
            <div className={styles.animationWrapper}>
                <img src={blueCircle} alt="" />
                <img src={redCircle} alt="" />
                <img src={yellowCircle} alt="" />
                <img src={greenCircle} alt="" />
            </div>
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
