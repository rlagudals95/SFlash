import { createAction, handleActions } from "redux-actions";
import { actionCreators as storyPostActions } from "./storypost";
import { actionCreators as userActions } from "./user";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import { config } from "../../shared/config";
import Swal from "sweetalert2";

//마커를 누르면 상세모달창이 뜨는 것을 효율적으로 구현하기 위해서 만든 모듈
const GET_MODAL = "GET_MODAL";
const GET_MODAL_ID = "GET_MODAL_ID";
//혹시 모르니 만들어두자..
const SET_MADAL = "SET_MODAL";
//마커 클릭시 모달 데이터에서 코멘트만 따로 빼오자
const GET_MODAL_COMMENT = "GET_MODAL_COMMENT";
//
const MODAL_ADD_COMMENT = "MODAL_ADD_COMMENT";
//
const MODAL_DELETE_COMMENT = "MODAL_DELETE_COMMENT";
// 모달 라이크 구현
const MODAL_ADD_LIKE = "MODAL_ADD_LIKE";

const MODAL_DIS_LIKE = "MODAL_DIS_LIKE";
//
const MODAL_EDIT = "MODAL_EDIT";
// 모달을 닫고 다른 모달을 클릭시 이전 데이터가 보이는 현상방지하기 위해 데이터를 초기화 해줌
const RESET_MODAL = "RESET_MODAL";

const getModal = createAction(GET_MODAL, (post) => ({ post }));
const getModalId = createAction(GET_MODAL_ID, (id) => ({ id }));

////// 댓글 구현
const getModalComment = createAction(GET_MODAL_COMMENT, (comment_list) => ({
  comment_list,
}));
const modalAddComment = createAction(MODAL_ADD_COMMENT, (comment_list) => ({
  comment_list,
}));
const modalDeleteComment = createAction(MODAL_DELETE_COMMENT, (id) => ({
  id,
}));

///// 좋아요 구현
const modalAddLike = createAction(MODAL_ADD_LIKE, (post) => ({ post }));
const modalDisLike = createAction(MODAL_DIS_LIKE, (post) => ({ post }));
// 수정 구현
const modalEdit = createAction(MODAL_EDIT, (post) => ({ post }));
// 모달을 닫고 다른 모달을 클릭시 이전 데이터가 보이는 현상방지하기 위해 데이터를 초기화 해줌
const resetModal = createAction(RESET_MODAL, (post) => ({ post }));

const getModalPost = (id) => {
  return function (dispatch, getState) {
    const post_list = getState().post.map_post_list;
    // console.log("가와~~", post_list);

    const idx = post_list.findIndex((p) => {
      if (p.id === id) {
        return p;
      }
    });

    const ModalPost = post_list[idx];
    // console.log("찾았다!", ModalPost);
    //////////////////
    const ModalComment = ModalPost.comment;

    // console.log("코멘트!", ModalComment);

    dispatch(getModal(ModalPost));
    dispatch(getModalComment(ModalComment));
  };
};

//모달 데이터를 다 가지고 와서 initialState의 post 에저장

const getModalPostAPI = (boardId) => {
  return function (dispatch) {
    // console.log("실행되나요 모달 데이터 겟");

    axios({
      method: "GET",
      url: `${config.api}/board/${boardId}/detail`,

      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        // "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        // console.log("모달정보 가져오자!!!!", res);

        let result = res.data.data;
        // console.log("정리된거 맞지?", result, boardId);
        let post = {
          id: result.boardId, // 포스트 id
          title: result.title, // 포스트 title
          content: result.content, // 포스트 내용
          writerName: result.writerName,
          img_url: result.boardImgReponseDtoList,
          category: result.category,
          profileImg: result.writerImgUrl,
          like: result.liked,
          likeCnt: result.likeCount,
          comment: result.boardDetailCommentDtoList,
          creatAt: result.modified,
          writerId: result.userId,
          spotName: result.spotName,
        };
        let comment_list = post.comment;
        // console.log("게시물 요거", post);
        // console.log("댓글요거", comment_list);

        dispatch(getModal(post)); // 모달 정보는 > post 에 저장 > 수정시 post 에 있는거 바꿔주면된다
        dispatch(getModalComment(comment_list)); //댓글 > comment에 따로 저장
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물 상세보기 에러.");
      });
  };
};

////////////////////////////////////////////////// 댓글

