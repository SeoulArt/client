import { Navigate, useParams } from "react-router";
import { PLAYS_MAP } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { DUMMY_QUESTIONS } from "@/data";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Questions = () => {
    const params = useParams();

    const playId = Number(params.playId) as 0 | 1 | 2;
    console.log("여기 걸리네");
    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <ul className={styles.list}>
                {DUMMY_QUESTIONS(playId).map((question) => (
                    <li key={question.id}>
                        <Link to={`/qna/${playId}/questions/${question.id}`}>
                            <span>
                                {question.isAnswered ? "답변완료" : "답변 미완"}
                            </span>
                            <p>{question.text}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Questions;
