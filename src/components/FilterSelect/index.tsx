import { FILTER_TEXT_MAP, FilterKeys } from "@/constants";
import selectDownArrow from "@/assets/selectDownArrow.svg";
import styles from "./index.module.css";
import { useState } from "react";

interface Props {
    value: FilterKeys;
    onChange: (value: FilterKeys) => void;
}

const FilterSelect = ({ value, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.selectWrapper}>
            <button onClick={() => setIsOpen((prev) => !prev)}>
                {FILTER_TEXT_MAP.get(value)}
                <img
                    src={selectDownArrow}
                    className={isOpen ? styles.active : ""}
                />
            </button>
            {isOpen && (
                <div className={styles.selectOptions}>
                    {[
                        "all",
                        ...Array.from(FILTER_TEXT_MAP.keys()).filter(
                            (key) => key !== "staff" && key !== "all"
                        ),
                        "staff",
                    ].map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                onChange(key as FilterKeys);
                                setIsOpen(false);
                            }}
                        >
                            {FILTER_TEXT_MAP.get(key as FilterKeys)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterSelect;
