import ImgSlider from "components/ImgSlider";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const links = [
    { src: "logo.svg", text: "작품 소개" },
    { src: "logo.svg", text: "창작자 소개" },
    { src: "logo.svg", text: "작품 Q&A" },
];

const Home = () => {
    return (
        <div className={styles.layout}>
            <ImgSlider
                images={[
                    { src: "logo.svg", description: "로고 1" },
                    { src: "logo.svg", description: "로고 2" },
                ]}
            />
            <div className={styles.links}>
                {links.map((link) => (
                    <Link to={"/"} key={link.text}>
                        <img src={link.src} alt={link.text} width={"100%"} />
                        <span>{link.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
