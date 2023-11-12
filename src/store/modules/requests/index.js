import getters from "./getters";
import actions from "./actions";
import { defineStore } from 'pinia'

const useRequestsStore = defineStore("requests", {
    state: () => ({ requests: [] }),
    getters,
    actions,
});

export default useRequestsStore;