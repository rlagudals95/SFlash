import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as PostActions } from "./post";
import { CgBoard } from "react-icons/cg";

const GET_USER_POST_LIKE = "GET_USER_POST_LIKE";
const ADD_USER_POST_LIKE = "ADD_USER_POST_LIKE";
const DELETE_USER_POST_LIKE = "DELETE_USER_POST_LIKE";

const getUserPostLike = createAction(GET_USER_POST_LIKE, (like_list) => ({ like_list }));
const addUserPostLike = createAction(ADD_USER_POST_LIKE, (like, likeCnt) => ({
  like,
  likeCnt,
}));
const deleteUserPostLike = createAction(DELETE_USER_POST_LIKE, (like, likeCnt) => ({
  like,
  likeCnt,
}));

// const getLike = createAction(GET_LIST, (like) => ({ like }));

const initialState = {
  user_post_list_like: false,
  user_post_list_likeCnt: 0,
  user_like_list_like: false,
  user_like_list_likeCnt: 0,
  // paging: { start: null, size: 15 },
};

// const getUserPostLike = () => {
//   return function (dispatch, getState) {
//     const user_post_list = getState().storypost.user_post_list;

//     let like_list = [];

//     for (let i = 0; i < post_list.length; i++) {
//       like_list.push(post_list[i].like);
//     }
//     console.log(like_list);
//     dispatch(getLike(like_list));
//   };
// };

const addUserPostLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    const paging = getState().post.paging;
    console.log("보드아이디", board_id);
    console.log("보드", board);
    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("좋아요 완료!", res);

        let updatedBoard = {
          id: board.id,
          img_url: board.img_url,
          spotName: board.spotName,
          latitude: board.latitude,
          longitude: board.longitude,
          like: true,
          likeCnt: board.likeCnt + 1 ,
        }
        console.log("!!!!!!!", updatedBoard);
        if(res.status===200){
          dispatch(addUserPostLike(board_id, updatedBoard));
      }
    })
      .catch((error) => {
        window.alert("XXX좋아요를 할 수 없습니다.");
      });
  };
};

const deleteUserPostLikeAPI = (board_id, board) => {
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
        console.log("좋아요 취소!", res);
        let updatedBoard = {
          id: board.id,
          img_url: board.img_url,
          spotName: board.spotName,
          latitude: board.latitude,
          longitude: board.longitude,
          like: false,
          likeCnt: board.likeCnt - 1 ,
        }
        console.log("!!!!!!!", updatedBoard);
        if(res.status===200){
          dispatch(deleteUserPostLike(board_id, updatedBoard));
      }
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
    [GET_USER_POST_LIKE]: (state, action) =>
    produce(state, (draft) => {
      draft.user_post_list = action.payload.like_list;
    }),
    [ADD_USER_POST_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.user_post_list.findIndex((b)=> b.id === action.payload.board_id);
        draft.user_post_list[idx] = { ...draft.user_post_list[idx], ...action.payload.updatedBoard };
        // draft.user_post_list.slice(idx, 1, action.payload.updatedBoard);
        // draft.like = action.payload.like;
        // draft.likeCnt = draft.likeCnt + 1;
      }),
    [DELETE_USER_POST_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.user_post_list.findIndex((b)=> b.id === action.payload.board_id);
        draft.user_post_list[idx] = { ...draft.user_post_list[idx], ...action.payload.updatedBoard };
        // let idx = draft.user_post_list.findIndex((b)=> b.id === action.payload.board_id);
        // draft.user_post_list.slice(idx, 1, action.payload.updatedBoard);
        // draft.like = action.payload.like;
        // draft.likeCnt = draft.likeCnt - 1;
      }),
  },
  initialState
);

const actionCreators = {
  getUserPostLike,
  addUserPostLikeAPI,
  deleteUserPostLikeAPI,
  // getUserLikeLike,
  // addUserLikeLikeAPI,
  // deleteUserLikeLikeAPI,

};

export { actionCreators };