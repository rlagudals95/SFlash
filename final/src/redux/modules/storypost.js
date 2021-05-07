import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import { config } from "../../shared/config";

const SET_USER_POST = "SET_USER_POST";
const LOADING = "LOADING";

const setUserPost = createAction(SET_USER_POST, (post_list) => ({ post_list })); //paging은 나중에 넣기
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
    user_post_list: [], //내가 올린 게시물 리스트
    user_like_list: [], //내가 좋아요한 게시물 리스트
    paging: { start: null, next: null, size: 3 },
    is_loading: false,
    like: false,
    // paging: { state: null, size: 12 },
  };

// 스토리페이지 : 유저가 업로드한 게시물 리스트
  // start = null, size = null
  const getUserPostAPI = (nickname) => {
    return function (dispatch, getState) {
      axios({
        method: "GET",
        url: `${config.api}/story/${nickname}/board`,
        headers: {
          "X-AUTH-TOKEN": `${config.jwt}`,
        }
      }).then((res) => {
        console.log(res.data.data);
        let user_post_list = [];
        res.data.data.forEach((_post) => {
          let post = {
            id: _post.boardId,
            writerName: _post.writer,
            profileImg: _post.userImgUrl,    //이건 추가해야할것 같음

            title: _post.title,
            content: _post.content,
            img_url: _post.boardImgResponseDtoList,
            category: _post.category,
            spotName: _post.spotName,
            like: _post.liked,
            likeCnt: _post.likeCount,
            modified: _post.modified,
            comments: _post.comments,
        }
        user_post_list.unshift(post);
        console.log(user_post_list);
      })
      dispatch(setUserPost(user_post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
    };
  };

  // 스토리페이지 : 유저가 좋아요한 게시물 리스트
  const getUserLikeAPI = (nickname) => {
    return function (dispatch, getState) {
      axios({
        method: "GET",
        url: `${config.api}/story/${nickname}/board`,
        headers: {
          "X-AUTH-TOKEN": `${config.jwt}`,
        }
      }).then((res) => {
        console.log(res.data.data);
        // let user_like_list = [];
      //   res.data.data.forEach((_post) => {
      //     let post = {
      //       id: _post.boardId,
      //       writerName: _post.writer,
      //       profileImg: _post.userImgUrl,    //이건 추가해야할것 같음

      //       title: _post.title,
      //       content: _post.content,
      //       img_url: _post.boardImgResponseDtoList,
      //       category: _post.category,
      //       spotName: _post.spotName,
      //       like: _post.liked,
      //       likeCnt: _post.likeCount,
      //       modified: _post.modified,
      //       comments: _post.comments,
      //   }
      //   user_like_list.unshift(post);
      //   console.log(user_lke_list);
      // })
      // dispatch(setPost(user_like_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
    };
  };


  export default handleActions(
    {
        [SET_USER_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list = action.payload.user_post_list;
          // draft.paging = action.payload.paging; // 페이징 처리
          //겹치는 게시물 중복 제거 과정
          // draft.list = draft.list.reduce((acc, cur) => {
          //   if (acc.findIndex((a) => a.id === cur.id) === -1) {
          //     return [...acc, cur]; //같은 id를 가진 게시물이 없다면 기존 포스트들과 새로받은 포스트 리턴
          //   } else {
          //     // 중복되는 id가 있다면? 포스트가 중복되서 출력되는 걸 막아줘야함
          //     acc[acc.findIndex((a) => a.id === cur.id)] = cur; //기존 리스트에서 새로받은 리스트와 같은 id가 있다면
          //     return acc; // 그 게시물은 새로 받은 게시물 => 그러므로 cur은 return 안해준다
          //   }
          // }, []);
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
    setUserPost,
    loading,

  };
  
  export { actionCreators };