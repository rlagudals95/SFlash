import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import { config } from "../../shared/config";
import Swal from "sweetalert2";

const SET_STORY_POST = "SET_STORY_POST";
const SET_STORY_LIKE = "SET_STORY_LIKE";
const EDIT_STORY_POST = "EDIT_STORY_POST";
const EDIT_STORY_LIKE = "EDIT_STORY_LIKE";
const DELETE_STORY_POST = "DELETE_STORY_POST";
const DELETE_STORY_MARKER = "DELETE_MY_MARKER";
const LOADING = "LOADING";

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

const initialState = {
  user_post_list: [], //내가 올린 게시물 리스트
  user_like_list: [], //내가 좋아요한 게시물 리스트
  is_loading: false,
  paging: { start: null, size: 15 },
  like: false,
  likeCnt: 0,
};

// 스토리페이지 / 유저 업로드 게시물 리스트
// start = null, size = null
const getUserPostAPI = (userId) => {
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
            img_url: _post.boardImgResponseDtoList,
            spotName: _post.spotName,
            latitude: _post.latitude,
            longitude: _post.longitude,
            like: _post.liked,
            likeCnt: _post.likeCount,
            // title: _post.title,
            // content: _post.content,
            // writerName: _post.writer,
            // profileImg: _post.writerImgUrl,
            // category: _post.category,
            // creatAt: _post.modified,
            // comment: _post.comments,
          };
          post_list.push(post);
          console.log(post_list);
        });
        dispatch(setStoryPost(post_list));
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
            img_url: _post.boardImgResponseDtoList,
            spotName: _post.spotName,
            latitude: _post.latitude,
            longitude: _post.longitude,
            like: _post.liked,
            likeCnt: _post.likeCount,
          };
          post_list.unshift(post);
          console.log(post_list);
        });
        dispatch(setStoryLike(post_list));
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

// 모달창 관련-----------------------------------------------------

const editStoryPostAPI = (board_id, _edit) => {
  return function (dispatch, getState) {
    const deleteImg = getState().image2.id;
    const addFile = getState().image2.edit_file;
    //여기서
    // for (let i = 0; i < addFile.length; i++) {
    //   console.log(addFile[i].imgUrl);
    // }
    console.log("삭제된 이미지 아이디들", deleteImg);
    console.log("추가될 이미지파일", addFile);
    console.log("바뀔 게시글", board_id);
    console.log("바뀔 타이틀", _edit.title);
    console.log("바뀔 글내용", _edit.contents);
    // addFile[i]번째에 imgUrl 이 있을경우 제외 시킨다
    const formData = new FormData();
    formData.append("title", _edit.title);
    formData.append("content", _edit.contents);
    formData.append("deleteImages", deleteImg);

    let _addFile = [];
    for (let i = 0; i < addFile.length; i++) {
      //가져온 어레이만큼 반복문을 돌리는데 이때 url형식의 기존 이미지는 제거
      if (!addFile[i].imgUrl) {
        _addFile.push(addFile[i]);
      }
    }
    //파일 리스트 중에 기존에 있던 imgUrl이 있는 이미지들을 제외하고 새로추가한 파일형식의 요소만 폼데이터로 수정(추가)요청

    console.log("최종추가될 이미지", _addFile);

    for (let i = 0; i < _addFile.length; i++) {
      formData.append("file", _addFile[i]);
    }

    axios({
      method: "PUT",
      url: `${config.api}/board/${board_id}`,
      data: formData,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log("수정반응값!", res);
      let _post = res.data.data;
      let post = {
        id: _post.boardId, // 포스트 id
        title: _post.title, // 포스트 title
        content: _post.content, // 포스트 내용
        writerName: _post.writerName,
        img_url: _post.boardImgReponseDtoList,
        category: _post.category,
        profileImg: _post.writerImgUrl,
        like: _post.liked,
        likeCnt: _post.likeCount,
        comment: _post.boardDetailCommentDtoList,
        creatAt: _post.modified,
        spotName: _post.spotName,
      };
      console.log("!??!@12", post);
      // 수정된 게시물정보를 받고싶다
      dispatch(editStoryPost(board_id, post));
      /// 여기서 게시물수정 정보 초기화를 해줘야 모달창을 다시눌러 수정해도 이상한 현상?을 방지해줌
    });
  };
};

const deleteStoryPostAPI = (board_id) => {
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/${board_id}`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteStoryPost(board_id));
        dispatch(deleteStoryMarker(board_id));
      })
      .catch((err) => {
        Swal.fire({
          text: "게시물 삭제에 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
        console.log("게시글 삭제 에러", err);
      });
  };
};

// StoryPost(GridList) 좋아요 수정 관련 -----------------------------------------

const addUserPostLikeAPI = (board_id, board) => {
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

        let post = {
          like: true,
          likeCnt: board.likeCnt + 1,
        };

        if (res.status === 200) {
          dispatch(editStoryPost(board_id, post));
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "좋아요 실패 :(",
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

        let post = {
          like: false,
          likeCnt: board.likeCnt - 1,
        };

        if (res.status === 200) {
          dispatch(editStoryPost(board_id, post));
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

        let post = {
          like: true,
          likeCnt: board.likeCnt + 1,
        };
        console.log("!!!!!!!", post);
        if (res.status === 200) {
          dispatch(editStoryLike(board_id, post));
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "좋아요 실패 :(",
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
        let post = {
          like: false,
          likeCnt: board.likeCnt - 1,
        };
        console.log("!!!!!!!", post);
        if (res.status === 200) {
          dispatch(editStoryLike(board_id, post));
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
        draft.user_post_list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
      }),
    // 내 좋아요 게시물
    [SET_STORY_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_like_list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
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
  },
  initialState
);

const actionCreators = {
  getUserPostAPI,
  getUserLikeAPI,
  setStoryPost,
  setStoryLike,
  editStoryPostAPI,
  deleteStoryPostAPI,

  addUserPostLikeAPI,
  deleteUserPostLikeAPI,
  addUserLikeLikeAPI,
  deleteUserLikeLikeAPI,
};

export { actionCreators };
