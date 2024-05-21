import { Navigate, useNavigate, useParams } from "react-router";
import { PLAYS_MAP, PlayId } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const Questions = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<
        { id: number; isAnswered: boolean; text: string }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    const playId = Number(params.playId) as PlayId;

    useEffect(() => {
        if (Number.isNaN(playId) || !PLAYS_MAP.get(playId)) return;
        // 질문 불러오는 로직
        try {
            setQuestions([]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [playId]);

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    if (isLoading) return <Loading />;

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <div className={styles.layout}>
                <ul
                    className={`${styles.list} ${
                        !user ? styles.withoutButton : ""
                    } ${styles[`play${playId}`]}`}
                >
                    {questions.length > 0 ? (
                        questions.map((question) => (
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
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <img
                                src={
                                    import.meta.env.VITE_STORAGE_HOSTNAME +
                                    "/menu/add-document-note_svgrepo.com.png"
                                }
                                alt=""
                            />
                            <span> 작성된 질문이 없습니다.</span>
                        </div>
                    )}
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
