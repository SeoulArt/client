import React from "react";
import styles from "./index.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    // type: "default" | "kakao" | "naver";
}

const Button = ({ children, type, ...rest }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${styles.flex} ${styles.default}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
