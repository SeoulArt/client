import CreatorListUnit from "@/components/CreatorListUnit";
import TitleWithBackButton from "@/components/TitleWithBackButton";
import { DUMMY_CREATORS } from "@/data";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import styles from "./index.module.css";

const CreatorDetail = () => {
    const { id } = useParams();
    const creatorId = Number(id);
    const currentCreator = DUMMY_CREATORS[creatorId];

    useEffect(() => {
        // 유저 세부 정보 가져오기
    }, []);

    if (!currentCreator) return <Navigate to={"/"} replace />;

    return (
        <>
            <TitleWithBackButton title="창작자 소개" />
            <div className={styles.layout}>
                <CreatorListUnit
                    name={currentCreator.name}
                    department={"미정"}
                    profileImage={"/logo.svg"}
                />
                <p>
                    <img
                        src="/logo.svg"
                        alt={currentCreator.name + "님의 이미지"}
                    />
                    {currentCreator.name}님의 소개글입니다. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Vitae facilis, iusto,
                    quis provident cupiditate atque fuga excepturi repellat nisi
                    nemo ducimus eveniet consequatur totam. Libero quos
                    temporibus vero itaque hic!
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit officiis eius tempora autem temporibus dolorem eos
                    ratione magni nihil earum? Accusamus quas esse, quia
                    similique quam velit porro? Dolorem, cum.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ipsa cupiditate laboriosam aspernatur assumenda,
                    consequuntur dicta nesciunt eaque. Ducimus dicta nisi, odio
                    expedita dolorum amet, architecto vero obcaecati,
                    perspiciatis cumque consequatur?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit officiis eius tempora autem temporibus dolorem eos
                    ratione magni nihil earum? Accusamus quas esse, quia
                    similique quam velit porro? Dolorem, cum.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ipsa cupiditate laboriosam aspernatur assumenda,
                    consequuntur dicta nesciunt eaque. Ducimus dicta nisi, odio
                    expedita dolorum amet, architecto vero obcaecati,
                    perspiciatis cumque consequatur?
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit officiis eius tempora autem temporibus dolorem eos
                    ratione magni nihil earum? Accusamus quas esse, quia
                    similique quam velit porro? Dolorem, cum.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ipsa cupiditate laboriosam aspernatur assumenda,
                    consequuntur dicta nesciunt eaque. Ducimus dicta nisi, odio
                    expedita dolorum amet, architecto vero obcaecati,
                    perspiciatis cumque consequatur?
                </p>
            </div>
        </>
    );
};

export default CreatorDetail;
