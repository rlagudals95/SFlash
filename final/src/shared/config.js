const config = {
  api: "http://13.125.130.32",
  token: {
    headers: { authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
  },
};

export { config };
