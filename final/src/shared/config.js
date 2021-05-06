import { setCookie, getCookie } from "./Cookie";

const config = {
  api: "http://13.125.130.32",
  jwt: getCookie("jwt"),
};

export { config };

// 승욱님: http://seungwook.shop
// 세정님: http://13.125.130.32
