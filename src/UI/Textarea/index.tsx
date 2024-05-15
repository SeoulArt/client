import React from "react";
import styles from "./index.module.css";

const Textarea = ({
    className,
    ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return <textarea className={`${styles.layout} ${className}`} {...rest} />;
};

export default Textarea;
