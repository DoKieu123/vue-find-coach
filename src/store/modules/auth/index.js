import getters from "./getters";
import actions from "./actions";
import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      userId: localStorage.getItem("userId") || null, // userId: "c1",
      token: localStorage.getItem("token") || null,
      tokenExpiration: localStorage.getItem("tokenExpiration") || null,
    };
  },
  getters,
  actions,
});

export default useAuthStore;
