import { PLAYS_MAP, PlayId } from "@/constants";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import styles from "./index.module.css";
import authStore from "@/store/authStore";
import { Navigate, useNavigate, useParams } from "react-router";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";
import Loading from "@/components/Loading";
import Textarea from "@/UI/Textarea";
import Button from "@/UI/Button";
import xIcon from "@/assets/x.svg";

interface FormValues {
    title: string;
    content: string;
    imageFile: File | null;
    prevSrc: string;
}

const CreateReview = () => {
    const { user } = authStore();
    const params = useParams();
    const navigate = useNavigate();
    const playId = Number(params.playId) as PlayId;
    const [formValues, setFormValues] = useState<FormValues>({
        title: "",
        content: "",
        imageFile: null,
        prevSrc: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    if (Number.isNaN(playId) || !PLAYS_MAP.get(playId)) {
        return <Navigate to="/" replace />;
    }

    if (
        !user ||
        (user.role === "ROLE_USER" &&
            user.ticketPlayList.findIndex((pair) => pair.playId === playId) ===
                -1)
    ) {
        toast.error("해당 작품에 대한 후기 작성 권한이 없습니다.");
        return <Navigate to={`/review/${playId}/reviews`} replace />;
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormValues((prev) => ({
                ...prev,
                imageFile: file,
                prevSrc: reader.result as string,
            }));
        };
    };

    const submitHandler = async () => {
        if (
            formValues.title.trim().length === 0 ||
            formValues.content.trim().length === 0
        )
            return toast.error("후기 제목과 내용을 입력해주세요");

        // 질문 등록하는 로직
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("playId", playId.toString());
            formData.append("title", formValues.title);
            formData.append("content", formValues.content);
            formValues.imageFile &&
                formData.append("image", formValues.imageFile);
            const response = await baseAxios.post<
                { reviewId: number } & CustomError
            >(`/review`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status !== 200) {
                throw Error("failed to create question");
            }
            toast.success("질문 작성 완료!");
            navigate(`/review/${playId}/reviews/${response.data.reviewId}`, {
                replace: true,
            });
        } catch (error) {
            toast.error("질문 등록에 실패했습니다.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TitleWithBackButton title={"후기 작성하기"} />
            <div className={styles.layout}>
                {isLoading ? (
                    <Loading isPageLoading={false} />
                ) : (
                    <>
                        <Textarea
                            value={formValues.title}
                            onChange={(event) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    title: event.target.value.slice(0, 50),
                                }))
                            }
                            maxLength={50}
                            className={styles.qnaInput}
                            placeholder="제목을 작성해 주세요.(최대 50자)"
                        />
                        {formValues.prevSrc && formValues.imageFile && (
                            <div className={styles.imgWrapper}>
                                <img
                                    src={formValues.prevSrc}
                                    alt={user?.username + "의 소개 이미지"}
                                    height={150}
                                />
                                <button
                                    onClick={() => {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            prevSrc: "",
                                            imageFile: null,
                                        }));
                                    }}
                                >
                                    <img src={xIcon} />
                                </button>
                            </div>
                        )}
                        <Textarea
                            value={formValues.content}
                            onChange={(event) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    content: event.target.value.slice(0, 300),
                                }))
                            }
                            maxLength={300}
                            className={styles.qnaInput}
                            placeholder="후기 내용을 작성해 주세요.(최대 300자)"
                        />
                        {!formValues.prevSrc && !formValues.imageFile && (
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
                        <Button
                            type="submit"
                            onClick={submitHandler}
                            disabled={
                                formValues.title.trim().length === 0 ||
                                formValues.content.trim().length === 0
                            }
                        >
                            질문 등록하기
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default CreateReview;
