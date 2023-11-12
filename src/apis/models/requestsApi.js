import axiosClient from "../axiosClient";

const SCHEMA = "requests";

const requestApi = {
  getAll() {},

  get(coachId) {
    const url = `/${SCHEMA}/${coachId}.json`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/${SCHEMA}/${data.coachId}.json`;
    return axiosClient.post(url, JSON.stringify(data));
  },
};

export default requestApi;
