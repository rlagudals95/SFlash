const config = {
    api : 'http://',
    token : {
      headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
    }
  }
  
  export { config }