import Textarea from "@/UI/Textarea";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import baseAxios from "@/queries/baseAxios";
import authStore from "@/store/authStore";
import { CustomError } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.css";
import CreatorListUnit from "@/components/CreatorListUnit";
import Button from "@/UI/Button";
import xIcon from "@/assets/x.svg";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

interface Creator {
    id: number;
    username: string;
    department: string;
    image: string;
    description: string | null;
    profileImage: string;
    playList: number[];
}

interface MutateResponse {
    image: string;
    description: string;
}

const CreatorDescription = () => {
    const { user, changeCreatorDescription } = authStore();
    const isEditing = Boolean(user?.description);
    const [isLoading, setIsLoading] = useState(true);
    const [isMutating, setIsMutating] = useState(!isEditing);
    const [previewSrc, setPreviewSrc] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [value, setValue] = useState(user?.description || "");
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageFile(file);
            setPreviewSrc(reader.result as string);
        };
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        try {
            setIsLoading(true);
            imageFile && formData.append("image", imageFile);
            formData.append("description", value);
            let newDescription = "";
            let newPreviewSrc = import.meta.env.VITE_STORAGE_HOSTNAME;
            if (isEditing) {
                console.log("수정");
                const response = await baseAxios.put<
                    MutateResponse & CustomError
                >("/user/introduce", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status !== 200) {
                    toast.error("창작자 소개 수정에 실패했습니다.");
                    throw Error("failed to mutate");
                }
                newDescription = response.data.description;
                newPreviewSrc += response.data.image;
            } else {
                const response = await baseAxios.post<
                    MutateResponse & CustomError
                >("/user/introduce", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (response.status !== 200) {
                    toast.error("창작자 소개 등록에 실패했습니다.");
                    throw Error("failed to mutate");
                }
                newDescription = response.data.description;
                newPreviewSrc += response.data.image;
            }
            changeCreatorDescription(newDescription);
            setPreviewSrc(newPreviewSrc);
            setIsMutating(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user?.userId) return navigate("/mypage");
        (async () => {
            try {
                const response = await baseAxios.get<Creator & CustomError>(
                    "/user/creator/" + user?.userId
                );
                if (response.status !== 200)
                    throw Error("창작자 세부 조회 실패");
                setValue(response.data.description || "");
                setDepartment(response.data.department);
                response.data.description &&
                    setPreviewSrc(
                        import.meta.env.VITE_STORAGE_HOSTNAME +
                            response.data.image
                    );
                setIsLoading(false);
            } catch {
                return navigate("/mypage");
            }
        })();
    }, []);

    if (isLoading) return <Loading isPageLoading={false} />;

    return (
        <>
            <div className={styles.headerRelative}>
                <TitleWithBackButton title="창작자 소개" />
                {isMutating || (
                    <button onClick={() => setIsMutating(true)}>
                        수정하기
                    </button>
                )}
            </div>
            <div className={styles.layout}>
                <CreatorListUnit
                    name={user!.username}
                    profileImage={user!.profileImage}
                    department={department}
                />
                {previewSrc && (
                    <div
                        className={`${styles.imgWrapper} ${
                            isMutating ? styles.withButton : ""
                        }`}
                    >
                        <img
                            src={previewSrc}
                            alt={user?.username + "의 소개 이미지"}
                            height={150}
                        />
                        {isMutating && (
                            <button
                                onClick={() => {
                                    setPreviewSrc("");
                                    setImageFile(null);
                                }}
                            >
                                <img src={xIcon} />
                            </button>
                        )}
                    </div>
                )}
                {isMutating ? (
                    <>
                        <Textarea
                            placeholder={`기억나는 순간을 글로 담아주세요.(최대 500자)`}
                            onChange={(event) =>
                                setValue((prev) =>
                                    event.target.value.length <= 500
                                        ? event.target.value
                                        : prev
                                )
                            }
                            value={value}
                            maxLength={500}
                        />
                        {!previewSrc && !imageFile && (
                            <>
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
                            </>
                        )}
                    </>
                ) : (
                    <Textarea
                        className={styles.forView}
                        defaultValue={value}
                        readOnly
                    />
                )}
                {isMutating && (
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            value.trim().length === 0 ||
                            value.trim().length > 500 ||
                            isLoading
                        }
                    >
                        {user?.description ? "수정완료" : "등록하기"}
                    </Button>
                )}
            </div>
        </>
    );
};

export default CreatorDescription;
