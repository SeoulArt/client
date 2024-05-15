import React from "react";
import styles from "./index.module.css";

const Textarea = ({
    className,
    maxLength = 100,
    ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={`${styles.layout} ${className}`}
            {...rest}
            maxLength={maxLength}
        />
    );
};

export default Textarea;
