import { atom } from "jotai";

export const userState = atom(
  JSON.parse(localStorage.getItem("user")) || null
);

export const userPersistenceState = atom(
  (get) => get(userState),
  (get, set, newUser) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
    set(userState, newUser);
  }
);
