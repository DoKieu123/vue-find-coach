import axios from "axios";

// const SCHEMA = "auth";
const API_KEY = process.env.VUE_APP_FIREBASE_API_KEY;

const authApi = {
  signUp(data) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    return axios.post(url, JSON.stringify(data));
  },
  login() {
    // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  },
};

export default authApi;
