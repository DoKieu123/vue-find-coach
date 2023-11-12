import requestApi from "@/apis/models/requestsApi";
import useAuthStore from "../auth";
import { STATUS_CODE } from "@/constants";

export default {
  async contactCoach(payload) {
    const newRequest = {
      //   id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await requestApi.add(newRequest);

    const responseData = await response.data;
    if (response.status !== STATUS_CODE.SUCCESS) {
      const error = new Error(
        responseData.message || "Failed to send request!"
      );
      throw error;
    }

    // name: auto render id by firebase
    // Search doc: firebase realtime database
    newRequest.id = responseData.name;

    this.requests.push(newRequest);
  },

  async fetchRequests() {
    //User login is a coach
    const coachId = useAuthStore().userId;
    const response = await requestApi.get(coachId);
    const responseData = await response.data;

    if (response.status !== STATUS_CODE.SUCCESS) {
      const error = new Error(
        responseData?.message || "Failed to fetch request!"
      );
      throw error;
    } else if (!coachId) {
      const error = new Error(responseData?.message || "Unauthorized!");
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: responseData[key].coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    this.requests = requests;
  },
};
