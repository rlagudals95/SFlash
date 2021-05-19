import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configStore";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
// import jwt_decode from 'jwt-decode';

// actions
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";

// actionCreators: createAction
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initial State
const initialState = {
  user: "", //null
  is_login: false,
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
        console.log("signupAPI(res)", res);
        Swal.fire({
          text: "SFlash의 회원이 되었습니다. :)",
          confirmButtonColor: "#ffb719",
        });
        history.push("/login");
      })
      .catch((err) => {
        Swal.fire({
          text: "회원가입 실패 ㅠㅠ",
          confirmButtonColor: "#ffb719",
        });
        console.log("회원가입 실패:", err);
      });
  };
};

// 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    // console.log("로그인 값", email, pwd);
    axios
      .post(`${config.api}/user/login`, {
        email: email,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);

        // let user = {
        //   id : res.data.userId,
        //   nickname : res.data.nickname,
        //   profile : res.data.profileImgUrl,
        //   role: res.data.role,
        // }
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("jwt", res.data.token);
        // localStorage.setItem("jwt", res.data.acessToken);
        // localStorage.setItem("refreshjwt", res.data.refreshToken);
        localStorage.setItem("role", res.data.role);
        dispatch(setUser());
        history.push("/");
      })
      .catch((err) => {
        Swal.fire({
          text: "로그인 실패 ㅠㅠ",
          confirmButtonColor: "#ffb719",
        });
        console.log("로그인 실패", err);
      });
  };
};

// 로그인 상태 확인 (페이지가 바뀔 때마다)
const loginCheck = (jwt) => {
  console.log(jwt);
  return function (dispatch, getstate, { history }) {
    if (jwt) {
      // let decoded = jwt_decode(localStorage.getItem("jwt"));
      // console.log("토큰디코딩!!!", decoded.exp*1000);
      // console.log(new Date().getTime());
      dispatch(setUser());
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
        // draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("nickname");
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshjwt");
        localStorage.removeItem("userId");
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
