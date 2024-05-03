import ImgSlider from "components/ImgSlider";

const Home = () => {
    return (
        <div>
            <ImgSlider
                images={[
                    { src: "logo.svg", description: "로고 1" },
                    { src: "logo.svg", description: "로고 2" },
                ]}
            />
        </div>
    );
};

export default Home;
