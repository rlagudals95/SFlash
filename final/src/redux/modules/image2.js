import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { actionCreators as PostActions } from "./post";
import { conforms, result } from "lodash";

const SET_PREVIEW = "SET_PREVIEW";
const GET_PREVIEW = "GET_PREVIEW";
const GET_FILE = "GET_FILE";
const DELETE_PREVIEW = "DELETE_PREVIEW";
const DELETE_FILE = "DELETE_FILE";
// 사진 수정 액션들
const GET_EDIT_POST = "GET_EDIT_POST";
const EDIT_POST = "EDIT_POST";

const CHANGE_IMG = "CHANGE_IMG";
/////////
const GET_IMAGE = "GET_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";
const GET_DELETE_ID = "GET_DELETE_ID";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPreview = createAction(GET_PREVIEW, (preview) => ({ preview }));
const getFile = createAction(GET_FILE, (file) => ({ file }));

// const deletePreview = createAction(DELETE_PREVIEW, (preview) => ({ preview }));
// const deleteFile = createAction(DELETE_FILE, (file) => ({ file }));

// 고쳐야할 리스트를 post 에서 가져와서 찾아주는 액션
const getEditPost = createAction(GET_EDIT_POST, (edit) => ({ edit }));
// props의 이미지들을 지워줘야하는데..... 이걸 어디다 저장 해두냐,,?!
const editPost = createAction(EDIT_POST, (edit) => ({ edit }));

const changeImg = createAction(CHANGE_IMG, (edit) => ({ edit }));
/////////////////////////////////
const getImage = createAction(GET_IMAGE, (image) => ({ image }));
// 고쳐야할 포스트의 img_url을 바꿔준다
const deleteImage = createAction(DELETE_IMAGE, (imgUrlId) => ({ imgUrlId }));
// 삭제한 이미지 아이디 저장
const getDeleteId = createAction(GET_DELETE_ID, (id) => ({ id }));

//가져와서 post 에서 리스트 하나 가져와서 edit에 두고
const initialState = {
  preview: ["http://via.placeholder.com/400x300"],
  file: [],
  edit: false, // 잘들어온다 //고쳐야할놈
  image: [], // 이미지를 따로 빼오자 // 이미지 x 클릭시 x 이미지를 제외한 배열이 들어옴
  id: [],
  //이것을 editPost의 img_url로 바꿔주고 setPost 해줘야 한다
};

//요기서 수정해야하는 board를 찾아서 image에 저장해준다 image를 이용해 프리뷰를 뿌려주고 x 버튼으로 수정 해준다
const getPost = (board_id) => {
  return function (dispatch, getState) {
    console.log("hi");
    //여기선 고쳐야할 포스트를 찾아서 edit(draft)로 만들어주자
    const post_list = getState().post.list; // 일단 가져온다

    let idx = post_list.findIndex((p) => p.id === board_id);
    const editPost = post_list[idx]; //고쳐야할 포스트

    //여기서 이미지만 뽑아주면??

    const onlyImg = editPost.img_url;
    // dispatch(getEditPost(editPost));
    dispatch(getImage(onlyImg));
  };
};

//edit을 이미지 url이 변경된 리스트로 바꿔줘야한다! 클릭할때 마다

const ChangeEdit = (Img_idx) => {
  return function (dispatch, getState) {
    const currentPost = getState().image2.edit; // 이미지가 바뀌기 전의 포스트

    const selectImg = currentPost.img_url[Img_idx].imgUrlId; // 요건 선택된 이미지 //선택된 이미지가 제외된 리스트를 만드렁주자

    const c = currentPost.img_url.filter((p) => {
      return selectImg !== p.imgUrlId;
    });

    console.log("??", c);
  };
};
const ChangeImg_Url = (Img_idx) => {
  return function (dispatch, getState) {
    const beforeEditPost = getState().image2.edit;
    const editImage = getState().image2.image;

    console.log("고쳐기 전의 포스트", beforeEditPost);
    console.log("img_url 이걸로 바꾸자", editImage); // 다른게 있다면 splice?

    for (let i = 0; i < beforeEditPost.img_url.length; i++) {
      if (beforeEditPost.img_url[i] !== editImage) {
        beforeEditPost.img_url.splice(i, 1);
        // i--; //배열 1개가 비워지기 때문에 i를 1개 빼준다 이건 사실 안써도 무방
      }
    }

    //여기서 리스트 자체에   editImage를 바꿔서 아래 리듀서에 전달해야한다..
    // dispatch(changeImg(editImage));

    // for (let i = 0; i < beforeEditPost.img_url; i++) {
    //   if (beforeEditPost.img_url[i].imgUrl == editImage[0].imgUrl) {
    //     Fresult.push(beforeEditPost.img_url[i].imgUrl);
    //   }
    // }
    // let Fresult = [];
    // console.log(Fresult);
    // const result = beforeEditPost.img_url.filter((i) => {

    // })
  };
};

