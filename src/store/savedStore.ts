import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";


interface SavedItem {
    id: number;
    name: string;
    poster_path: string;
    release_date: string;
    title: string;
}

interface SavedState {
    savedItems: SavedItem[];
    savedItemsCount: number;
    addSavedItem: (item: SavedItem) => void;
    removeSavedItem: (id: number) => void;
}



const useSavedItems = create<SavedState, any>(persist(
    (set: SetState<SavedState>) => ({
        savedItems: [],
        savedItemsCount: 0,
        addSavedItem: (item: SavedItem) =>
            set((state: SavedState) => ({
                savedItems: [...state.savedItems, item],
                savedItemsCount: state.savedItemsCount + 1,
            })),
        removeSavedItem: (id: number) =>
            set((state: SavedState) => ({
                savedItems: state.savedItems.filter((item) => item.id !== id),
                savedItemsCount: state.savedItemsCount - 1,
            }))
    }), {
        name: "saved-store",
    }
));

export default useSavedItems;
