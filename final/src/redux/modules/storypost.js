// StoryContent.js 부분을 관리하는 모듈(Grid, Map)
// 스토리페이지 (나의 게시물, 좋아요 게시물) API 사용
import { createAction, handleActions } from "redux-actions";
import { actionCreators as storyPostModalActions } from "./storypostmodal";
import { actionCreators as userActions } from "./user";
import { produce } from "immer";
import axios from "axios";
import "moment";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import { history } from "../configStore";

const SET_STORY_POST = "SET_STORY_POST";
const SET_STORY_LIKE = "SET_STORY_LIKE";
const EDIT_STORY_POST = "EDIT_STORY_POST";
const EDIT_STORY_LIKE = "EDIT_STORY_LIKE";
const DELETE_STORY_POST = "DELETE_STORY_POST";
const DELETE_STORY_MARKER = "DELETE_MY_MARKER";
const LOADING = "LOADING"; //is_loading을 true로 바꿔주는 액션
// 클릭시 스토리 페이지 게시물 정보 초기화
const RESET_STORY = "RESET_STORY";

const setStoryPost = createAction(SET_STORY_POST, (post_list) => ({
  post_list,
}));
const setStoryLike = createAction(SET_STORY_LIKE, (post_list) => ({
  post_list,
}));
const editStoryPost = createAction(EDIT_STORY_POST, (board_id, post) => ({
  board_id,
  post,
}));
const editStoryLike = createAction(EDIT_STORY_LIKE, (board_id, post) => ({
  board_id,
  post,
}));
const deleteStoryPost = createAction(DELETE_STORY_POST, (id) => ({ id }));
const deleteStoryMarker = createAction(DELETE_STORY_MARKER, (id) => ({ id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const resetStory = createAction(RESET_STORY, (reset) => ({ reset }));

const initialState = {
  user_post_list: [], //내가 올린 게시물 리스트
  user_like_list: [], //내가 좋아요한 게시물 리스트
  is_loading: true, // 페이징 처리할 데이터가 없을때 스피너를 보이지 않게함
  like: false,
  size: 15,
};

// 스토리페이지 / 유저 업로드 게시물 리스트
const getUserPostAPI = (userId) => {
  return function (dispatch, getState) {
    console.log("fkfkffkffkfffk");
    const _post_list = getState().storypost.user_post_list;
    const p_length = _post_list.length;
    let lastId = p_length === 0 ? 999 : _post_list[p_length - 1].id;
    let size = 15;
    // console.log("데이터는 잘 넘어가나?", userId, lastId, size);

    axios({
      method: "GET",
      // url: `${config.api}/story/${userId}/board`,
      url: `${config.api}/story/${userId}/board?lastId=${lastId}&size=${size}`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res.data.data);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          let post_list = [];
          res.data.data.forEach((_post) => {
          let post = {
            id: _post.boardId,
            img_url: _post.boardImgResponseDtoList,
            imgForOverlay: _post.boardImgResponseDtoList[0].imgUrl,
            spotName: _post.spotName,
            spotName1: _post.spotName.split(" ").splice(0, 2).join(" "),
            spotName2: _post.spotName.split(" ").splice(2).join(" "),
            latitude: _post.latitude,
            longitude: _post.longitude,
            like: _post.liked,
            likeCnt: _post.likeCount,
          };
          post_list.push(post);
          // console.log(post_list);
        });
        dispatch(setStoryPost(post_list));
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "게시물을 가져오는데 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
        console.log("게시물 로드 에러", err);
      });
  };
};

// 스토리페이지 / 유저 좋아요 게시물 리스트
const getUserLikeAPI = (userId) => {
  return function (dispatch, getState) {
    const _post_list = getState().storypost.user_like_list;
    const p_length = _post_list.length;
    let lastId = p_length === 0 ? 999 : _post_list[p_length - 1].id;
    let size = 15;
    // console.log("데이터는 잘 넘어가나?", userId, lastId, size);

    axios({
      method: "GET",
      url: `${config.api}/story/${userId}/likeboard?lastId=${lastId}&size=${size}`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res.data.data);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          let post_list = [];
          res.data.data.forEach((_post) => {
            let post = {
              id: _post.boardId,
              img_url: _post.boardImgResponseDtoList,
              imgForOverlay: _post.boardImgResponseDtoList[0].imgUrl,
              spotName: _post.spotName,
              spotName1: _post.spotName.split(" ").splice(0, 2).join(" "),
              spotName2: _post.spotName.split(" ").splice(2).join(" "),
              latitude: _post.latitude,
              longitude: _post.longitude,
              like: _post.liked,
              likeCnt: _post.likeCount,
            };
            post_list.push(post);
            // console.log(post_list);
          });
          dispatch(setStoryLike(post_list));
        }

      })
      .catch((err) => {
        Swal.fire({
          text: "게시물을 가져오는데 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
        console.log("게시물 로드 에러", err);
      });
  };
};

// StoryPost(GridList) 좋아요 수정 관련 -----------------------------------------

const addUserPostLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    // console.log("보드아이디", board_id);
    // console.log("보드", board);

    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("좋아요 완료!", res);
        console.log(res.data.message);

        if (res.data.message === "tokenExpired"){
            dispatch(userActions.logOut());
            Swal.fire({
              text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
              confirmButtonText: '로그인 하러가기',
              confirmButtonColor: '#ffb719',
              showCancelButton: true,
              cancelButtonText: '취소',
              cancelButtonColor: '#eee',
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/login");
              }
            })
        } else {
          let post = {
            like: true,
            likeCnt: board.likeCnt + 1,
          };
          dispatch(editStoryPost(board_id, post));
        }
      }).catch((error) => {
        console.log(error);
        Swal.fire({
          text: "로그인 후 이용해주세요 :)",
          confirmButtonColor: "#ffb719",
        });
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

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
      } else {
        let post = {
          like: false,
          likeCnt: board.likeCnt - 1,
        };
          dispatch(editStoryPost(board_id, post));
      }

      }).catch((error) => {
        console.log(error);
        Swal.fire({
          text: "좋아요 취소 실패 :(",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const addUserLikeLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    const paging = getState().post.paging;
    // console.log("보드아이디", board_id);
    // console.log("보드", board);

    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("좋아요 완료!", res);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{ 
          let post = {
          like: true,
          likeCnt: board.likeCnt + 1,
        };
        console.log("!!!!!!!", post);
        if (res.status === 200) {
          dispatch(editStoryLike(board_id, post));
        }
        if (res.data.message ==="tokenExpired"){
          dispatch(userActions.refreshTokenAPI());
        }}

       
      })
      .catch((error) => {
        Swal.fire({
          text: "로그인 후 이용해주세요 :)",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const deleteUserLikeLikeAPI = (board_id, board) => {
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

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          let post = {
            like: false,
            likeCnt: board.likeCnt - 1,
          };
          console.log("!!!!!!!", post);
          if (res.status === 200) {
            dispatch(editStoryLike(board_id, post));
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "좋아요 취소 실패 :(",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

export default handleActions(
  {
    // 내 게시물
    [SET_STORY_POST]: (state, action) =>
      produce(state, (draft) => {

        console.log("내 게시물 draft.user_post_list", draft.user_post_list);
        console.log("내 게시물 action.payload.post_list",action.payload.post_list);

        draft.user_post_list.push(...action.payload.post_list);
        draft.user_post_list = draft.user_post_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur]; //같은 id를 가진 게시물이 없다면 기존 포스트들과 새로받은 포스트 리턴
          } else {
            // 중복되는 id가 있다면? 포스트가 중복되서 출력되는 걸 막아줘야함
            acc[acc.findIndex((a) => a.id === cur.id)] = cur; //기존 리스트에서 새로받은 리스트와 같은 id가 있다면
            return acc; // 그 게시물은 새로 받은 게시물 => 그러므로 cur은 return 안해준다
          }
        }, []);
        // // 무한스크롤 시에는 push 방식으로 set 해주기
      }),
    // 내 좋아요 게시물
    [SET_STORY_LIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log("좋아요 draft.user_like_list", draft.user_like_list);
        console.log("좋아요 action.payload.post_list",action.payload.post_list);

        draft.user_like_list.push(...action.payload.post_list);
        draft.user_like_list = draft.user_like_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur]; //같은 id를 가진 게시물이 없다면 기존 포스트들과 새로받은 포스트 리턴
          } else {
            // 중복되는 id가 있다면? 포스트가 중복되서 출력되는 걸 막아줘야함
            acc[acc.findIndex((a) => a.id === cur.id)] = cur; //기존 리스트에서 새로받은 리스트와 같은 id가 있다면
            return acc; // 그 게시물은 새로 받은 게시물 => 그러므로 cur은 return 안해준다
          }
        }, []);
      }),

    // 내 게시물 수정(하트, 포스트 모달 수정 화면 반영)
    [EDIT_STORY_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        console.log(action.payload.board_id);
        let idx = draft.user_post_list.findIndex(
          (p) => p.id === action.payload.board_id
        );
        draft.user_post_list[idx] = {
          ...draft.user_post_list[idx],
          ...action.payload.post,
        };
      }),
    // 좋아요 게시물 수정(하트)
    [EDIT_STORY_LIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        console.log(action.payload.board_id);
        let idx = draft.user_like_list.findIndex(
          (p) => p.id === action.payload.board_id
        );
        draft.user_like_list[idx] = {
          ...draft.user_like_list[idx],
          ...action.payload.post,
        };
      }),

    // 내 게시물 삭제(포스트 모달 삭제 화면 반영)
    [DELETE_STORY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.user_post_list = draft.user_post_list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //서버에선 이미 지워져서 오지만 한번 더 중복검사
            // 현재 리스트에서 받은 포스트 id와 같은게 없다면?
            return [...draft.user_post_list, r]; // 그대로 출력
          }
        });
      }),
    [DELETE_STORY_MARKER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_post_list = draft.user_post_list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //서버에선 이미 지워져서 오지만 한번 더 중복검사
            // 현재 리스트에서 받은 포스트 id와 같은게 없다면?
            return [...draft.user_post_list, r]; // 그대로 출력
          }
        });
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [RESET_STORY]: (state, action) =>
      produce(state, (draft) => {
        draft.user_like_list = action.payload.reset;
        draft.user_post_list = action.payload.reset;
      }),
  },
  initialState
);

const actionCreators = {
  getUserPostAPI,
  getUserLikeAPI,
  setStoryPost,
  setStoryLike,
  editStoryPost,
  deleteStoryPost,
  deleteStoryMarker,
  addUserPostLikeAPI,
  deleteUserPostLikeAPI,
  addUserLikeLikeAPI,
  deleteUserLikeLikeAPI,
  resetStory,
};

export { actionCreators };
