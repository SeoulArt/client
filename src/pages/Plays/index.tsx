import { PLAYS_MAP } from "@/constants";
import play1Icon from "@/assets/play1Icon.png";
import play2Icon from "@/assets/play2Icon.png";
import play3Icon from "@/assets/play3Icon.png";
import Full3UnitLinks from "@/UI/Full3UnitLinks";

const PLAYS_WITH_ICONS = Array.from(PLAYS_MAP.entries()).map(([key, name]) => ({
    key,
    text: name,
    img: key === 1 ? play1Icon : key === 3 ? play2Icon : play3Icon,
    link: `/plays/${key}`,
}));

const Plays = () => {
    return <Full3UnitLinks list={PLAYS_WITH_ICONS} />;
};

export default Plays;
