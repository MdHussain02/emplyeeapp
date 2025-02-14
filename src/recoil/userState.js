// src/recoil/userState.js
import { atom, selector } from "recoil";

export const userState = atom({
  key: "userState",
  default: JSON.parse(localStorage.getItem("user")) || null, 
});

export const userPersistenceState = selector({
  key: "userPersistenceState",
  get: ({ get }) => get(userState),
  set: ({ set }, newUser) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    set(userState, newUser);
  },
});
