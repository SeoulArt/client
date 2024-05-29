import { useEffect, useState } from "react";
import styles from "./index.module.css";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import getValidProfileUrl from "@/utils/getValidProfileUrl";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";
import toast from "react-hot-toast";
import authStore from "@/store/authStore";
import Loading from "@/components/Loading";
import FilterSelect from "@/components/FilterSelect";
import { FilterKeys } from "@/constants";

interface Review {
    playId: number;
    reviewId: number;
    content: string;
    image: string | null;
}

const MyReviews = () => {
    const { user } = authStore();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<FilterKeys>("all");
    const navigate = useNavigate();

    useEffect(() => {
        // 리뷰 불러오는 로직
        (async () => {
            try {
                const response = await baseAxios.get<Review[] & CustomError>(
                    `/user/review`
                );
                if (response.status !== 200) {
                    toast.error(`내가 쓴 후기 조회에 실패했습니다.`);
                    throw Error(`failed to get my reviews`);
                }
                setReviews(response.data);
            } catch (error) {
                console.log(error);
                navigate("/mypage");
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (!user) return <Navigate to="/" replace />;

    if (isLoading) return <Loading />;

    return (
        <>
            <div className={styles.headerRelative}>
                <TitleWithBackButton title={"내가 쓴 후기"} />
                <div className={styles.absolute}>
                    <FilterSelect
                        value={filter}
                        onlyPlay={true}
                        onChange={setFilter}
                    />
                </div>
            </div>
            <div className={styles.layout}>
                <ul className={styles.list}>
                    {reviews.length > 0 ? (
                        reviews
                            .filter(
                                (review) =>
                                    filter === "all" || filter === review.playId
                            )
                            .map((review) => (
                                <li key={review.reviewId}>
                                    <Link
                                        to={`/review/${review.playId}/reviews/${review.reviewId}`}
                                    >
                                        <p>{review.content}</p>
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
            </div>
        </>
    );
};

export default MyReviews;