const modalAddCommentAPI = (comment, board_id) => {
  // 댓글 id를 받으면 되겠다!
  return function (dispatch) {
    // console.log("댓글와유?", comment);
    // console.log("아이디와유?", board_id);

    axios({
      url: `${config.api}/board/${board_id}/comment`,
      method: "POST",
      data: { content: comment },
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res);

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
          const comment_data = res.data.data;
          // console.log("댓글정보", comment_data);
          let comment_list = {
            commentId: comment_data.commentId,
            content: comment_data.content,
            modified: comment_data.modified, //이거좀 고치자! 현준님이 id랑 날짜주면 !
            userId: comment_data.userId,
            writerImgUrl: comment_data.userImgUrl,
            writerName: comment_data.nickName,
          };
          dispatch(modalAddComment(comment_list));
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "댓글 작성에 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const modalDeleteCommentAPI = (id) => {
  //이 아이디는 코멘트 id
  // console.log("댓글 id", id);
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/comment/${id}`, //서버에서 지우고
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
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
          dispatch(modalDeleteComment(id));
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "댓글 삭제에 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

/////////////////////////// 좋아요
const modalAddLikeAPI = (board_id, board) => {
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
        console.log("좋아요!", res);

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
          dispatch(editLikeP(board));
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "로그인 후 이용해주세요 :)",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const modalDisLikeAPI = (board_id, board) => {
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
          dispatch(editLikeD(board));
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "로그인 후 이용해주세요 :)",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const editLikeP = (post) => {
  return function (dispatch, getState) {
    let board = {
      id: post.id,
      title: post.title,
      content: post.content,
      writerName: post.writerName,
      category: post.category,
      profileImg: post.profileImg,
      like: true,
      likeCnt: post.likeCnt + 1,
      comment: post.comment,
      img_url: post.img_url,
      creatAt: post.creatAt,
      writerId: post.writerId,
      spotName: post.spotName,
    };

    dispatch(modalAddLike(board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
  };
};

const editLikeD = (post) => {
  return function (dispatch, getState) {

    let board = {
      category: post.category,
      comment: post.comment,
      content: post.content,
      creatAt: post.creatAt,
      id: post.id,
      img_url: post.img_url,
      like: false,
      likeCnt: post.likeCnt - 1,
      profileImg: post.profileImg,
      title: post.title,
      writerName: post.writerName,
      writerId: post.writerId,
      spotName: post.spotName,
    };

    dispatch(modalDisLike(board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
  };
};

const editStoryPostAPI = (board_id, _edit) => {
  return function (dispatch, getState) {
    const deleteImg = getState().image2.id; //삭제된 이미지 id
    const addFile = getState().image2.edit_file; //추가된 이미지 파일
    // const markerData = getState().post.map_post_list;
    // const postData = getState().post.list;
    // console.log("현재 마커데이터", markerData);
    // console.log("현재 포스트 데이터", postData);

    //여기서
    // for (let i = 0; i < addFile.length; i++) {
    //   console.log(addFile[i].imgUrl);
    // }
    // console.log("삭제된 이미지 아이디들", deleteImg);
    // console.log("추가될 이미지파일", addFile);
    // console.log("바뀔 게시글", board_id);
    // console.log("바뀔 타이틀", _edit.title);
    // console.log("바뀔 글내용", _edit.contents);
    // addFile[i]번째에 imgUrl 이 있을경우 제외 시킨다
    const formData = new FormData();
    formData.append("title", _edit.title); //수정된 제목
    formData.append("content", _edit.contents); //수정된 내용
    formData.append("deleteImages", deleteImg);

    let _addFile = [];
    for (let i = 0; i < addFile.length; i++) {
      //가져온 어레이만큼 반복문을 돌리는데 이때 url형식의 기존 이미지는 제거
      if (!addFile[i].imgUrl) {
        _addFile.push(addFile[i]);
      }
    }
    //파일 리스트 중에 기존에 있던 imgUrl이 있는 이미지들을 제외하고 새로추가한 파일형식의 요소만 폼데이터로 수정(추가)요청
    // console.log("최종추가될 이미지", _addFile);

    for (let i = 0; i < _addFile.length; i++) {
      formData.append("file", _addFile[i]);
    }

    axios({
      method: "PUT",
      url: `${config.api}/board/${board_id}`,
      data: formData,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      // console.log("수정반응값!", res);
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
        Swal.fire({
          text: "게시물을 수정 하시겠습니까?",
          confirmButtonText: "예",
          confirmButtonColor: "#ffb719",
          showCancelButton: true,
          cancelButtonText: "아니오",
          cancelButtonColor: "#eee",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(getModal(post));
            dispatch(storyPostActions.editStoryPost(board_id, post));
          }
        });
      }
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
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        // console.log(res);

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
          dispatch(storyPostActions.deleteStoryPost(board_id));
          dispatch(storyPostActions.deleteStoryMarker(board_id));
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "게시물 삭제에 문제가 있어요 :(",
          confirmButtonColor: "#ffb719",
        });
        // console.log("게시글 삭제 에러", err);
      });
  };
};

const initialState = {
  post: null,
  id: null, // Map에서 props로 id를 넘기기 어려워 id값을 따로 모듈에 저장 //id 기준으로 comment를 따로 부르기위해 작성
  //음... 아니면 get요청 해서 받은 모달정보중 id로 comment를 불러 올 수도 있겠다...
  comment: [], //코멘트 어레이
  like: false,
};

export default handleActions(
  {
    [GET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [GET_MODAL_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
      }),
    /// 댓글 부분 모듈
    [GET_MODAL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = action.payload.comment_list;
      }),
    [MODAL_ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment.unshift(action.payload.comment_list);
      }),

    [MODAL_DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //비교해서 제외
        // console.log("삭제댓글 아이디", action.payload.id);
        draft.comment = draft.comment.filter((c) => {
          if (c.commentId !== action.payload.id) {
            return [draft.comment, c];
          }
        });
      }),
    //////////////////////// 좋아요 구현
    [MODAL_ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [MODAL_DIS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [MODAL_EDIT]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [RESET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
  },
  initialState
);

const actionCreators = {
  getModalPostAPI,
  getModalPost,
  getModalId,
  modalAddCommentAPI,
  modalDeleteCommentAPI,
  modalAddLikeAPI,
  modalDisLikeAPI,
  modalEdit,
  resetModal,
  editStoryPostAPI,
  deleteStoryPostAPI,
};

export { actionCreators };
