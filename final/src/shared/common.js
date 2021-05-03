//아이디 체크 정규식
export const nicknameRegCheck = (nickname) => {
  const _reg =/^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/;
  return _reg.test(nickname);
}

//이메일 체크 정규식
export const emailRegCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);
}

//패스워드 체크 정규식
export const pwdRegCheck = (pwd) => {
  const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{10,}$/;
  return  _reg.test(pwd) && pwd.search(/\s/) === -1 ? true:false;
}

//패스워드 반복 체크 정규식
export const pwdRegContinuousCheck = (pwd) => {
  const _reg = /(\w)\1\1/;
  return _reg.test(pwd)
}

