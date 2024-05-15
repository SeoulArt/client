import Textarea from "@/UI/Textarea";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP } from "@/constants";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import toast from "react-hot-toast";

const QUESTION_TEXT = "이 질문엔 어떻게 답할건가요?";
const ANSWER_TEXT = "";
const DUMMY_AUTHOR_ID = 1;
const DUMMY_CREATOR_ID = 2;

const QnADetail = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const playId = Number(params.playId) as 0 | 1 | 2;
    const questionId = Number(params.questionId);
    const [questionValue, setQuestionValue] = useState(QUESTION_TEXT);
    const [answerValue, setAnswerValue] = useState(ANSWER_TEXT);
    const [mode, setMode] = useState<"view" | "edit">("view");

    const isAuthor = user?.userId === DUMMY_AUTHOR_ID;
    const isCreator = user?.userId === DUMMY_CREATOR_ID;

    useEffect(() => {
        // QNA 글 조회, 해당 글 없으면 홈으로 REDIRECT
    }, []);

    if (
        Number.isNaN(playId) ||
        !PLAYS_MAP.get(playId) ||
        Number.isNaN(questionId)
    )
        return <Navigate to="/" replace />;

    const handleDeleteQuestion = () => {
        const ok = confirm("정말로 이 질문을 삭제하시겠습니까?");
        if (ok) {
            // 삭제 로직
            navigate(-1);
        }
    };

    const handleSubmitQnA = () => {
        if (isAuthor && questionValue.trim().length > 0) {
            // 질문 수정하는 로직
            toast.success("질문 작성 완료!");
            setMode("view");
        } else if (isCreator && answerValue.trim().length > 0) {
            // 답변 달아주는 로직
            toast.success("답변 작성 완료!");
            setMode("view");
        }
    };

    return (
        <>
            <div className={styles.relative}>
                <TitleWithBackButton title={PLAYS_MAP.get(playId) || ""} />
                {/* 조건 실제 유저 받아와서 수정해야 */}
                {isAuthor && mode !== "edit" && (
                    <div className={styles.menu}>
                        <button onClick={() => setMode("edit")}>수정</button>|
                        <button onClick={handleDeleteQuestion}>삭제</button>
                    </div>
                )}
            </div>
            <div className={styles.layout}>
                <Textarea
                    disabled={
                        !(mode === "edit" && user?.userId === DUMMY_AUTHOR_ID)
                    }
                    value={QUESTION_TEXT}
                    onChange={(event) => setQuestionValue(event.target.value)}
                />
                <Textarea
                    disabled={
                        !(mode === "edit" && user?.userId === DUMMY_CREATOR_ID)
                    }
                    value={answerValue}
                    onChange={(event) => setAnswerValue(event.target.value)}
                    placeholder={
                        (mode === "view"
                            ? "아직 답변이 없습니다."
                            : "답변할 내용을 작성해주세요.") + "(최대 100자)"
                    }
                />
                {mode === "edit" ? (
                    <Button
                        disabled={
                            !(
                                (isAuthor && questionValue.trim().length > 0) ||
                                (isCreator && answerValue.trim().length > 0)
                            )
                        }
                        onClick={handleSubmitQnA}
                    >
                        저장하기
                    </Button>
                ) : (
                    isCreator && (
                        <Button onClick={() => setMode("edit")}>
                            답변 등록하기
                        </Button>
                    )
                )}
            </div>
        </>
    );
};

export default QnADetail;
