import { create } from "zustand";

interface UIStore {
    isOpened: boolean;
    texts: string[] | null;
    onSubmit: (() => Promise<void> | void) | null;
}

interface UIAction {
    open: (
        texts: string[],
        onSubmit?: (() => Promise<void> | void) | null
    ) => void;
    close: () => void;
}

const UIStore = create<UIStore & UIAction>((set) => ({
    isOpened: false,
    texts: null,
    onSubmit: null,
    open: (texts: string[], onSubmit?: (() => Promise<void> | void) | null) => {
        set(() => ({ isOpened: true, texts, onSubmit }));
    },
    close: () => {
        set(() => ({
            isOpened: false,
            texts: null,
            onSubmit: null,
        }));
    },
}));

export default UIStore;
