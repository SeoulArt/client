import TitleWithBackButton from "@/components/TitleWithBackButton";
import { PLAYS_MAP, PlayId } from "@/constants";
import leftArrow from "@/assets/leftArrow.svg";
import { useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";
import styles from "./index.module.css";

const PlayDetail = () => {
    const { id } = useParams();
    const articleRef = useRef<HTMLElement>(null);
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
                        <img src={leftArrow} />
                    </button>
                </div>
                <article ref={articleRef}>
                    <h3>{PLAYS_MAP.get(playId)}</h3>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        At harum tempora vitae dolor, ea vero. Accusantium ipsum
                        dicta quasi officiis odio magni atque fuga animi optio
                        quod earum, aliquid perferendis!
                        <br /> Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Hic, in atque deleniti sed vero culpa
                        natus necessitatibus adipisci placeat ipsa dolore
                        quaerat ab veniam amet? Sequi laborum reiciendis a
                        voluptatum!
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur labore fugit sit saepe quam ea corporis
                        perspiciatis, aspernatur cupiditate repellendus iusto
                        consequuntur suscipit a, dolor architecto ex totam
                        deserunt pariatur!
                        <br />
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dicta sequi aspernatur temporibus consectetur odio
                        dolor, a iure totam magnam placeat consequuntur ullam
                        nobis quisquam porro expedita accusamus necessitatibus,
                        quaerat numquam.
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur eaque distinctio dolores minus quisquam
                        dolore incidunt vitae veritatis culpa, neque, cumque et
                        reiciendis deleniti atque laborum perferendis at fuga
                        aperiam?
                    </p>
                </article>
            </div>
        </>
    );
};

export default PlayDetail;
