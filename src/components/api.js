import axios from "axios";

const instance = axios.create({
  baseURL: "https://verifyr-sr16.onrender.com/",
});

export default instance;
