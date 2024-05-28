import Textarea from "@/UI/Textarea";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";
import Loading from "@/components/Loading";
import { CustomError } from "@/types";
import UIStore from "@/store/UIStore";

interface QnAObj {
    authorId: number;
    question: string;
    answer: string;
    author: boolean;
}

const QnADetail = () => {
    const { user } = authStore();
    const { open } = UIStore();
    const params = useParams();
    const navigate = useNavigate();
    const playId = Number(params.playId) as PlayId;
    const questionId = Number(params.questionId);
    const [qnaObj, setQnaObj] = useState<QnAObj>({
        author: false,
        authorId: -1,
        question: "",
        answer: "",
    });
    const [mode, setMode] = useState<"view" | "edit">("view");
    const [isLoading, setIsLoading] = useState(true);
    const isInitialAnswerEmpty = useRef<boolean>(true);

    const isEditor =
        user &&
        (user.role === "ROLE_ADMIN" ||
            (!qnaObj.author &&
                user.isEditor &&
                user.playList &&
                user.playList.includes(playId.toString())));

    const getQnADetail = async () => {
        try {
            const response = await baseAxios.get<QnAObj & CustomError>(
                `/qna/${questionId}`
            );
            if (response.status !== 200) {
                toast.error("QnA 조회에 실패했습니다.");
                throw Error("failed to get qna detail");
            }
            setQnaObj({
                ...response.data,
                answer: response.data.answer || "",
            });
            if (response.data.answer) isInitialAnswerEmpty.current = false;
        } catch (error) {
            console.log(error);
            navigate(`/qna/${playId}/questions`, { replace: true });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // QNA 글 조회, 해당 글 없으면 홈으로 REDIRECT
        getQnADetail();
    }, []);

    const handleDeleteQuestion = async () => {
        // 삭제 로직
        try {
            setIsLoading(true);
            const response = await baseAxios.delete(`/qna/${questionId}`);
            if (response.status !== 200) {
                throw new Error("failed to DELETE quetion");
            }
            navigate(`/qna/${playId}/questions`, { replace: true });
            toast.success("질문 삭제 완료!");
        } catch (error) {
            toast.error("질문 삭제에 실패했습니다.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitQnA = async () => {
        try {
            if (qnaObj.author && qnaObj.question.trim().length > 0) {
                // 질문 수정하는 로직
                const response = await baseAxios.put(
                    `/qna/question/${questionId}`,
                    { question: qnaObj.question }
                );
                if (response.status !== 200) {
                    throw Error("failed to PUT QnA");
                }
                await getQnADetail();
                toast.success("질문 수정 완료!");
                setMode("view");
            } else if (
                isEditor &&
                qnaObj.answer &&
                qnaObj.answer.trim().length > 0
            ) {
                // 답변 달아주는 로직
                let response;
                if (isInitialAnswerEmpty) {
                    response = await baseAxios.post(
                        `/qna/answer/${questionId}`,
                        { answer: qnaObj.answer }
                    );
                } else {
                    response = await baseAxios.put(
                        `/qna/answer/${questionId}`,
                        { answer: qnaObj.answer }
                    );
                }
                if (response.status !== 200) {
                    throw Error("failed to PUT QnA");
                }
                await getQnADetail();
                toast.success(
                    isInitialAnswerEmpty ? "답변 작성 완료!" : "답변 수정 완료!"
                );
                setMode("view");
            } else {
                throw Error("wrong request to PUT QnA");
            }
        } catch (error) {
            toast.error("QnA 작성에 실패했습니다.");
        }
    };

    if (
        Number.isNaN(playId) ||
        !PLAYS_MAP.get(playId) ||
        Number.isNaN(questionId)
    )
        return <Navigate to="/" replace />;

    return (
        <>
            <div className={styles.relative}>
                <TitleWithBackButton title={PLAYS_MAP.get(playId) || ""} />
                {/* 조건 실제 유저 받아와서 수정해야 */}
                {qnaObj.author && mode !== "edit" && (
                    <div className={styles.menu}>
                        <button onClick={() => setMode("edit")}>수정</button>|
                        <button
                            onClick={() => {
                                open(
                                    ["정말로 이 질문을 삭제하시겠습니까?"],
                                    handleDeleteQuestion
                                );
                            }}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.layout}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Textarea
                            disabled={!(mode === "edit" && qnaObj.author)}
                            value={qnaObj.question}
                            onChange={(event) =>
                                qnaObj.author &&
                                mode === "edit" &&
                                setQnaObj((prev) => ({
                                    ...prev,
                                    question: event.target.value.slice(0, 300),
                                }))
                            }
                            readOnly={!qnaObj.author}
                            maxLength={300}
                        />
                        <Textarea
                            disabled={!(mode === "edit" && isEditor)}
                            value={qnaObj.answer || ""}
                            onChange={(event) =>
                                isEditor &&
                                mode === "edit" &&
                                setQnaObj((prev) => ({
                                    ...prev,
                                    answer: event.target.value.slice(0, 300),
                                }))
                            }
                            placeholder={
                                mode === "view"
                                    ? "아직 답변이 없습니다."
                                    : "답변할 내용을 작성해주세요.(최대 300자)"
                            }
                            maxLength={300}
                            readOnly={!isEditor}
                        />
                        {mode === "edit" ? (
                            <Button
                                disabled={
                                    !(
                                        qnaObj.author &&
                                        qnaObj.question.trim().length > 0 &&
                                        !isLoading
                                    )
                                }
                                onClick={handleSubmitQnA}
                            >
                                저장하기
                            </Button>
                        ) : (
                            isEditor && (
                                <Button onClick={() => setMode("edit")}>
                                    {qnaObj.answer
                                        ? "답변 수정하기"
                                        : "답변 등록하기"}
                                </Button>
                            )
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default QnADetail;
