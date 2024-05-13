import Loading from "@/components/Loading";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS } from "@/constants";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

const PlayDetail = () => {
    const { id } = useParams();
    const playId = Number(id);

    useEffect(() => {
        // 작품 소개 글 가져오기
    }, []);

    if (Number.isNaN(playId)) return <Navigate to="/" replace />;

    if (playId < 0) return <Loading />;
    console.log(playId);
    return (
        <div>
            <TitleWithBackButton title={PLAYS[playId]} />
            <img src="" alt={""} />
        </div>
    );
};

export default PlayDetail;
