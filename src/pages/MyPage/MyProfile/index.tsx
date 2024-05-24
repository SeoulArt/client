import authStore from "@/store/authStore";
import styles from "./index.module.css";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import Button from "@/UI/Button";
import { ChangeEvent, useEffect, useState } from "react";
import convertUrlToFile from "@/utils/convertUrlToFile";
import baseAxios from "@/queries/baseAxios";
import toast from "react-hot-toast";
import { CustomError } from "@/types";
import getValidProfileUrl from "@/utils/getValidProfileUrl";
import imageCompression from "browser-image-compression";

interface PutResponse {
    image: string;
}

const MyProfile = () => {
    const { user, changeProfileImage } = authStore();
    const [imageObj, setImageObj] = useState<{
        previewSrc: string;
        file: File | null;
    }>({
        previewSrc: user?.profileImage || "",
        file: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (user) {
                const file = await convertUrlToFile(user.profileImage);
                setImageObj((prev) => ({ ...prev, file }));
                setIsLoading(false);
            }
        })();
    }, []);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageObj({ previewSrc: reader.result as string, file });
        };
    };

    const handleSubmit = async () => {
        try {
            if (!imageObj.file) {
                return toast.error("프로필 이미지를 선택해주세요");
            }
            setIsLoading(true);
            const compressedFile = await imageCompression(imageObj.file, {
                maxSizeMB: 1,
            });

            const formData = new FormData();
            formData.append("image", compressedFile);
            const response = await baseAxios.put<PutResponse & CustomError>(
                "/user/profileImage",
                formData
            );
            if (response.status !== 200) {
                console.log(response);
                throw Error("failed to submit new profileImage");
            }
            setImageObj({
                file: compressedFile,
                previewSrc: getValidProfileUrl(response.data.image),
            });
            changeProfileImage(getValidProfileUrl(response.data.image));
        } catch (error) {
            toast.error("이미지 수정에 실패했습니다.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TitleWithBackButton title="프로필 이미지 수정" />
            <div className={styles.layout}>
                <div>
                    {user?.profileImage && <img src={imageObj.previewSrc} />}
                    <label>
                        이미지 선택하기
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !imageObj.file}
                >
                    수정 완료
                </Button>
            </div>
        </>
    );
};

export default MyProfile;
