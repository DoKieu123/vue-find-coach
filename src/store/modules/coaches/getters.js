import useAuthStore from "../auth";

export default {
    // doubleCount: (state) => state.count * 2,
    allCoaches: (state) => state.coaches,
    hasCoaches: (state) => state.coaches && state.coaches.length > 0,
    isCoach: (state) => {
        const authStore = useAuthStore();
        const coaches = state.coaches;
        const userId = authStore.userId;

        return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate: (state) => {
        const lastFetch = state.lastFetch;
        if (!lastFetch) return true;
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};