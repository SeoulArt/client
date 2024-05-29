import TitleWithBackButton from "@/components/TitleWithBackButton";
import Loading from "@/components/Loading";

import authStore from "@/store/authStore";
import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

interface Question {
    qnaId: number;
    playId: number;
    question: string;
    isAnswered: boolean;
}

interface Props {
    type: "question" | "answer";
}

const MyQnA = ({ type }: Props) => {
    const { user } = authStore();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // 질문 불러오는 로직
        (async () => {
            try {
                const response = await baseAxios.get<Question[] & CustomError>(
                    `/user/${type}`
                );
                if (response.status !== 200) {
                    toast.error(
                        `내가 쓴 ${
                            type === "question" ? "질문" : "답변"
                        } 조회에 실패했습니다.`
                    );
                    throw Error(`failed to get my ${type}s`);
                }
                setQuestions(response.data);
            } catch (error) {
                navigate("/mypage");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (!user) return <Navigate to="/" replace />;

    if (isLoading) return <Loading />;

    return (
        <>
            <TitleWithBackButton
                title={`내가 쓴 ${type === "question" ? "질문" : "답변"}`}
            />
            <div className={styles.layout}>
                <ul className={`${styles.list}`}>
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <li key={question.qnaId}>
                                <Link
                                    to={`/qna/${question.playId}/questions/${question.qnaId}`}
                                >
                                    <p>
                                        {type === "question" && (
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
                                        )}
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
                            <span>
                                {" "}
                                작성된 {type === "question" ? "질문" : "답변"}이
                                없습니다.
                            </span>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default MyQnA;
