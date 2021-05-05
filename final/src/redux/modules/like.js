import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
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

const addLikeAPI = (board_id) => {
  return function (dispatch, getState) {
    axios({
      method: "POST",
      url: `${config.api}/board/{boardId}/like`,
      headers: {
        "X-AUTH-TOKEN": "jwt", //로컬 호스트에 있는 토큰을 줘야하나?
      },
    }).then((res) => {
      console.log(res);
      dispatch(addLike(true));
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
      dispatch(disLike(false));
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
