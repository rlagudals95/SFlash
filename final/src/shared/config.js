import { getCookie } from "./Cookie";

const config = {
  api: "http://13.125.130.32",
  token: getCookie("jwt"),
};

export { config };
