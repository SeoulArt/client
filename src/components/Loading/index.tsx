import styles from "./index.module.css";

interface Props {
    isPageLoading?: boolean;
}

const Loading = ({ isPageLoading = true }: Props) => {
    return (
        <div className={styles.layout}>
            <div className={styles.spacer} />
            <div className={styles.animationWrapper}>
                <img
                    src={
                        "https://skybory-bucket.s3.ap-northeast-2.amazonaws.com/menu/loadingBlueCircle.svg"
                    }
                    alt="로딩 중 구 1"
                />
                <img
                    src={
                        "https://skybory-bucket.s3.ap-northeast-2.amazonaws.com/menu/loadingRedCircle.svg"
                    }
                    alt="로딩 중 구 2"
                />
                <img
                    src={
                        "https://skybory-bucket.s3.ap-northeast-2.amazonaws.com/menu/loadingYellowCircle.svg"
                    }
                    alt="로딩 중 구 3"
                />
                <img
                    src={
                        "https://skybory-bucket.s3.ap-northeast-2.amazonaws.com/menu/loadingGreenCircle.svg"
                    }
                    alt="로딩 중 구 4"
                />
            </div>
            <div className={styles.bottom}>
                <span className={styles.notification}>
                    잠시만 기다려주세요.
                </span>
                <span className={styles.explain}>
                    {isPageLoading
                        ? "페이지를 불러오고 있습니다."
                        : "잠시만 기다려주세요."}
                </span>
            </div>
        </div>
    );
};

export default Loading;
