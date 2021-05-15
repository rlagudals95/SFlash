import { createAction, handleActions } from "redux-actions";
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

const getModal = createAction(GET_MODAL, (post) => ({ post }));
const getModalId = createAction(GET_MODAL_ID, (id) => ({ id }));
const getModalCommnet = createAction(GET_MODAL_COMMENT, (comment) => ({
  comment,
}));

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
    dispatch(getModalCommnet(ModalComment));
  };
};

// const getModalPostAPI = (id) => {
//   return function (dispatch) {
//     axios({
//       method: "GET",
//       url: `${config.api}/board/${id}`,
//       headers: {
//         "X-AUTH-TOKEN": `${config.jwt}`,
//       },
//     }).then((res) => {
//       console.log(res);

//       let result = res.data.data;

//       let modalData = {
//         id: result.boardId, // 포스트 id
//         title: result.title, // 포스트 title
//         content: result.content, // 포스트 내용
//         writerName: result.writerName,
//         img_url: result.boardImgReponseDtoList,
//         category: result.category,
//         profileImg: result.writerImgUrl,
//         like: result.liked,
//         likeCnt: result.likeCount,
//         comment: result.boardDetailCommentDtoList,
//         creatAt: result.modified,
//         spotName: result.spotName,
//         writerId: result.writerId,
//       };
//       dispatch(getModal(modalData));
//     });
//   };
// };

const initialState = {
  post: null,
  id: null, // Map에서 props로 id를 넘기기 어려워 id값을 따로 모듈에 저장 //id 기준으로 comment를 따로 부르기위해 작성
  //음... 아니면 get요청 해서 받은 모달정보중 id로 comment를 불러 올 수도 있겠다...
  comment: [], //코멘트 어레이
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
    [GET_MODAL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment = action.payload.comment;
      }),
  },
  initialState
);

const actionCreators = {
  getModalPost,
  getModalId,
};

export { actionCreators };
