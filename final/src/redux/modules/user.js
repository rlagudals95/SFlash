import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from "sweetalert2";

// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";

// actionCreators: createAction
const setUser = createAction(SET_USER, (user) => ({ user }));
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
    axios
      .post(`${config.api}/user/login`, {
        email: email,
        password: pwd,
      })
      .then((res) => {
        console.log(res);
        // let expires = new Date();
        // expires = expires.setHours(expires.getHours() + 0.05);
        let expires = new Date();
        const tokenExpires = expires.setHours(expires.getHours() + 5);
        console.log(tokenExpires);
        console.log(expires);
        localStorage.setItem("toeknExpires", tokenExpires);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("role", res.data.role);
        dispatch(setUser());
        history.replace("/");
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
  return function (dispatch, getstate, { history }) {
    if (jwt) {
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
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.clear();
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
