const config = {
<<<<<<< HEAD
    api : 'http://13.125.130.32',
  }
  
  export { config }
=======
  api: "http://13.125.130.32",
  token: {
    headers: { authorization: `Bearer ${sessionStorage.getItem("JWT")}` },
  },
};

export { config };
>>>>>>> upstream/master
