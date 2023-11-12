import getters from "./getters";
import actions from "./actions";
import { defineStore } from "pinia";

const useCoachesStore = defineStore("coaches", {
    state: () => {
        return {
            lastFetch: null,
            userIsCoach: false,
            coaches: [],
        };
    },
    getters,
    actions,

});

export default useCoachesStore;