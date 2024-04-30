import React from "react";
import styles from "./index.module.css";
import kakaoIcon from "assets/kakao.svg";
import naverIcon from "assets/naver.svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    buttonType: "default" | "kakao" | "naver";
}

const Button = ({ children, buttonType = "default", ...rest }: ButtonProps) => {
    const leftIcon = buttonType === "kakao" ? kakaoIcon : naverIcon;

    return (
        <button className={`${styles.flex} ${styles[buttonType]}`} {...rest}>
            {buttonType !== "default" && <img src={leftIcon} />}
            {children}
        </button>
    );
};

export default Button;
