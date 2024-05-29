import Full3UnitLinks from "@/UI/Full3UnitLinks";

const CONTENTS = [
    {
        key: 1,
        text: "공식 계정",
        img: import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/content1.svg",
        link: "https://www.instagram.com/sia_playground?igsh=Mjd5b3RtcW5oM2li",
    },
    {
        key: 2,
        text: "전시 프로그램",
        img: import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/content2.svg",
        link: "https://www.instagram.com/sia_playground?igsh=Mjd5b3RtcW5oM2li",
        disabled: true,
    },
    {
        key: 3,
        text: "홍보 영상",
        img: import.meta.env.VITE_STORAGE_HOSTNAME + "/menu/content3.svg",
        link: "https://www.instagram.com/sia_playground?igsh=Mjd5b3RtcW5oM2li",
        disabled: true,
    },
];

const Contents = () => {
    return <Full3UnitLinks list={CONTENTS} />;
};

export default Contents;
