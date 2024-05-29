import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import downArrow from "@/assets/downArrow.svg";
import { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";
import styles from "./index.module.css";

const PlayDetail = () => {
    const { id } = useParams();
    const articleRef = useRef<HTMLImageElement>(null);
    const playId = Number(id) as PlayId;

    useEffect(() => {
        // 작품 소개 글 가져오기
    }, []);

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    return (
        <>
            <TitleWithBackButton title={"작품 소개"} />
            <div className={styles.layout}>
                <div className={styles.relative}>
                    <img
                        src={`${
                            import.meta.env.VITE_STORAGE_HOSTNAME
                        }/esset/num${Math.floor(playId / 2) + 1}.png`}
                        alt={`${PLAYS_MAP.get(playId)} 포스터`}
                    />
                    <button
                        onClick={() =>
                            articleRef.current?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        <img src={downArrow} />
                    </button>
                </div>
                <img
                    ref={articleRef}
                    src={`${
                        import.meta.env.VITE_STORAGE_HOSTNAME
                    }/esset/desc/num${Math.floor(playId / 2) + 1}.png
						`}
                    alt={`${PLAYS_MAP.get(playId)} 포스터`}
                />
            </div>
        </>
    );
};

export default PlayDetail;
