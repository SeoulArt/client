import backArrow from "@/assets/backArrow.svg";
import styles from "./index.module.css";
import { useNavigate } from "react-router";

interface Props {
    title: string;
    isEditable?: boolean;
}

const TitleWithBackButton = ({ title, isEditable = false }: Props) => {
    const navigate = useNavigate();

    return (
        <header className={styles.layout}>
            <button onClick={() => navigate(-1)}>
                <img src={backArrow} />
            </button>
            <h2>{title}</h2>
            {isEditable && <button>수정하기</button>}
        </header>
    );
};

export default TitleWithBackButton;
