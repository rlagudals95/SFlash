import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as postActions } from "./post";
import { actionCreators as userActions } from "./user";
import Swal from "sweetalert2";

// 댓글 작성 /board/{boardId}/comment
// 댓글 수정 board/{boardId}/comment/{commentId}
// 댓글 삭제 /board/{boardId}/comment/{commentId}
// 모두 다 comment와 토큰만 보내면 된다

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
// 받아온 comment 이니셜 스테이트에 적용
const GET_COMMENT_LIST = "GET_COMMENT";

const setComment = createAction(SET_COMMENT, (commnet_list, board_id) => ({
  commnet_list,
  board_id,
}));

const addComment = createAction(ADD_COMMENT, (comment_list) => ({
  comment_list,
}));

const editComment = createAction(EDIT_COMMENT, (comment) => ({ comment }));

const deleteComment = createAction(DELETE_COMMENT, (id) => ({
  id,
}));

const getCommentList = createAction(GET_COMMENT_LIST, (comment_list) => ({
  comment_list,
}));

const initialState = {
  list: [],
};

const getComment = (board_id) => {
  return function (dispatch, getState) {
    //여기서 일단 코멘트 리스트를 다 가져와서 list에 넣어주자
    const post_list = getState().post.list;
    // console.log("가져와요!", post_list);

    //받은 보드 아이디와 같은 포스트 하나를 찾자
    const idx = post_list.findIndex((p) => {
      return p.id === board_id;
    });

    const getCommentPost = post_list[idx];

    // console.log("이거 가져와", getCommentPost);

    const comment_list = getCommentPost.comment;

    // const comment_list =

    console.log(comment_list); // 여기까진 잘된다./.
    dispatch(getCommentList(comment_list));
  };
};

const getCommentAPI = (board_id) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `${config.api}/board/{boardId}/comment`,
    })
      .then((res) => {
        // console.log(res);
        let commnet_list = [];
        res.data.forEach((c) => {
          let comment = {
            comment: c.comment,
          };
          commnet_list.unshift(comment);
        });
        //     dispatch(setComment(comment_list, board_id));
      })
      .catch((error) => {
        window.alert("댓글을 불러올 수 없습니다.");
      });
  };
};

const addCommentAPI = (comment, board_id) => {
  // 댓글 id를 받으면 되겠다!
  return function (dispatch) {
    // console.log("댓글와유?", comment);
    // console.log("아이디와유?", board_id);
    // console.log(config.jwt);

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

          // console.log("댓글추가반응", res);
          dispatch(addComment(comment_list));
          // dispatch(getComment(board_id)); //이래 해줘도 되나?
          // dispatch(postActions.addComment(comment, board_id));
          // dispatch(postActions.setPost());
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 작성에 문제가 있어요!");
      });
  };
};

const deleteCommentAPI = (id) => {
  //이 아이디는 코멘트 id
  // console.log("댓글 id", id);
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/comment/${id}`, //서버에서 지우고
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
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
          // dispatch(deleteComment(id, board_id)); //바로 렌더링 시켜줘야 삭제 눌렀을때 반영된다
          dispatch(deleteComment(id));
        }
      })
      .catch((err) => {
        window.alert("댓글 삭제에 문제가 있어요!");
      });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //  draft.list[action.payload.post_id] 안에 아무것도 없는 상태이면 배열도 없는 상태여서
        // unshift도 되지 않습니다. 그래서 아무것도 없는 경우일 때를 따로 설정했습니다.

        draft.list.unshift(action.payload.comment_list);

        // if (!draft.list[action.payload.board_id]) {
        //   draft.list[action.payload.board_id] = [action.payload.comment];
        //   return;
        // } //댓글이 없다면? 그냥 대체 해주는 거죠??
        // draft.list[action.payload.board_id].unshift(action.payload.comment);
        // 어떤 포스트의 댓글 배열 안에 새로 받은 코멘트를 넣어줍니다
        //원래 이니셜 스테이트에 1맨 앞에 댓글 추가
      }),
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //받은 포스트 아이디 번째의 list를 새로운 코멘트 리스트로 교체해준다 우리도 포스트 id가 0,1,2,3,4,5니까 쉽게 할 수 있을 것 같다
        draft.list[action.payload.board_id] = action.payload.comment_list;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //여기선 댓글 id를 받는다 draft리스트에 받은 id와 같은게 있는지 찾아서 삭제해준다
        // 댓글 id 서버에서 받을 때 까지 대기
        draft.list = draft.list.filter((c, idx) => {
          if (c.commentId !== action.payload.id) {
            return [draft.list, c];
          }
        });

        // draft.list = draft.list.filter((c) => {

        //   if

        // })

        // let idx = draft.list[action.payload.board_id].findIndex(
        //   (p) => p.id === action.payload.id
        // ); //음 어떤 포스트에서 썼고 어떤 유저가 쓴거야?? 를 id를 받아서 찾는다
        // //현재 이니셜 스테이트의 list안의 댓글들 중에서 찾는다 받은 댓글의 id와 같은 친구를
        // if (idx !== -1) {
        //   // 만약 그런 댓글이 있다면?? // 지금 댓글 배열에서
        //   draft.list[action.payload.board_id].splice(idx, 1); //idx위치의 항목 1개를 삭제한다
        //   // 받은 포스트 아이디 순번의 리스트(댓글 배열에서) 받은 id 를 삭제해준다!
        // }
      }),
    [GET_COMMENT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
      }),
  },
  initialState
);

const actionCreators = {
  addCommentAPI,
  getCommentAPI,
  deleteCommentAPI,
  getComment,
  deleteComment,
};

export { actionCreators };
