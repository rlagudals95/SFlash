import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

// 댓글 작성 /board/{boardId}/comment
// 댓글 수정 board/{boardId}/comment/{commentId}
// 댓글 삭제 /board/{boardId}/comment/{commentId}
// 모두 다 comment와 토큰만 보내면 된다

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setComment = createAction(SET_COMMENT, (commnet_list, board_id) => ({
  commnet_list,
  board_id,
}));

const addComment = createAction(ADD_COMMENT, (comment, board_id) => ({
  comment,
  board_id,
}));

const editComment = createAction(EDIT_COMMENT, (comment) => ({ comment }));

const deleteComment = createAction(DELETE_COMMENT, (id, board_id) => ({
  id,
  board_id,
}));

const initialState = {
  list: [],
};

/////////////////

// axios({
//   method: "POST",
//   url: `http://3.34.48.76/api/comment/${post_id}`,
//   data: {
//     ...comment,
//   },
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json;charset=UTF-8",
//     Authorization: `Bearer ${token}`,
//   },
// });

const getCommentAPI = (board_id = null) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `${config.api}/board/{boardId}/comment`,
    })
      .then((res) => {
        console.log(res);
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
  return function (dispatch) {
    let _comment = {
      contentsId: post_id, //댓글 아이디는 포스트의 아이디 고유값
      userId: comment.user_name, // 유저네임 받아온것
      comment: comment.comment, // 댓글 받아온 것
      myImg: comment.profile_url, // 프로필 이미지 받아온 것 요건 없어도 되겠다
      commentDt: moment().format("YYYY-MM-DD HH:mm:ss"), // 지금 작성 날짜 보내준 것 요것도 없어도 되겠다
    };
    axios(
      {
        url: `${config.api}/board/{boardId}/comment`,
        method: "POST",
        data: { ...comment },
      },
      token
    )
      .then((res) => {
        console.log(res.data);
        let comment_list = { ...comment, id: res.data.id };
        dispatch(addComment(comment_list, board_id));
      })
      .catch((err) => {
        console.log(err.response);
        window.alert("댓글 작성에 문제가 있어요!");
      });
  };
};

const deleteCommentAPI = () => {
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/{boardId}/comment`, //서버에서 지우고
    })
      .then((res) => {
        dispatch(deleteComment(id, board_id)); //바로 렌더링 시켜줘야 삭제 눌렀을때 반영된다
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
        if (!draft.list[action.payload.board_id]) {
          draft.list[action.payload.board_id] = [action.payload.comment];
          return;
        } //댓글이 없다면? 그냥 대체 해주는 거죠??
        draft.list[action.payload.post_id].unshift(action.payload.comment);
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
        let idx = draft.list[action.payload.board_id].findIndex(
          (p) => p.id === action.payload.id
        ); //음 어떤 포스트에서 썼고 어떤 유저가 쓴거야?? 를 id를 받아서 찾는다
        //현재 이니셜 스테이트의 list안의 댓글들 중에서 찾는다 받은 댓글의 id와 같은 친구를
        if (idx !== -1) {
          // 만약 그런 댓글이 있다면?? // 지금 댓글 배열에서
          draft.list[action.payload.board_id].splice(idx, 1); //idx위치의 항목 1개를 삭제한다
          // 받은 포스트 아이디 순번의 리스트(댓글 배열에서) 받은 id 를 삭제해준다!
        }
      }),
  },
  initialState
);

const actionCreators = {
  addCommentAPI,
  getCommentAPI,
  deleteCommentAPI,
};

export { actionCreators };
