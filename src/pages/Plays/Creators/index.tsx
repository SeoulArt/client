import TitleWithBackButton from "@/components/TitleWithBackButton";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import FilterSelect from "@/components/FilterSelect";
import { FilterKeys, PlayId } from "@/constants";
import { Link } from "react-router-dom";
import CreatorListUnit from "@/components/CreatorListUnit";
import Loading from "@/components/Loading";
// import baseAxios from "@/queries/baseAxios";
// import { CustomError } from "@/types";
// import toast from "react-hot-toast";

const Creators = () => {
    const [filter, setFilter] = useState<FilterKeys>("all");
    const [creators, setCreators] = useState<
        {
            id: number;
            profileImage: string;
            playList: PlayId[];
            department: string;
            name: string;
        }[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // const response = await baseAxios.get<
                //     {
                //         id: number;
                //         username: string;
                //         department: string;
                //         profileImage: string;
                //         playList: string;
                //     }[] &
                //         CustomError
                // >("/user/creators");
                // if (response.status !== 200) {
                //     toast.error("창작자 조회에 실패했습니다.");
                // }
                // setCreators(
                //     response.data.map((stringArr) => ({
                //         ...stringArr,
                //         playList: stringArr.playList.split(","),
                //     }))
                // );
                setCreators([]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
        // 창작자 불러오기
    }, []);

    const filteredCreators = creators.filter(
        (obj) =>
            filter === "all" ||
            (filter === "staff" && obj.department.includes("스태프")) ||
            (filter !== "staff" && obj.playList.indexOf(filter) !== -1)
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
                                    profileImage={creator.profileImage}
                                    department={creator.department}
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
