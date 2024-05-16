import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import { PLAYS_MAP, PLAY_AND_DATE_TIME_MAP, PlayId } from "@/constants";
import ImgSlider from "@/components/ImgSlider";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";
import { CustomError } from "@/types";

interface PostResponse {
    playId: PlayId | 2 | 4 | 6;
    ticketId: number;
}
interface DeleteResponse {
    playId: PlayId | 2 | 4 | 6;
    ticketId: number;
}

const getDateTextFromPlayId = (playId: PlayId | 2 | 4 | 6) => {
    const date =
        playId === 1 || playId === 2 ? 7 : playId === 3 || playId === 4 ? 8 : 9;
    const dayNum = new Date(2024, 5, date).getDay();
    if (dayNum === 0) return `${date < 10 ? 0 : ""}${date}(일)`;
    if (dayNum === 1) return `${date < 10 ? 0 : ""}${date}(월)`;
    if (dayNum === 2) return `${date < 10 ? 0 : ""}${date}(화)`;
    if (dayNum === 3) return `${date < 10 ? 0 : ""}${date}(수)`;
    if (dayNum === 4) return `${date < 10 ? 0 : ""}${date}(목)`;
    if (dayNum === 5) return `${date < 10 ? 0 : ""}${date}(금)`;
    return `${date < 10 ? 0 : ""}${date}(토)`;
};

const Ticketing = () => {
    const { user, addTicket, cancelTicket } = authStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState<null | 0 | 1>(
        null
    );
    const [posterIdx, setPosterIdx] = useState(0);
    const [step, setStep] = useState<"noti" | "ticketing">(
        user?.ticketPlayPairs && user.ticketPlayPairs.length > 0
            ? "ticketing"
            : "noti"
    );
    const specificPlayId = posterIdx * 2 + 1 + Number(selectedTimeIndex);

    const ticketAlreadyUserHave = user?.ticketPlayPairs.find(
        (obj) =>
            obj.playId === posterIdx * 2 + 1 || obj.playId === posterIdx * 2 + 2
    );

    console.log(ticketAlreadyUserHave);
    const handleTicketing = async () => {
        try {
            setLoading(true);
            const { data } = await baseAxios.post<PostResponse & CustomError>(
                "/ticket",
                {
                    playId: specificPlayId,
                }
            );
            addTicket(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelTicket = async () => {
        try {
            setLoading(true);
            await baseAxios.delete<DeleteResponse & CustomError>("/ticket", {
                data: {
                    playId: specificPlayId,
                },
            });
            cancelTicket(specificPlayId);
            toast.success("예매가 취소되었습니다.");
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

    if (loading) return <Loading isPageLoading={false} />;

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
            <div className={styles.upperNoti}>
                {ticketAlreadyUserHave ? (
                    <span className={styles.done}>예매완료</span>
                ) : (
                    <span className={styles.date}>
                        {"6월 " + (7 + posterIdx) + "일"}
                    </span>
                )}
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

            {ticketAlreadyUserHave ? (
                <div className={styles.ticketLayout}>
                    <div className={styles.ticketTitle}>
                        <span>
                            2024.06.
                            {getDateTextFromPlayId(
                                ticketAlreadyUserHave.playId
                            )}{" "}
                            {
                                (
                                    (PLAY_AND_DATE_TIME_MAP.get(
                                        ticketAlreadyUserHave.playId as PlayId
                                    ) ||
                                        PLAY_AND_DATE_TIME_MAP.get(
                                            (ticketAlreadyUserHave.playId -
                                                1) as PlayId
                                        )) as string[]
                                )[
                                    PLAY_AND_DATE_TIME_MAP.get(
                                        ticketAlreadyUserHave.playId as PlayId
                                    )
                                        ? 0
                                        : 1
                                ]
                            }
                        </span>
                        <span>
                            {PLAYS_MAP.get(
                                ticketAlreadyUserHave.playId as PlayId
                            ) ||
                                PLAYS_MAP.get(
                                    (ticketAlreadyUserHave.playId - 1) as PlayId
                                )}
                        </span>
                    </div>
                    <div className={styles.ticketDescription}>
                        (예매 번호 {ticketAlreadyUserHave.ticketId}) |{" "}
                        <button onClick={handleCancelTicket}>
                            예매 취소하기
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.times}>
                        {PLAY_AND_DATE_TIME_MAP.get(
                            (posterIdx * 2 + 1) as PlayId
                        )?.map((timeStr, index) => (
                            <button
                                className={
                                    selectedTimeIndex === index
                                        ? styles[`selected${posterIdx + 1}`]
                                        : ""
                                }
                                key={timeStr}
                                onClick={() =>
                                    setSelectedTimeIndex(index as 0 | 1)
                                }
                            >
                                {index + 1}회 {timeStr}
                            </button>
                        ))}
                    </div>
                    <Button
                        onClick={handleTicketing}
                        disabled={selectedTimeIndex === null}
                    >
                        예매하기
                    </Button>
                </>
            )}
        </div>
    );
};

export default Ticketing;