//일단 가져와서 찾고 그리고 삭제하는 과정이 따로 있어야 겠다

// const deleteImg = (board_id, imgNum) => {
//   return function (dispatch, getState) {
//     //여기서 삭제된 포스트를 만들어서 post.js의 editPost 액션을 디스패치 해줘야한다

//     //여기서 한번더 갈아줘야하나?? 리듀서를 만들어서

//     // console.log("object");
//     // console.log("삭제하려는 보드", board_id);
//     // console.log("삭제하려는 이미지 번호", imgNum);
//     const post_list = getState().post.list;

//     let idx = post_list.findIndex((p) => p.id === board_id);
//     const editPost = post_list[idx]; //고쳐야할 포스트

//     console.log("고쳐야할 포스트", editPost);
//     console.log("내가 삭제할 이미지??", editPost.img_url[imgNum]);

//     const deleteImg = editPost.img_url[imgNum];
//     let deleteOk = [];
//     for (let i = 0; i < editPost.img_url.length; i++) {
//       if (editPost.img_url[i].imgUrl !== editPost.img_url[imgNum].imgUrl) {
//         deleteOk.push(editPost.img_url[i]);
//       }
//     }

//     if (deleteOk) {
//       console.log("삭제된 배열", deleteOk);
//     } else {
//       console.log("삭제된 배열2", deleteOk);
//     }

//     //여기 까지해서 이미지 삭제? 필터링 완료 여기서 바꾸고자 하는 포스트의 img 배열을 딜리트 ok로 바꾸면된다

//     // if (deleteOk.length >= 0) {
//     //   // editPost.img_url = deleteOk;
//     //   console.log("다 삭제됨", deleteOk);
//     // } else if (deleteOk.length >= 1) {
//     //   editPost.img_url = deleteOk;
//     //   console.log("이미지 삭제된 포스트", editPost);
//     // }

//     // 이제 포스트리스트 안에서
//     // console.log("포스트 리스트 뽑자", post_list);

//     // dispatch(PostActions.editPost(board_id, editPost)); // 보드 id와 바꾸려는 보드가 들어가야함
//     // 여기서 이미지를 뽑아서 받은 이미지와 같으면 삭제
//     // 그리고 dispatch 셋포스트로 다시 게시물 처리!
//   };
// };

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);
        draft.preview = draft.preview.reduce((acc, cur) => {
          if (acc.findIndex((a) => a === cur) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a === cur)] = null;
            return acc;
          }
        }, []);
      }),
    [GET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);

        draft.preview = draft.preview.filter((r) => {
          // 프리뷰 이미지를 걸러내주는 작업
          if (r !== "http://via.placeholder.com/400x300") {
            return [...draft.preview, r];
          }
        });
      }),
    [GET_FILE]: (state, action) =>
      produce(state, (draft) => {
        // draft.file = action.payload.file;
        draft.file.push(action.payload.file);
      }),
    [DELETE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            // console.log(r.id);
            return [...draft.list, r];
          }
        });
      }),
    [DELETE_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            // console.log(r.id);
            return [...draft.list, r];
          }
        });
      }),

    [GET_EDIT_POST]: (state, action) =>
      //여기서 고쳐야할 리스트를 받아온다
      produce(state, (draft) => {
        draft.edit = action.payload.edit;
      }),
    [EDIT_POST]: (state, action) =>
      //위에서 받아온 리스트를 바꾼 리스트로 바꿔준다
      produce(state, (draft) => {
        draft.edit = action.payload.edit;
      }),
    [GET_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
      }),

    [CHANGE_IMG]: (state, action) => {
      produce(state, (draft) => {
        // draft.edit.img_url = action.payload.editImage;
      });
    },
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = draft.image.filter((i, idx) => {
          if (i.imgUrlId !== action.payload.imgUrlId) {
            return [...draft.image, i];
          }
        });
      }),
    [GET_DELETE_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.id.push(action.payload.id);
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  getPreview,
  getFile,
  // deleteImg,
  getPost,
  ChangeEdit,
  deleteImage, //수정중 x 버튼을 누를때 이미지 사라지게 하기
  getDeleteId, //삭제된 이미지 아이디 가져오기
};

export { actionCreators };
