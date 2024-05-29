import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useState } from "react";
import authStore from "@/store/authStore";
import { Navigate, useNavigate } from "react-router";
import Button from "@/UI/Button";
import toast from "react-hot-toast";
import baseAxios from "@/queries/baseAxios";
import styles from "./index.module.css";

const Phone = () => {
    const { user, changePhoneNumber } = authStore();
    const [value, setValue] = useState(user?.phoneNumber || "");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    if (!user?.phoneNumber) return <Navigate to="/mypage" replace />;

    const handlePutPhoneNumber = async () => {
        if (value.trim().length < 13) return;
        try {
            setIsLoading(true);
            const response = await baseAxios.put("/user/mobile", {
                mobile: value,
            });
            if (response.status !== 200) {
                throw Error("failed to PUT phone number");
            }
            changePhoneNumber(value);
            toast.success("번호 변경 완료!");
            navigate("/mypage");
        } catch (error) {
            console.log(error);
            toast.error("번호 변경에 실패하였습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TitleWithBackButton title="예매" />
            <div className={styles.layout}>
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
                        value={value}
                        onChange={(event) =>
                            setValue(
                                event.target.value
                                    .slice(0, 13)
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
                    onClick={handlePutPhoneNumber}
                    disabled={value.trim().length !== 13 || isLoading}
                >
                    변경하기
                </Button>
            </div>
        </>
    );
};

export default Phone;
