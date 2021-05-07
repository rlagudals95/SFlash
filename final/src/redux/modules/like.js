import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as postActions } from "./post";

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

const addLikeAPI = (board_id) => {
  return function (dispatch, getState) {
    console.log("보드아이디", board_id);
    console.log("토큰", getCookie("jwt"));
    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": getCookie("jwt"),
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(postActions.getPostAPI());
        dispatch(addLike(true));
      })
      .catch((error) => {
        window.alert("좋아요를 할 수 없습니다.");
      });
  };
};

const disLikeAPI = (board_id) => {
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": getCookie("jwt"),
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(postActions.getPostAPI());
        dispatch(disLike(false));
      })
      .catch((error) => {
        window.alert("좋아요를 할 수 없습니다.");
      });
  };
};

const initialState = {
  like: false,
  likeCnt: 0,
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
  },
  initialState
);

const actionCreators = {
  addLikeAPI,
  disLikeAPI,
};

export { actionCreators };
