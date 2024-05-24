import CreatorListUnit from "@/components/CreatorListUnit";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./index.module.css";
import baseAxios from "@/queries/baseAxios";
import toast from "react-hot-toast";
import { CustomError } from "@/types";
import Loading from "@/components/Loading";
import Textarea from "@/UI/Textarea";

interface CreatorInfo {
    username: string;
    department: string | null;
    image: string | null;
    description: string | null;
    profileImage: string;
    playList: string | null;
}

const CreatorDetail = () => {
    const { id } = useParams();
    const creatorId = Number(id);
    const navigate = useNavigate();
    const [creatorObj, setCreatorObj] = useState<CreatorInfo | null>(null);

    useEffect(() => {
        // 유저 세부 정보 가져오기
        (async () => {
            try {
                const response = await baseAxios.get<CreatorInfo & CustomError>(
                    `/user/creator/${creatorId}`
                );
                if (response.status !== 200) {
                    throw Error("failed to get creator description");
                }
                setCreatorObj(response.data);
            } catch (error) {
                toast.error("창작자 소개 조회에 실패했습니다.");
                navigate("/creators");
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <TitleWithBackButton title="창작자 소개" />
            {!creatorObj ? (
                <Loading />
            ) : (
                <div className={styles.layout}>
                    <CreatorListUnit
                        name={creatorObj.username}
                        department={creatorObj.department || "미정"}
                        profileImage={creatorObj.profileImage}
                    />
                    <p>
                        {creatorObj.image && creatorObj.description && (
                            <div className={styles.imgWrapper}>
                                <img
                                    src={
                                        import.meta.env.VITE_STORAGE_HOSTNAME +
                                        creatorObj.image
                                    }
                                    alt={creatorObj.username + "님의 이미지"}
                                />
                            </div>
                        )}
                        {creatorObj.description ? (
                            <Textarea
                                defaultValue={creatorObj.description}
                                readOnly
                            />
                        ) : (
                            <div className={styles.emptyDescription}>
                                <img
                                    src={
                                        import.meta.env.VITE_STORAGE_HOSTNAME +
                                        "/menu/emptyDescription.svg"
                                    }
                                    alt="창작자 소개 없음"
                                />
                                <span>작성된 글이 없습니다.</span>
                            </div>
                        )}
                    </p>
                </div>
            )}
        </>
    );
};

export default CreatorDetail;
