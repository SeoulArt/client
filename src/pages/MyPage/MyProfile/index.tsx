import authStore from "@/store/authStore";
import styles from "./index.module.css";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import Button from "@/UI/Button";
import { ChangeEvent, useEffect, useState } from "react";
import convertUrlToFile from "@/utils/convertUrlToFile";

const MyProfile = () => {
    const { user } = authStore();
    const [imageObj, setImageObj] = useState<{
        previewSrc: string;
        file: File | null;
    }>({
        previewSrc: user?.profileImage || "",
        file: null,
    });

    useEffect(() => {
        (async () => {
            if (user) {
                const file = await convertUrlToFile(user.profileImage);
                setImageObj((prev) => ({ ...prev, file }));
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
                <Button onClick={() => {}} disabled>
                    개발 중
                </Button>
            </div>
        </>
    );
};

export default MyProfile;
