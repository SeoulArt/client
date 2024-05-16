import { create } from "zustand";

interface UIStore {
    isOpened: boolean;
    texts: string[] | null;
    isMobile: boolean;
    onSubmit: (() => Promise<void> | void) | null;
}

interface UIAction {
    open: (
        texts: string[],
        isMobile?: boolean,
        onSubmit?: (() => Promise<void> | void) | null
    ) => void;
    close: () => void;
}

const UIStore = create<UIStore & UIAction>((set) => ({
    isOpened: false,
    texts: null,
    isMobile: false,
    onSubmit: null,
    open: (
        texts: string[],
        isMobile,
        onSubmit?: (() => Promise<void> | void) | null
    ) => {
        set(() => ({ isOpened: true, texts, isMobile, onSubmit }));
    },
    close: () => {
        set(() => ({
            isOpened: false,
            texts: null,
            onSubmit: null,
            isMobile: false,
        }));
    },
}));

export default UIStore;
