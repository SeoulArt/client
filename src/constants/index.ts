export type FilterKeys = "all" | 0 | 1 | 2 | "staff";

export const NOT_PLAYS_MAP = new Map<"all" | "staff", string>([
    ["all", "전체"],
    ["staff", "기획팀"],
]);

export const PLAYS_MAP = new Map<0 | 1 | 2, string>([
    [0, "칼레이도스코프"],
    [1, "A.I?"],
    [2, "오브젝트!"],
]);

export const FILTER_TEXT_MAP = new Map<FilterKeys, string>([
    ...NOT_PLAYS_MAP,
    ...PLAYS_MAP,
]);
