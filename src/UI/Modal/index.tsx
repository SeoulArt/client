import ReactDOM from "react-dom";
import styles from "./index.module.css";
import UIStore from "@/store/UIStore";
import { useState } from "react";
import baseAxios from "@/queries/baseAxios";
import toast from "react-hot-toast";
import authStore from "@/store/authStore";

const Modal = () => {
    const { addPhoneNumber } = authStore();
    const { texts, isMobile, close, onSubmit } = UIStore();
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberSubmit = async () => {
        try {
            setIsLoading(true);
            await baseAxios.post("/user/mobile", { mobile: phoneNumber });
            addPhoneNumber(phoneNumber);
            toast.success("전화번호가 등록되었습니다.");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.upperIndex}>
            <div
                className={styles.overlay}
                onClick={() => {
                    isMobile
                        ? toast.error(
                              "예약 확인을 위해 핸드폰 번호를 등록해주세요"
                          )
                        : close();
                }}
            ></div>
            <div className={styles.modal}>
                <div className={styles.description}>
                    {texts?.map((text) => (
                        <span key={text}>{text}</span>
                    ))}
                </div>
                {isMobile && (
                    <input
                        type="tel"
                        maxLength={13}
                        value={phoneNumber}
                        onChange={(event) =>
                            setPhoneNumber(
                                event.target.value
                                    .replace(/[^0-9]/g, "")
                                    .replace(
                                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                                        `$1-$2-$3`
                                    )
                            )
                        }
                    />
                )}
                <button
                    disabled={
                        isLoading ||
                        (isMobile && phoneNumber.trim().length !== 13)
                    }
                    onClick={async () => {
                        onSubmit && onSubmit();
                        isMobile && (await handlePhoneNumberSubmit());
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
