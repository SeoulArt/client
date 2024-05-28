import { Navigate, useNavigate, useParams } from "react-router";
import { PLAYS_MAP, PlayId } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";
import toast from "react-hot-toast";

interface Question {
    qnaId: number;
    username: string;
    profileImage: string;
    question: string;
    answered: boolean;
}

const Questions = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const playId = Number(params.playId) as PlayId;
    // 유저인데, 창작자가 아니거나, 창작자여도 이 작품을 담당하지 않았거나
    const isQuestionable =
        user &&
        (user.role === "ROLE_ADMIN" ||
            !user.playList ||
            !user.playList.includes(playId.toString()));

    useEffect(() => {
        if (Number.isNaN(playId) || !PLAYS_MAP.get(playId)) return;
        // 질문 불러오는 로직
        (async () => {
            try {
                const response = await baseAxios.get<Question[] & CustomError>(
                    `/qna/list/${playId}`
                );
                if (response.status !== 200) {
                    toast.error("질문 조회에 실패했습니다.");
                    throw Error("failed to get quetion about " + playId);
                }
                setQuestions(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
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
                        user && !isQuestionable ? styles.withoutButton : ""
                    } ${styles[`play${playId}`]}`}
                >
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <li key={question.qnaId}>
                                <Link
                                    to={`/qna/${playId}/questions/${question.qnaId}`}
                                >
                                    <p>
                                        <span
                                            className={
                                                question.answered
                                                    ? styles.answered
                                                    : styles.notAnswered
                                            }
                                        >
                                            {question.answered
                                                ? "답변완료"
                                                : "답변미완"}
                                        </span>
                                        {question.question}
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
                {!user ? (
                    <Button
                        onClick={() => {
                            localStorage.setItem(
                                "redirectUrl",
                                `/qna/${playId}/questions/new`
                            );
                            navigate("/mypage");
                        }}
                    >
                        질문하려면 로그인하세요
                    </Button>
                ) : (
                    isQuestionable && (
                        <Button
                            onClick={() =>
                                navigate(`/qna/${playId}/questions/new`)
                            }
                        >
                            질문하기
                        </Button>
                    )
                )}
            </div>
        </>
    );
};

export default Questions;
