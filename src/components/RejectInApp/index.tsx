import Button from "@/UI/Button";
import styles from "./index.module.css";

const RejectInApp = () => {
    return (
        <div className={styles.layout}>
            <h1>
                카카오톡 인앱 브라우저에서는
                <br /> 해당 서비스를 지원하지 않습니다.
            </h1>
            <Button
                onClick={() => {
                    location.href =
                        "kakaotalk://web/openExternal?url=" +
                        encodeURIComponent(location.href);
                }}
            >
                외부 브라우저 이용하기
            </Button>
        </div>
    );
};

export default RejectInApp;
