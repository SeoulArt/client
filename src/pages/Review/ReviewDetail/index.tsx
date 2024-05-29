import imageCompression from "browser-image-compression";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import baseAxios from "@/queries/baseAxios";
import UIStore from "@/store/UIStore";
import { CustomError } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import Loading from "@/components/Loading";
import Textarea from "@/UI/Textarea";
import Button from "@/UI/Button";
import xIcon from "@/assets/x.svg";
import convertUrlToFile from "@/utils/convertUrlToFile";
import getValidProfileUrl from "@/utils/getValidProfileUrl";
import CreatorListUnit from "@/components/CreatorListUnit";

interface ReviewObj {
    author: boolean;
    title: string;
    content: string;
    user: {
        username: string;
        profileImage: string;
    };
    prevSrc: string | null;
}

interface ReviewResponse {
    author: boolean;
    title: string;
    content: string;
    user: {
        username: string;
        profileImage: string;
    };
    image: string | null;
}

const ReviewDetail = () => {
    const { open } = UIStore();
    const params = useParams();
    const navigate = useNavigate();
    const playId = Number(params.playId) as PlayId;
    const reviewId = Number(params.reviewId);
    const [reviewObj, setReviewObj] = useState<
        ReviewObj & { imageFile: File | null }
    >({
        author: false,
        title: "",
        content: "",
        user: {
            username: "",
            profileImage: "",
        },
        prevSrc: null,
        imageFile: null,
    });
    const [mode, setMode] = useState<"view" | "edit">("view");
    const [isLoading, setIsLoading] = useState(true);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setReviewObj((prev) => ({
                ...prev,
                prevSrc: reader.result as string,
                imageFile: file,
            }));
        };
    };

    const getReviewDetail = async () => {
        try {
            const response = await baseAxios.get<ReviewResponse & CustomError>(
                `/review/${reviewId}`
            );
            if (response.status !== 200) {
                toast.error("후기 조회에 실패했습니다.");
                throw Error("failed to get review detail");
            }
            let file: File | null = null;
            if (response.data.image) {
                file = await convertUrlToFile(
                    import.meta.env.VITE_STORAGE_HOSTNAME + response.data.image
                );
            }
            setReviewObj({
                ...response.data,
                prevSrc: response.data.image
                    ? getValidProfileUrl(response.data.image)
                    : null,
                imageFile: file,
            });
        } catch (error) {
            console.log(error);
            navigate(`/review/${playId}/reviews`, { replace: true });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getReviewDetail();
    }, []);

    const handleDeleteReview = async () => {
        // 삭제 로직
        try {
            setIsLoading(true);
            const response = await baseAxios.delete(`/review/${reviewId}`);
            if (response.status !== 200) {
                throw new Error("failed to DELETE quetion");
            }
            navigate(`/review/${playId}/reviews`, { replace: true });
            toast.success("후기 삭제 완료!");
        } catch (error) {
            toast.error("후기 삭제에 실패했습니다.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitReview = async () => {
        if (
            !reviewObj.author ||
            reviewObj.title.trim().length === 0 ||
            reviewObj.content.trim().length === 0
        )
            return;
        try {
            // 후기 수정하는 로직
            setIsLoading(true);
            const formData = new FormData();
            formData.append("title", reviewObj.title);
            formData.append("content", reviewObj.content);
            if (reviewObj.imageFile) {
                const compressedFile = await imageCompression(
                    reviewObj.imageFile,
                    {
                        maxSizeMB: 5,
                    }
                );
                formData.append("image", compressedFile);
            }
            const response = await baseAxios.put(
                `/review/${reviewId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status !== 200) {
                throw Error("failed to PUT QnA");
            }
            await getReviewDetail();
            toast.success("질문 수정 완료!");
            setMode("view");
        } catch (error) {
            toast.error("QnA 작성에 실패했습니다.");
        }
    };

    if (
        Number.isNaN(playId) ||
        !PLAYS_MAP.get(playId) ||
        Number.isNaN(reviewId)
    )
        return <Navigate to="/" replace />;

    return (
        <>
            <div className={styles.relative}>
                <TitleWithBackButton
                    title={
                        mode === "edit"
                            ? "후기 수정하기"
                            : (PLAYS_MAP.get(playId) as string)
                    }
                />
                {/* 조건 실제 유저 받아와서 수정해야 */}
                {reviewObj.author && mode !== "edit" && (
                    <div className={styles.menu}>
                        <button onClick={() => setMode("edit")}>수정</button>|
                        <button
                            onClick={() => {
                                open(
                                    ["정말로 이 후기를 삭제하시겠습니까?"],
                                    handleDeleteReview
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
                        <CreatorListUnit
                            name={reviewObj.user.username}
                            profileImage={reviewObj.user.profileImage}
                        />
                        <Textarea
                            disabled={!(mode === "edit" && reviewObj.author)}
                            value={reviewObj.title}
                            onChange={(event) =>
                                reviewObj.author &&
                                mode === "edit" &&
                                setReviewObj((prev) => ({
                                    ...prev,
                                    title: event.target.value.slice(0, 50),
                                }))
                            }
                            readOnly={!reviewObj.author}
                            maxLength={50}
                        />
                        {reviewObj.prevSrc && (
                            <div
                                className={`${styles.imgWrapper} ${
                                    mode === "edit" ? styles.withButton : ""
                                }`}
                            >
                                <img
                                    src={reviewObj.prevSrc}
                                    alt={"gnrl"}
                                    height={150}
                                />
                                {mode === "edit" && (
                                    <button
                                        onClick={() => {
                                            setReviewObj((prev) => ({
                                                ...prev,
                                                prevSrc: null,
                                                imageFile: null,
                                            }));
                                        }}
                                    >
                                        <img src={xIcon} />
                                    </button>
                                )}
                            </div>
                        )}
                        <Textarea
                            disabled={!(mode === "edit" && reviewObj.author)}
                            value={reviewObj.content}
                            onChange={(event) =>
                                reviewObj.author &&
                                mode === "edit" &&
                                setReviewObj((prev) => ({
                                    ...prev,
                                    content: event.target.value.slice(0, 300),
                                }))
                            }
                            readOnly={!reviewObj.author}
                            maxLength={300}
                        />
                        {!reviewObj.prevSrc &&
                            !reviewObj.imageFile &&
                            mode === "edit" && (
                                <div className={styles.imageLabel}>
                                    <label>
                                        이미지 첨부하기
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    <ul>
                                        <li>1장만 첨부 가능합니다.</li>
                                        <li>
                                            기록으로 남기고 싶은 사진 1장을
                                            첨부해주세요
                                        </li>
                                    </ul>
                                </div>
                            )}
                        {mode === "edit" && (
                            <Button
                                disabled={
                                    !(
                                        reviewObj.author &&
                                        reviewObj.title.trim().length > 0 &&
                                        reviewObj.content.trim().length > 0 &&
                                        !isLoading
                                    )
                                }
                                onClick={handleSubmitReview}
                            >
                                저장하기
                            </Button>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ReviewDetail;
