import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

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

const addLikeAPI = () => {
  return function (dispatch, getState) {
    axios({
      method: "POST",
      url: `${config.api}/board/{boardId}/like`,
    }).then((res) => {
      console.log(res);
    });
  };
};

const disLikeAPI = () => {
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/{boardId}/like`,
    }).then((res) => {
      console.log(res);
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
    [DIS_LIKE]: (state, aciton) =>
      produce(state, (draft) => {
        draft.like = action.payload.like;
        draft.likeCnt = draft.likeCnt - 1;
      }),
  },
  initialState
);
