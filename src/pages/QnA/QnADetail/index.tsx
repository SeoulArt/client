import { PLAYS_MAP } from "@/constants";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

const QnADetail = () => {
    const params = useParams();
    const playId = Number(params.playId) as 0 | 1 | 2;
    const questionId = Number(params.questionId);
    console.log(playId, questionId);

    useEffect(() => {
        // QNA 글 조회, 해당 글 없으면 홈으로 REDIRECT
    }, []);

    if (
        Number.isNaN(playId) ||
        !PLAYS_MAP.get(playId) ||
        Number.isNaN(questionId)
    )
        return <Navigate to="/" replace />;

    return <div>QnADetail</div>;
};

export default QnADetail;
