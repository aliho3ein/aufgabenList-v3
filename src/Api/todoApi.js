import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://react-course-a1940-default-rtdb.europe-west1.firebasedatabase.app",
});

export default instance;
