import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";

interface LikedItem {
    id: number;
    name: string;
    poster_path: string;
    release_date: string;
    title: string;}

interface LikedState {
    likedItems: LikedItem[];
    likedItemsCount: number;
    addLikedItem: (item: LikedItem) => void;
    removeLikedItem: (id: number) => void;
}

const useLikedItems = create<LikedState, any>(
    persist(
        (set: SetState<LikedState>) => ({
            likedItems: [],
            likedItemsCount: 0,
            addLikedItem: (item: LikedItem) =>
                set((state: LikedState) => {
                    const updatedLikedItems = [...state.likedItems, item];
                    return {
                        likedItems: updatedLikedItems,
                        likedItemsCount: updatedLikedItems.length,
                    };
                }),
            removeLikedItem: (id: number) =>
                set((state: LikedState) => {
                    const updatedLikedItems = state.likedItems.filter((item) => item.id !== id);
                    return {
                        likedItems: updatedLikedItems,
                        likedItemsCount: updatedLikedItems.length,
                    };
                }),
        }),
        { name: "liked-items" }
    )
);

export default useLikedItems;
