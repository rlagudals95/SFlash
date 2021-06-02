import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";


// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";

// actionCreators: createAction
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  user: "", //null
  is_login: localStorage.getItem("jwt") ? true : false,
  profileImg: "",
  is_loading: false,
};

//API요청(middleware actions)
// 회원가입
const signupAPI = (nickname, email, pwd, rePwd) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${config.api}/user/signup`, {
        nickname: nickname,
        email: email,
        password: pwd,
        pwdchk: rePwd,
      })
      .then((res) => {
        Swal.fire({
          imageUrl: "https://i.postimg.cc/SxmfpG6L/2x.png",
          text: "SFlash의 회원이 되신 걸 환영합니다 :)",
          confirmButtonText: "확인",
          confirmButtonColor: "#ffb719",
        });
        history.push("/login");
      })
      .catch((err) => {
        Swal.fire({
          text: "회원가입 실패 ㅠ.ㅠ",
          confirmButtonColor: "#ffb719",
        });
        console.log("회원가입 실패:", err);
      });
  };
};

// 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${config.api}/user/login`, {
        email: email,
        password: pwd,
      })
      .then((res) => {
        let decoded = jwt_decode(res.data.token);
        const tokenExpires = decoded.exp * 1000;
        // console.log("decoded.exp", decoded.exp*1000);
        // console.log("현재", new Date().getTime());
        localStorage.setItem("tokenExpires", tokenExpires);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("role", res.data.role);

        dispatch(setUser());
        window.location.replace("/");
      })
      .catch((err) => {
        Swal.fire({
          text: "로그인 정보를 다시 확인해 주세요.",
          confirmButtonColor: "#ffb719",
        });
        console.log("로그인 실패", err);
      });
  };
};

// 로그인 상태 확인 (페이지가 바뀔 때마다)
const loginCheck = (jwt) => {
  return function (dispatch, getState, { history }) {
    const is_login = getState().user.is_login;
    // console.log(is_login);
    if (is_login) {
      return;
    } else {
      dispatch(logOut());
    }
  };
};

// reducer: handleActions(immer를 통한 불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("tokenExpires");
        localStorage.removeItem("nickname");
        localStorage.removeItem("userId");
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

// actionCreators export
const actionCreators = {
  setUser,
  logOut,
  signupAPI,
  loginAPI,
  loginCheck,
  loading,
};

export { actionCreators };
