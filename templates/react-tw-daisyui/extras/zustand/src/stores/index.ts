import {create} from "zustand";
import {createBearSlice} from "./bearSlice";
import {createFishSlice} from "./fishSlice";
import {createBearFishSlice} from "./createBearFishSlice";
import {persist} from "zustand/middleware";
import {CoreSlices} from "./index.types";

export const useBoundStore = create<CoreSlices>()(
  persist(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createBearFishSlice(...a),
    }),
    {name: "bound-store"},
  ),
);
