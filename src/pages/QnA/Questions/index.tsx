import { Navigate, useNavigate, useParams } from "react-router";
import { PLAYS_MAP, PlayId } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { DUMMY_QUESTIONS } from "@/data";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";

const Questions = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();

    const playId = Number(params.playId) as PlayId;

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <div className={styles.layout}>
                <ul
                    className={`${styles.list} ${
                        !user ? styles.withoutButton : ""
                    } ${styles[`play${playId}`]}`}
                >
                    {DUMMY_QUESTIONS(playId).map((question) => (
                        <li key={question.id}>
                            <Link
                                to={`/qna/${playId}/questions/${question.id}`}
                            >
                                <p>
                                    <span
                                        className={
                                            question.isAnswered
                                                ? styles.answered
                                                : styles.notAnswered
                                        }
                                    >
                                        {question.isAnswered
                                            ? "답변완료"
                                            : "답변미완"}
                                    </span>
                                    {question.text}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
                {user && (
                    <Button
                        onClick={() => navigate(`/qna/${playId}/questions/new`)}
                    >
                        질문하기
                    </Button>
                )}
            </div>
        </>
    );
};

export default Questions;
