import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP } from "@/constants";
import { Navigate, useParams } from "react-router";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Textarea from "@/UI/Textarea";

const CreateQuestion = () => {
    const params = useParams();
    const playId = Number(params.playId) as 0 | 1 | 2;
    const [value, setValue] = useState("");

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    const submitHandler = () => {
        if (value.trim().length === 0)
            return toast.error("질문 내용을 입력해주세요");

        // 질문 등록하는 로직
    };

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <div className={styles.layout}>
                <Textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className={styles.qnaInput}
                    placeholder="질문할 내용을 작성해 주세요."
                />
                <Button
                    type="submit"
                    onClick={submitHandler}
                    disabled={value.trim().length === 0}
                >
                    질문 등록하기
                </Button>
            </div>
        </>
    );
};

export default CreateQuestion;