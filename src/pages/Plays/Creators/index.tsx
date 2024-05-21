import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import FilterSelect from "@/components/FilterSelect";
import { FilterKeys } from "@/constants";
import { Link } from "react-router-dom";
import CreatorListUnit from "@/components/CreatorListUnit";
import Loading from "@/components/Loading";

const Creators = () => {
    const [filter, setFilter] = useState<FilterKeys>("all");
    const [creators, setCreators] = useState<
        { id: number; role: FilterKeys; name: string }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            setCreators([]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        // 창작자 불러오기
    }, []);

    const filteredCreators = creators.filter(
        (obj) => filter === "all" || obj.role === filter
    );

    if (isLoading) return <Loading />;

    return (
        <>
            <div className={styles.headerWithSelect}>
                <TitleWithBackButton title="창작자 소개" />
                <div className={styles.absolute}>
                    <FilterSelect value={filter} onChange={setFilter} />
                </div>
            </div>
            {filteredCreators.length > 0 ? (
                <ul className={styles.list}>
                    {filteredCreators.map((creator) => (
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
            ) : (
                <div className={styles.empty}>
                    <img
                        src={
                            import.meta.env.VITE_STORAGE_HOSTNAME +
                            "/menu/Vector.png"
                        }
                        alt="창작자가 없습니다."
                    />
                    <span>등록된 창작자가 없습니다.</span>
                </div>
            )}
        </>
    );
};

export default Creators;
