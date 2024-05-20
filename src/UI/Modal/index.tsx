import ReactDOM from "react-dom";
import styles from "./index.module.css";
import UIStore from "@/store/UIStore";

const Modal = () => {
    const { texts, close, onSubmit } = UIStore();

    return ReactDOM.createPortal(
        <div className={styles.upperIndex}>
            <div className={styles.overlay} onClick={close}></div>
            <div className={styles.modal}>
                <div className={styles.description}>
                    {texts?.map((text) => (
                        <span key={text}>{text}</span>
                    ))}
                </div>
                <button
                    onClick={async () => {
                        onSubmit && onSubmit();
                        close();
                    }}
                >
                    확인
                </button>
            </div>
        </div>,
        document.getElementById("modal")!
    );
};

export default Modal;
