const config = {
  api: process.env.REACT_APP_API_URL,
  jwt: localStorage.getItem("jwt"),
};

export { config };
