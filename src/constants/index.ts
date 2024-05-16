export type PlayId = 1 | 3 | 5;

export type FilterKeys = "all" | PlayId | "staff";

export const NOT_PLAYS_MAP = new Map<"all" | "staff", string>([
    ["all", "전체"],
    ["staff", "기획팀"],
]);

export const PLAYS_MAP = new Map<PlayId, string>([
    [1, "칼레이도스코프"],
    [3, "A.I?"],
    [5, "오브젝트!"],
]);

export const PLAY_AND_DATE_TIME_MAP = new Map<
    PlayId,
    ("14:00" | "18:00" | "15:00" | "19:00")[]
>([
    [1, ["14:00", "18:00"]],
    [3, ["14:00", "18:00"]],
    [5, ["15:00", "19:00"]],
]);

export const FILTER_TEXT_MAP = new Map<FilterKeys, string>([
    ...NOT_PLAYS_MAP,
    ...PLAYS_MAP,
]);
