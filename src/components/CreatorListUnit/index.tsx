import styles from "./index.module.css";

interface Props {
    name: string;
    department: string;
    profileImage: string;
}

const CreatorListUnit = ({ name, profileImage, department }: Props) => {
    return (
        <div className={styles.layout}>
            <div>
                <div className={styles.profileWrapper}>
                    <img
                        onError={(event) =>
                            (event.currentTarget.src = "/logo.svg")
                        }
                        src={profileImage}
                        alt={name + "님의 프로필 이미지"}
                    />
                </div>
                <span>{name}</span>
            </div>
            <span>{department}</span>
        </div>
    );
};

export default CreatorListUnit;
