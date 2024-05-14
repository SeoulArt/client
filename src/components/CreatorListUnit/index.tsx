import { FILTER_TEXT_MAP, FilterKeys } from "@/constants";
import styles from "./index.module.css";

interface Props {
    name: string;
    role: FilterKeys;
}

const CreatorListUnit = ({ name, role }: Props) => {
    return (
        <div className={styles.layout}>
            <div>
                <div className={styles.profileWrapper}>
                    <img src="/logo.svg" alt={name + "님의 프로필 이미지"} />
                </div>
                <span>{name}</span>
            </div>
            <span>{FILTER_TEXT_MAP.get(role)}</span>
        </div>
    );
};

export default CreatorListUnit;
