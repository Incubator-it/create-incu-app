import {StateCreator} from "zustand";
import {BearSlice, FishSlice, SharedSlice} from "./index.types";

export const createBearFishSlice: StateCreator<BearSlice & FishSlice, [], [], SharedSlice> = (
  set,
  get,
) => ({
  addBoth: () => {
    get().addBear();
    get().addFish();
  },
  getBoth: () => get().bears + get().fishes,
});
