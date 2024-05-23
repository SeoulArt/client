import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Button from "@/UI/Button";
import authStore from "@/store/authStore";
import { CustomError } from "@/types";
import { PLAYS_MAP, PLAY_AND_DATE_TIME_MAP, PlayId } from "@/constants";
import ImgSlider from "@/components/ImgSlider";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";
import UIStore from "@/store/UIStore";

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
    const {
        user,
        logout,
        addTicket,
        isTypingPhoneNumber,
        cancelTicket,
        addPhoneNumber,
        startTypingPhoneNumber,
        endTypingPhoneNumber,
    } = authStore();
    const { open, close } = UIStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState<null | 0 | 1>(
        null
    );
    const [posterIdx, setPosterIdx] = useState(0);
    const [step, setStep] = useState<"noti" | "ticketing">(
        user?.ticketPlayList && user.ticketPlayList.length > 0
            ? "ticketing"
            : "noti"
    );
    const [availableTickets, setAvailableTickets] = useState<number[]>([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const specificPlayId = posterIdx * 2 + 1 + Number(selectedTimeIndex);

    const ticketAlreadyUserHave = user?.ticketPlayList.find(
        (obj) =>
            obj.playId === posterIdx * 2 + 1 || obj.playId === posterIdx * 2 + 2
    );

    const handleTicketing = async () => {
        try {
            setIsLoading(true);
            const { data } = await baseAxios.post<PostResponse & CustomError>(
                "/ticket",
                {
                    playId: specificPlayId,
                }
            );

            if (data.message === "빈 자리가 없습니다.") {
                open(["남아있는 좌석이 없습니다.", "다시 시도해주세요."]);
                throw Error(data.message);
            }
            addTicket(data);
            // 번호가 없다면 번호 입력 칸으로
            if (!user?.phoneNumber) startTypingPhoneNumber();
            setSelectedTimeIndex(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmTicketingWithPhoneNumber = async () => {
        try {
            setIsLoading(true);
            await baseAxios.post("/user/mobile", { mobile: phoneNumber });
            addPhoneNumber(phoneNumber);
            toast.success("전화번호가 등록되었습니다.");
            // 예매 확정
            endTypingPhoneNumber();
            setSelectedTimeIndex(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleCancelTicket = async () => {
        try {
            if (!ticketAlreadyUserHave) return;
            setIsLoading(true);
            await baseAxios.delete<DeleteResponse & CustomError>("/ticket", {
                data: {
                    ticketId: ticketAlreadyUserHave?.ticketId,
                },
            });
            cancelTicket(ticketAlreadyUserHave?.ticketId);
            setSelectedTimeIndex(null);
            toast.success("예매가 취소되었습니다.");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            toast("예매하기 전 먼저 로그인하세요");
            localStorage.setItem("redirectUrl", "/ticketing");
            navigate("/mypage");
            close();
        }

        return () => {
            endTypingPhoneNumber();
        };
    }, []);

    useEffect(() => {
        const getAvailablePlays = async () => {
            try {
                const response = await baseAxios.get<number[]>(
                    "/ticket/available"
                );
                if (response.status !== 200) {
                    throw Error("에러 발생");
                }
                setAvailableTickets(response.data);
            } catch (error) {
                toast.error("예매 가능한 티켓 조회에 실패했습니다.");
                navigate("/");
                logout();
            } finally {
                setIsLoading(false);
            }
        };
        user && getAvailablePlays();
    }, [user?.ticketPlayList]);

    if (isLoading) return <Loading isPageLoading={false} />;

    if (step === "noti")
        return (
            <div className={styles.layout}>
                <img
                    src={
                        import.meta.env.VITE_STORAGE_HOSTNAME +
                        "/esset/%ED%8B%B0%EC%BC%93+%EC%88%98%EB%A0%B9+%EB%B0%8F+%EC%9C%A0%EC%9D%98%EC%82%AC%ED%95%AD.png"
                    }
                    className={styles.poster}
                />
                <Button onClick={() => setStep("ticketing")}>
                    확인했습니다.
                </Button>
            </div>
        );

    if (isTypingPhoneNumber)
        return (
            <div className={`${styles.layout} ${styles.withPhone}`}>
                <div>
                    <h2>전화번호를 입력해주세요</h2>
                    <span>예매 완료를 위해 전화번호 입력이 필요합니다.</span>
                    <span>
                        (입력하신 전화번호는 예매 확인 및 관련 안내를 위해
                        사용됩니다.)
                    </span>
                    <input
                        type="tel"
                        placeholder="(-) 없이 숫자만 입력(11자)"
                        maxLength={13}
                        value={phoneNumber}
                        onChange={(event) =>
                            setPhoneNumber(
                                event.target.value
                                    .replace(/[^0-9]/g, "")
                                    .replace(
                                        /^(\d{2,3})(\d{3,4})(\d{4})$/,
                                        `$1-$2-$3`
                                    )
                            )
                        }
                    />
                </div>
                <Button
                    onClick={handleConfirmTicketingWithPhoneNumber}
                    disabled={phoneNumber.trim().length !== 13 || isLoading}
                >
                    예매 확정
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
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/esset/num1.png",
                        description: `${PLAYS_MAP.get(1)} 포스터`,
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/esset/num2.png",
                        description: `${PLAYS_MAP.get(3)} 포스터`,
                    },
                    {
                        src:
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/esset/num3.png",
                        description: `${PLAYS_MAP.get(5)} 포스터`,
                    },
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
                        <button
                            onClick={() =>
                                open(
                                    ["정말 취소하시겠습니까?"],
                                    handleCancelTicket
                                )
                            }
                        >
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
                                disabled={
                                    availableTickets.indexOf(
                                        posterIdx * 2 + 1 + index
                                    ) === -1
                                }
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
                                {availableTickets.indexOf(
                                    posterIdx * 2 + 1 + index
                                ) === -1
                                    ? "좌석 매진"
                                    : `${index + 1}회 ${timeStr}`}
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
