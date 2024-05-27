import ImgSlider from "@/components/ImgSlider";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import { useState } from "react";

const links = [
    {
        src:
            import.meta.env.VITE_STORAGE_HOSTNAME +
            "/menu/toIntroducePlayIcon.svg",
        to: "/plays",
        text: "작품 소개",
    },
    {
        src: import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/toCreatorsIcon.svg",
        to: "/creators",
        text: "창작자 소개",
    },
    {
        src: import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/toQnAIcon.svg",
        to: "/qna",
        text: "작품 Q&A",
    },
];

const Home = () => {
    const [postIdx, setPostIdx] = useState(0);

    return (
        <div className={styles.layout}>
            <ImgSlider
                images={[
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/playground_main.png",
                        description: "로고 1",
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/spon/%EA%B5%BF%EB%A7%88%EB%8D%94%EC%8B%A0%EB%93%9C%EB%A1%AC.jpg",
                        description: "협찬사 1 굿마더신드롬",
                        externalLink: "https://goodmothersyndrome.com/",
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/spon/%EB%B9%84%ED%83%80%EC%B9%B4%ED%8E%98.jpg",
                        description: "협찬사 2 비타카페",
                        externalLink: "https://www.vitacafe.co.kr/",
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/spon/%EC%98%A4%EC%9D%B4%EB%AE%A4.jpg",
                        description: "협찬사 3 오이뮤",
                        externalLink: "https://oimu-seoul.com/",
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/spon/%EC%9C%A0%ED%94%BD.jpg",
                        description: "협찬사 4 유픽",
                        externalLink: "https://www.youpick.kr/",
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/spon/%EC%A1%B4%EC%8A%A4%EB%B8%94%EB%A0%8C%EB%93%9C.jpg",
                        description: "협찬사 5 존스블렌드",
                        externalLink: "https://johns-blend.kr/",
                    },
                ]}
                currentIndex={postIdx}
                onChange={(number) => setPostIdx(number)}
            />
            <div className={styles.links}>
                {links.map((link) => (
                    <Link to={link.to} key={link.text}>
                        <img src={link.src} alt={link.text} width={"100%"} />
                        <span>{link.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
