import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import { Navigate, useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Textarea from "@/UI/Textarea";
import authStore from "@/store/authStore";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";
import Loading from "@/components/Loading";

const CreateQuestion = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const playId = Number(params.playId) as PlayId;
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isQuestionable =
        user && (!user.playList || user.playList.includes(playId.toString()));

    if (!isQuestionable) {
        toast.error("해당 작품에 대한 질문 권한이 없습니다.");
        return <Navigate to={`/qna/${playId}/questions`} replace />;
    }

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId)) {
        return <Navigate to="/" replace />;
    }

    const submitHandler = async () => {
        if (value.trim().length === 0)
            return toast.error("질문 내용을 입력해주세요");

        // 질문 등록하는 로직
        try {
            setIsLoading(true);
            const response = await baseAxios.post<
                { questionId: number } & CustomError
            >(`/qna/question/${playId}`, { comment: value.trim() });
            if (response.status !== 200) {
                throw Error("failed to create question");
            }
            toast.success("질문 작성 완료!");
            navigate(`/qna/${playId}/questions/${response.data.questionId}`);
        } catch (error) {
            toast.error("질문 등록에 실패했습니다.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <div className={styles.layout}>
                {isLoading ? (
                    <Loading isPageLoading={false} />
                ) : (
                    <>
                        <Textarea
                            value={value}
                            onChange={(event) =>
                                setValue(event.target.value.slice(0, 300))
                            }
                            maxLength={300}
                            className={styles.qnaInput}
                            placeholder="질문할 내용을 작성해 주세요.(최대 300자)"
                        />
                        <Button
                            type="submit"
                            onClick={submitHandler}
                            disabled={value.trim().length === 0}
                        >
                            질문 등록하기
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default CreateQuestion;
