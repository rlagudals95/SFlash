const config = {
  // api: "https://janghyeonjun.shop",
  api: process.env.REACT_APP_API_URL,
  jwt: localStorage.getItem("jwt"),
};

export { config };

// 현준님: https://janghyeonjun.shop
// 세정님: http://13.125.97.117
// 승욱님: http://seungwook.shop
  