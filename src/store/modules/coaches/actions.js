import { STATUS_CODE } from "@/constants";
import useAuthStore from "../auth";
import coachesApi from "@/apis/models/coachesApi";

export default {
    async registerCoach(payload) {
        const userId = useAuthStore().autoLogin();
        // lấy dữ liệu từ bên coachRegistration.vue 
        const coachData = {
            id: userId,
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas,
        };

        // call Api
        const response = await coachesApi.update(coachData);

        if (response.status !== STATUS_CODE.SUCCESS) {
            console.log("Error: ", response.error);
        }

        this.coaches.push(coachData);
    },

    async loadCoaches(payload) {
        if (!payload.forceRefresh && !this.shouldUpdate) {
            return
        }

        const response = await coachesApi.getAll();
        const responseData = await response.data;

        if (response.status !== STATUS_CODE.SUCCESS) {
            const error = new Error(responseData.message || "Fail to Fetch!");
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            };

            coaches.push(coach);
        }

        this.coaches = coaches;


    },
    setFetchTimestamp() {
        this.lastFetch = new Date().getTime();
    }

};