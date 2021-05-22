import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as PostActions } from "./post";
import { actionCreators as userActions } from "./user";
import Swal from "sweetalert2";

const GET_LIKE = "GET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DIS_LIKE = "DIS_LIKE";

const addLike = createAction(ADD_LIKE, (like, likeCnt) => ({
  like,
  likeCnt,
}));

const disLike = createAction(DIS_LIKE, (like, likeCnt) => ({
  like,
  likeCnt,
}));

const getLike = createAction(GET_LIKE, (like_list) => ({ like_list }));

const initialState = {
  list: [],
  like: false,
  likeCnt: 0,
};

const getLikePost = () => {
  return function (dispatch, getState) {
    const post_list = getState().post.list;

    let like_list = [];

    for (let i = 0; i < post_list.length; i++) {
      like_list.push(post_list[i].like);
    }

    dispatch(getLike(like_list));
  };
};

const addLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    const paging = getState().post.paging;

    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.data.message === "tokenExpired") {
          dispatch(userActions.logOut());
          Swal.fire({
            text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
            confirmButtonText: "로그인 하러가기",
            confirmButtonColor: "#ffb719",
            showCancelButton: true,
            cancelButtonText: "취소",
            cancelButtonColor: "#eee",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          dispatch(PostActions.editLikeP(board_id, board)); // 리덕스
        }
      })
      .catch((error) => {
        window.alert("로그인 후 이용해 주세요~.");
      });
  };
};

const disLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.data.message === "tokenExpired") {
          dispatch(userActions.logOut());
          Swal.fire({
            text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
            confirmButtonText: "로그인 하러가기",
            confirmButtonColor: "#ffb719",
            showCancelButton: true,
            cancelButtonText: "취소",
            cancelButtonColor: "#eee",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          dispatch(PostActions.editLikeD(board_id, board));
        }
      })
      .catch((error) => {
        // window.alert("좋아요를 할 수 없습니다.");
      });
  };
};

export default handleActions(
  {
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like;
        draft.likeCnt = draft.likeCnt + 1;
      }),
    [DIS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like;
        draft.likeCnt = draft.likeCnt - 1;
      }),
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.like_list;
      }),
  },
  initialState
);

const actionCreators = {
  addLikeAPI,
  disLikeAPI,
  getLikePost,
};

export { actionCreators };
