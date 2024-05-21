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
                    // { src: "logo.svg", description: "로고 2" },
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
