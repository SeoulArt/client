import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import FilterSelect from "@/components/FilterSelect";
import { FilterKeys } from "@/constants";
import { Link } from "react-router-dom";
import CreatorListUnit from "@/components/CreatorListUnit";
import { DUMMY_CREATORS } from "@/data";

const Creators = () => {
    const [filter, setFilter] = useState<FilterKeys>("all");

    useEffect(() => {
        // 창작자 불러오기
    }, []);

    return (
        <>
            <div className={styles.headerWithSelect}>
                <TitleWithBackButton title="창작자 소개" />
                <div className={styles.absolute}>
                    <FilterSelect value={filter} onChange={setFilter} />
                </div>
            </div>
            <ul className={styles.list}>
                {DUMMY_CREATORS.filter(
                    (obj) => filter === "all" || obj.role === filter
                ).map((creator) => (
                    <li key={creator.id}>
                        <Link to={`/creators/${creator.id}`}>
                            <CreatorListUnit
                                name={creator.name}
                                role={creator.role}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Creators;
