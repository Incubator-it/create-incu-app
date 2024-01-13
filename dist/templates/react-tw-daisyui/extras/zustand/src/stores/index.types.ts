export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export interface FishSlice {
  fishes: number;
  addFish: () => void;
}

export interface SharedSlice {
  addBoth: () => void;
  getBoth: () => void;
}

export type CoreSlices = BearSlice & FishSlice & SharedSlice;
