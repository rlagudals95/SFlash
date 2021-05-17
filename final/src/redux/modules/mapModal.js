import { createAction, createActions, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

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

const getModalPost = (id) => {
  return function (dispatch, getState) {
    const post_list = getState().post.map_post_list;
    console.log("가와~~", post_list);

    const idx = post_list.findIndex((p) => {
      if (p.id === id) {
        return p;
      }
    });

    const ModalPost = post_list[idx];
    console.log("찾았다!", ModalPost);
    //////////////////
    const ModalComment = ModalPost.comment;

    console.log("코멘트!", ModalComment);

    dispatch(getModal(ModalPost));
    dispatch(getModalComment(ModalComment));
  };
};

//모달 데이터를 다 가지고 와서 initialState의 post 에저장

const getModalPostAPI = (boardId) => {
  return function (dispatch) {
    console.log("실행되나요 모달 데이터 겟");
    axios({
      method: "GET",
      url: `${config.api}/board/${boardId}/detail`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log("모달정보 가져오자!!!!", res);

        let result = res.data.data;
        console.log("정리된거 맞지?", result, boardId);
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
          spotName: result.spotName,
          writerId: result.userId,
        };
        let comment_list = post.comment;
        console.log("게시물 요거", post);
        console.log("댓글요거", comment_list);

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
    console.log("댓글와유?", comment);
    console.log("아이디와유?", board_id);
    console.log(config.jwt);

    axios({
      url: `${config.api}/board/${board_id}/comment`,
      method: "POST",
      data: { content: comment },
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res);

        const comment_data = res.data.data;
        console.log("댓글정보", comment_data);
        let comment_list = {
          commentId: comment_data.commentId,
          content: comment_data.content,
          modified: comment_data.modified, //이거좀 고치자! 현준님이 id랑 날짜주면 !
          userId: comment_data.userId,
          writerImgUrl: comment_data.userImgUrl,
          writerName: comment_data.nickName,
        };

        console.log("댓글추가반응", res);
        dispatch(modalAddComment(comment_list));
        // dispatch(getComment(board_id)); //이래 해줘도 되나?
        // dispatch(postActions.addComment(comment, board_id));
        // dispatch(postActions.setPost());
      })
      .catch((err) => {
        console.log(err);
        window.alert("댓글 작성에 문제가 있어요!");
      });
  };
};

const modalDeleteCommentAPI = (id) => {
  //이 아이디는 코멘트 id
  console.log("댓글 id", id);
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/board/comment/${id}`, //서버에서 지우고
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        // dispatch(deleteComment(id, board_id)); //바로 렌더링 시켜줘야 삭제 눌렀을때 반영된다
        dispatch(modalDeleteComment(id));
      })
      .catch((err) => {
        window.alert("댓글 삭제에 문제가 있어요!");
      });
  };
};

/////////////////////////// 좋아요
const modalAddLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    const paging = getState().post.paging;
    // console.log("보드아이디", board_id);
    console.log("보드", board);

    console.log("토큰있나요??", localStorage.getItem("jwt"));
    axios({
      method: "POST",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("좋아요 완료!", res);
        dispatch(editLikeP(board)); // 리덕스
      })
      .catch((error) => {
        window.alert("좋아요를 할 수 없습니다.");
      });
  };
};

const modalDisLikeAPI = (board_id, board) => {
  return function (dispatch, getState, { history }) {
    // console.log("보드아이디", board_id);
    console.log("보드", board);

    axios({
      method: "DELETE",
      url: `${config.api}/board/${board_id}/like`,
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("좋아요 취소!", res);
        dispatch(editLikeD(board));
        // console.log(res);
        // dispatch(disLike(false));
        // dispatch(getLike(false));
      })
      .catch((error) => {
        // window.alert("좋아요를 할 수 없습니다.");
      });
  };
};

const editLikeP = (post) => {
  //PLUS
  return function (dispatch, getState) {
    // console.log("dd", post_id); // 포스트 id 잘온다
    console.log("cc", post); // 포스트도 잘온다

    let _like = post.like;
    let _likeCnt = post.likeCnt;
    console.log(_like, _likeCnt);

    let board = {
      id: post.id,
      title: post.title,
      content: post.content,
      writerName: post.writerName,
      // category: post.category,
      profileImg: post.profileImg,
      like: true,
      likeCnt: post.likeCnt + 1,
      comment: post.comment,
      img_url: post.img_url,
      creatAt: post.creatAt,
      writerId: post.writerId,
    };
    console.log("rrr", board);
    dispatch(modalAddLike(board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
  };
};

const editLikeD = (post) => {
  //PLUS
  return function (dispatch, getState) {
    // console.log("dd", post_id); // 포스트 id 잘온다
    console.log("cc", post); // 포스트도 잘온다

    let _like = post.like;
    let _likeCnt = post.likeCnt;
    console.log(_like, _likeCnt);

    let board = {
      // category: post.category,
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
    };
    console.log("rrr", board);

    dispatch(modalDisLike(board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
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
        console.log("액션 페이로드!", action.payload.post);
        draft.post = action.payload.post;
      }),
    [GET_MODAL_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.id;
      }),
    /// 댓글 부분 모듈
    [GET_MODAL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log("왜안와?", action.payload.comment_list);
        draft.comment = action.payload.comment_list;
      }),
    [MODAL_ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment.unshift(action.payload.comment_list);
      }),

    [MODAL_DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //비교해서 제외
        console.log("삭제댓글 아이디", action.payload.id);
        draft.comment = draft.comment.filter((c, idx) => {
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
};

export { actionCreators };
