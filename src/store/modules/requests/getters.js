import useAuthStore from "../auth";

export default {
  hasRequests(state) {
    return state.requests && state.requests.length > 0;
  },
  allRequests(state) {
    const authStore = useAuthStore();
    const userId = authStore.userId;

    return state.requests.filter((req) => req.coachId === userId);
  },
};
