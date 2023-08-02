import { atom } from "recoil";

export const bookState = atom({
  key: "bookState",
  default: [],
});

export const pageState = atom({
  key: "pageState",
  default: 1,
});

export const hasMoreState = atom({
  key: "hasMoreState",
  default: true,
});
