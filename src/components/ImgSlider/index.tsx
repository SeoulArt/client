import leftArrow from "@/assets/leftArrow.svg";
import rightArrow from "@/assets/rightArrow.svg";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import styles from "./index.module.css";

interface Props {
    images: { src: string; description: string }[];
    currentIndex: number;
    onChange: (idx: number) => void;
}

const ImgSlider = ({ images, currentIndex, onChange }: Props) => {
    const sliderRef = useRef<Slider>(null);
    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (_, next) => {
            onChange(next);
        },
        adaptiveHeight: false,
    };

    return (
        <div className={styles.layout}>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <img key={index} src={image.src} alt={image.description} />
                ))}
            </Slider>
            {currentIndex !== 0 && (
                <button
                    className={styles.leftArrow}
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <img
                        src={leftArrow}
                        alt="이전 슬라이드"
                        width={30}
                        height={30}
                    />
                </button>
            )}
            {currentIndex !== images.length - 1 && (
                <button
                    className={styles.rightArrow}
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <img
                        src={rightArrow}
                        alt="다음 슬라이드"
                        width={30}
                        height={30}
                    />
                </button>
            )}
        </div>
    );
};

export default ImgSlider;
