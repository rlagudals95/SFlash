import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import { config } from "../../shared/config";

const SET_STORY_POST = "SET_STORY_POST";
const SET_STORY_LIKE = "SET_STORY_LIKE";
const LOADING = "LOADING";

const setStoryPost = createAction(SET_STORY_POST, (post_list) => ({
  post_list,
}));
const setStoryLike = createAction(SET_STORY_LIKE, (post_list) => ({
  post_list,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
    user_post_list: [], //내가 올린 게시물 리스트
    user_like_list: [], //내가 좋아요한 게시물 리스트
    is_loading: false,
    paging: { start: null, size: 15 },
  };

// 스토리페이지 : 유저가 업로드한 게시물 리스트
// start = null, size = null
const getUserPostAPI = (userId) => {
  console.log(userId);
  return function (dispatch, getState) {
    axios({
      method: "GET",
      url: `${config.api}/story/${userId}/board`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        let post_list = [];

        res.data.data.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            content: _post.content,
            writerName: _post.writer,
            profileImg: _post.writerImgUrl,   
            img_url: _post.boardImgResponseDtoList,
            category: _post.category,
            spotName: _post.spotName,
            latitude: _post.latitude,
            longitude: _post.longitude,
            like: _post.liked,
            likeCnt: _post.likeCount,
            creatAt: _post.modified,
            comment: _post.comments,
          };

          console.log("포스트 리스트1", post_list);
          post_list.push(post);
          console.log(post_list);
        });
        dispatch(setStoryPost(post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
  };
};

// 스토리페이지 : 유저가 좋아요한 게시물 리스트
const getUserLikeAPI = (userId) => {
  return function (dispatch, getState) {
    axios({
      method: "GET",
      url: `${config.api}/story/${userId}/likeboard`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        console.log(res.data.data);
        let post_list = [];

        res.data.data.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            content: _post.content,
            writerName: _post.writer,
            profileImg: _post.writerImgUrl,   
            img_url: _post.boardImgResponseDtoList,
            category: _post.category,
            spotName: _post.spotName,
            latitude: _post.latitude,
            longitude: _post.longitude,
            like: _post.liked,
            likeCnt: _post.likeCount,
            creatAt: _post.modified,
            comment: _post.comments,
          };
          console.log("포스트 리스트2", post_list);
          post_list.unshift(post);
          console.log(post_list);
        });
        dispatch(setStoryLike(post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
  };
};

export default handleActions(
  {
    [SET_STORY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.user_post_list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
      }),

    [SET_STORY_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_like_list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getUserPostAPI,
  getUserLikeAPI,
  setStoryPost,
  setStoryLike,
  // loading,
};

export { actionCreators };
