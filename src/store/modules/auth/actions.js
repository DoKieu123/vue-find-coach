import { generateId } from "@/utilities";
import useCoachesStore from "../coaches";
import authApi from "@/apis/models/authApi";
import { STATUS_CODE } from "@/constants";

export default {
  autoLogin() {
    const coaches = useCoachesStore().coaches;
    const newUserId = generateId(coaches);

    this.userId = newUserId;

    localStorage.setItem("userId", this.userId);

    return this.userId;
  },

  login() {},
  async signUp(payload) {
    const response = await authApi.signUp({
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    });
    console.log(`🚀 | signUp | response:`, response)
    
    const responseData = await response.data;
    console.log(`🚀 | signUp | responseData:`, responseData)
    if (response.status !== STATUS_CODE.SUCCESS) {
      const error = new Error(responseData.message || "Fail to Authenticated!");
      throw error;
    }

    this.userId = responseData.localId;
    this.token = responseData.token;
    this.tokenExpiration = responseData.tokenExpiration;
  },
};
