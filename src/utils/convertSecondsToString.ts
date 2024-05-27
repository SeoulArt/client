const ONE_DATE = 24 * 60 * 60;
const ONE_HOUR = 60 * 60;
const ONE_MINUTE = 60;

const convertSecondsTostring = (fullSeconds: number, openDate: Date) => {
    if (fullSeconds >= ONE_DATE)
        return `${openDate.getMonth() + 1}월 ${openDate.getDate()}일 ${openDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${openDate
            .getMinutes()
            .toString()
            .padStart(2, "0")} 오픈`;
    const hours = Math.floor(fullSeconds / ONE_HOUR);
    const minutes = Math.floor((fullSeconds - hours * ONE_HOUR) / ONE_MINUTE);
    const seconds = fullSeconds - hours * ONE_HOUR - minutes * ONE_MINUTE;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default convertSecondsTostring;
