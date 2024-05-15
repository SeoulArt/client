import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import { PLAY_AND_DATE_TIME_MAP, PlayId } from "@/constants";
import ImgSlider from "@/components/ImgSlider";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";

interface Response {
    playId: number;
    ticketId: number;
}

const Ticketing = () => {
    const { user, addPlayId } = authStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"noti" | "ticketing">("noti");
    const [posterIdx, setPosterIdx] = useState(0);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState<null | 0 | 1>(
        null
    );
    const specificPlayId = posterIdx * 2 + 1 + Number(selectedTimeIndex);

    const ticketAlreadyUserHave = user?.plays.find(
        (obj) =>
            obj.playId === posterIdx * 2 + 1 || obj.playId === posterIdx * 2 + 2
    );

    const handleTicketing = async () => {
        try {
            setLoading(true);
            const { data } = await baseAxios.post<Response>("/ticket", {
                playId: specificPlayId,
            });
            addPlayId(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            toast("예매하기 전 먼저 로그인하세요");
            localStorage.setItem("redirectUrl", "/ticketing");
            navigate("/mypage");
        }
    }, []);

    if (loading) return <Loading />;

    if (step === "noti")
        return (
            <div className={styles.layout}>
                {/* <img src={"logo.svg"} className={styles.poster} /> */}
                <div className={`${styles.poster} ${styles.noti}`}>
                    여기 안내사항
                </div>
                <Button onClick={() => setStep("ticketing")}>
                    확인했습니다.
                </Button>
            </div>
        );
    // 남아있는 좌석 없다 실패 메시지, 예매 성공 시 화면, 예매 취소, 핸드폰 번호
    return (
        <div className={`${styles.layout} ${styles.withDate}`}>
            <div className={styles.date}>
                <span>{"6월 " + (7 + posterIdx) + "일"}</span>
            </div>
            <ImgSlider
                images={[
                    { src: "logo.svg", description: "로고 1" },
                    { src: "logo.svg", description: "로고 2" },
                    { src: "logo.svg", description: "로고 3" },
                ]}
                currentIndex={posterIdx}
                onChange={(number) => {
                    setPosterIdx(number);
                    setSelectedTimeIndex(null);
                }}
            />

            <div className={styles.times}>
                {PLAY_AND_DATE_TIME_MAP.get((posterIdx * 2 + 1) as PlayId)?.map(
                    (timeStr, index) => (
                        <button
                            className={
                                selectedTimeIndex === index
                                    ? styles[`selected${posterIdx + 1}`]
                                    : ""
                            }
                            key={timeStr}
                            onClick={() => setSelectedTimeIndex(index as 0 | 1)}
                        >
                            {index + 1}회 {timeStr}
                        </button>
                    )
                )}
            </div>
            <Button
                onClick={handleTicketing}
                disabled={selectedTimeIndex === null}
            >
                예매하기
            </Button>
        </div>
    );
};

export default Ticketing;
