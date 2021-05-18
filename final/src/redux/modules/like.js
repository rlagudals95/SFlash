import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as PostActions } from "./post";

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

// const getLike = createAction(GET_LIST, (like) => ({ like }));

const initialState = {
  list: [],
  like: false,
  likeCnt: 0,
  // paging: { start: null, size: 15 },
};

const getLikePost = () => {
  return function (dispatch, getState) {
    const post_list = getState().post.list;

    // console.log("!!!!!!!!!!", post_list);

    let like_list = [];

    for (let i = 0; i < post_list.length; i++) {
      like_list.push(post_list[i].like);
    }

    // console.log(like_list);
    dispatch(getLike(like_list));
  };
};

const addLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    const paging = getState().post.paging;
    // console.log("보드아이디", board_id);
    // console.log("보드", board);

    // console.log("토큰있나요??", localStorage.getItem("jwt"));
    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        // console.log("좋아요 완료!", res);
        dispatch(PostActions.editLikeP(board_id, board)); // 리덕스

        // dispatch(addLike(true));
        // dispatch(getLike(true));
      })
      .catch((error) => {
        window.alert("로그인 후 이용해 주세요~.");
      });
  };
};

const disLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    // console.log("보드아이디", board_id);
    // console.log("보드", board);

    axios({
      method: "DELETE",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        // console.log("좋아요 취소!", res);
        dispatch(PostActions.editLikeD(board_id, board));
        // console.log(res);
        // dispatch(disLike(false));
        // dispatch(getLike(false));
        // dispatch(postActions.getPostAPI(paging.start, paging.size));
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
