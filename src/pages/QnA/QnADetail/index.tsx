import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import { PLAYS_MAP } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { DUMMY_QUESTIONS } from "@/data";
import { useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

const QnADetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentQnAId = Number(searchParams.get("id"));
    const isEdit = searchParams.get("edit");

    const playId = Number(id) as 0 | 1 | 2;

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            {currentQnAId ? (
                <div>
                    여기에 {currentQnAId}에 대한 인풋과 수정 가능 내용이 들어갈
                    곳
                </div>
            ) : (
                <ul className={styles.list}>
                    {DUMMY_QUESTIONS(playId).map((question) => (
                        <li key={question.id}>
                            <button
                                onClick={() => {
                                    navigate({
                                        pathname,
                                        search: `?${createSearchParams({
                                            id: question.id.toString(),
                                        })}`,
                                    });
                                }}
                            >
                                <span>
                                    {question.isAnswered
                                        ? "답변완료"
                                        : "답변 미완"}
                                </span>
                                <p>{question.text}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default QnADetail;
