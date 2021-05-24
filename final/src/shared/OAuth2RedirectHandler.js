import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);

  const getUrlParameter = (name) => {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const jwt = getUrlParameter("token");
  const nickname = getUrlParameter("nickname");
  const userId = getUrlParameter("userId");
  const error = getUrlParameter("error");

  if (jwt) {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userId", userId);
    dispatch(userActions.setUser());
    return <Redirect to="/" />;
  } else if (error) {
    Swal.fire({
      text: "현재 시스템 문제로 소셜로그인 서비스를 이용하실 수 없습니다.",
      confirmButtonColor: "#ffb719",
    });
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }
};

export default OAuth2RedirectHandler;
