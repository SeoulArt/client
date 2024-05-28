import Loading from "@/components/Loading";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import baseAxios from "@/queries/baseAxios";
import authStore from "@/store/authStore";
import { CustomError } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import getValidProfileUrl from "@/utils/getValidProfileUrl";
import Button from "@/UI/Button";
import styles from "./index.module.css";
import convertSecondsTostring from "@/utils/convertSecondsToString";

interface Review {
    reviewId: number;
    title: string;
    image: string | null;
}

const REVIEW_OPEN_DATE = new Date(2024, 4, 28, 16, 42);
// const REVIEW_OPEN_DATE = new Date();

const Reviews = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(
        Math.ceil((+REVIEW_OPEN_DATE - +new Date()) / 1000)
    );

    const playId = Number(params.playId) as PlayId;

    const isWritable =
        user &&
        (user.ticketPlayList.findIndex((pair) => pair.playId === playId) ||
            !user.playList ||
            user.playList.includes(playId.toString()));

    useEffect(() => {
        if (Number.isNaN(playId) || !PLAYS_MAP.get(playId)) return;
        // 질문 불러오는 로직
        (async () => {
            try {
                const response = await baseAxios.get<Review[] & CustomError>(
                    `/review/list/${playId}`
                );
                if (response.status !== 200) {
                    toast.error("후기 조회에 실패했습니다.");
                    throw Error("failed to get quetion about " + playId);
                }
                setReviews(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [playId]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        if (secondsLeft <= 0) {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [secondsLeft]);

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId))
        return <Navigate to="/" replace />;

    if (isLoading) return <Loading />;

    return (
        <>
            <TitleWithBackButton title={PLAYS_MAP.get(playId) as string} />
            <div className={styles.layout}>
                <ul
                    className={`${styles.list} ${
                        user && !isWritable ? styles.withoutButton : ""
                    } ${styles[`play${playId}`]}`}
                >
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <li key={review.reviewId}>
                                <Link
                                    to={`/review/${playId}/reviews/${review.reviewId}`}
                                >
                                    <p>{review.title}</p>
                                    {review.image && (
                                        <img
                                            src={getValidProfileUrl(
                                                review.image
                                            )}
                                            alt={"후기 이미지"}
                                        />
                                    )}
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
                            <span> 작성된 후기가 없습니다.</span>
                        </div>
                    )}
                </ul>
                {!user ? (
                    <Button
                        disabled={secondsLeft > 0}
                        onClick={() => {
                            localStorage.setItem(
                                "redirectUrl",
                                `/qna/${playId}/questions/new`
                            );
                            navigate("/mypage");
                        }}
                    >
                        {secondsLeft > 0
                            ? convertSecondsTostring(
                                  secondsLeft,
                                  REVIEW_OPEN_DATE
                              )
                            : "후기를 작성하려면 로그인하세요"}
                    </Button>
                ) : (
                    isWritable && (
                        <Button
                            disabled={secondsLeft > 0}
                            onClick={() =>
                                navigate(`/review/${playId}/reviews/new`)
                            }
                        >
                            {secondsLeft > 0
                                ? convertSecondsTostring(
                                      secondsLeft,
                                      REVIEW_OPEN_DATE
                                  )
                                : "후기 작성하기"}
                        </Button>
                    )
                )}
            </div>
        </>
    );
};

export default Reviews;
