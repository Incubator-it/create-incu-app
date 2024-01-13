import {StateCreator} from "zustand";
import {BearSlice, FishSlice} from "./index.types";

export const createFishSlice: StateCreator<BearSlice & FishSlice, [], [], FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({fishes: state.fishes + 1})),
});
