import React from "react";
import { useSelector } from "react-redux";
import { getCookie } from "./Cookie";

const Permit = (props) => {
  const is_login = useSelector((state) => state.user.is_login);

  const token = getCookie("token"); // is_login 이라는 키값을 가진 토큰 가져와라
  const is_cookie = token ? true : false; // 그리고 is_cookie로 토큰 유무판단
  // const token = localStorage.getItem("token");
  // const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_cookie) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
