import axios from "axios";

const API = axios.create({
  baseURL: "http://ec2-18-207-96-209.compute-1.amazonaws.com:8081/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
