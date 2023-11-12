import axiosClient from "../axiosClient";

const SCHEMA = "coaches";

const coachesApi = {
  getAll() {
    const url = `/${SCHEMA}.json`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/${SCHEMA}/${data.id}.json`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/${SCHEMA}/${data.id}.json`;
    return axiosClient.patch(url, JSON.stringify(data));
  },
};

export default coachesApi;
