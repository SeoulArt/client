import React from "react";
import styles from "./index.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType?: "default" | "kakao" | "naver";
}

const Button = ({ children, buttonType = "default", ...rest }: ButtonProps) => {
    const leftIcon =
        import.meta.env.VITE_STORAGE_HOSTNAME +
        (buttonType === "kakao" ? "/menu/kakao.svg" : "/menu/naver.svg");

    return (
        <button className={`${styles.flex} ${styles[buttonType]}`} {...rest}>
            {buttonType !== "default" && <img src={leftIcon} />}
            {children}
        </button>
    );
};

export default Button;
