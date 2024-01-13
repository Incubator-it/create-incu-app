import {StateCreator} from "zustand";
import {BearSlice, FishSlice} from "./index.types";

export const createBearSlice: StateCreator<BearSlice & FishSlice, [], [], BearSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({bears: state.bears + 1})),
  eatFish: () => set((state) => ({fishes: state.fishes - 1})),
});
