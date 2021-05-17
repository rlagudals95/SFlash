import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

import { getCookie } from "../../shared/Cookie";
import { push } from "react-router-redux";
import { actionCreators as modalActions } from "./mapModal";

const SET_POST = "SET_POST";
const SET_MAP_POST = "SET_MAP_POST";
const ADD_POST = "ADD_POST";
const ADD_MAP_POST = "ADD_MAP_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";
const ADD_LIKE = "ADD_LIKE";
const DIS_LIKE = "DIS_LIKE";
// 검색했을때 검색 결과 게시물만 보여주는 액션
const GET_SEARCH = "GET_SEARCH";
const SEARCH_POST = "SEARCH_POST";
// 맵마커 삭제
const DELETE_MARKER = "DELETE_MARKER";
// 맵마커 수정
const EDIT_MARKER = "EDIT_MARKER";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
})); //paging은 나중에 넣기
const setMapPost = createAction(SET_MAP_POST, (map_post_list) => ({
  map_post_list,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const addMapPost = createAction(ADD_MAP_POST, (map_post) => ({ map_post }));
const editPost = createAction(EDIT_POST, (board_id, post) => ({
  board_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (id) => ({ id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
/////////////////
const add_Like = createAction(ADD_LIKE, (post_id, board) => ({
  post_id,
  board,
}));

const dis_Like = createAction(DIS_LIKE, (post_id, post) => ({
  post_id,
  post,
}));

const getSearch = createAction(GET_SEARCH, (post_list, paging) => ({
  post_list,
  paging,
}));

const search_Post = createAction(SEARCH_POST, (post_list, paging) => ({
  post_list,
  paging,
}));

const deleteMarker = createAction(DELETE_MARKER, (id) => ({ id }));
// 게시글 수정시 마커 이미지(썸네일)도 바로 바꿔주기 위해 만듦
const editMarker = createAction(EDIT_MARKER, (board_id, markerImg) => ({
  board_id,
  markerImg,
}));

const initialState = {
  // list와 map_post_list에 게시물 데이터가 들어간다.
  // 카테고리별 데이터를 담을 배열을 만들 필요는 없고
  // 데이터를 사용하는 컴포넌트에서 필터로 카테고리별 데이터를 만들면 된다.
  list: [], //post_list, total과 같은것?
  map_post_list: [], // 지도상에 뜨는 게시물의 데이터들.
  paging: { start: null, size: 15 },
  is_loading: true, // 페이징 처리할 데이터가 없을때 스피너를 보이지 않게함
  like: false, // 접속유저의 like유무를 파악해 게시물의 하트 모양을 관리함
};

const addPostAPI = (post) => {
  // 지도상에서 게시물을 추가할 때 서버로 데이터 보내는 미들웨어
  return function (dispatch, getState) {
    const user_info = getState().user.user;
    const _file = getState().image2.file;

    if (_file.length == 0) {
      window.alert("😗사진을 최소 1장 이상 업로드 해주세요!");
      return;
    }
    if (_file.length > 5) {
      window.alert("😗사진은 5장까지 업로드 가능합니다");
      return;
    }

    console.log("??????", localStorage.getItem("jwt"));

    console.log("파일들", _file);
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("latitude", post.latitude);
    formData.append("longitude", post.longitude);
    formData.append("spotName", post.spotName);
    formData.append("spotNameForCustomOverlay", post.spotNameForCustomOverlay);
    // 폼데이터 이미지 파일들은 한개 씩 보내기!
    for (let i = 0; i < _file.length; i++) {
      formData.append("file", _file[i]);
      console.log(_file[i]);
    }

    console.log("토큰이 넘어 올까요~?", config.jwt);
    //////////
    const _category = getState().category.select_category; //요기 오타가 있었네요!
    formData.append("category", _category);
    console.log(formData);
    console.log("폼데이터 형식", Array.from(formData));

    axios({
      method: "POST",
      url: `${config.api}/board/`,
      data: formData,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("애드포스트 응답", res);
        console.log(res.data);
        console.log(res.data.data);

        // 게시물 올리면 바로 마커 뜨게 하는 리덕스 작업
        let one_post = res.data.data;
        let one_marker_data = {
          id: one_post.boardId,
          category:  one_post.category,
          spotName1: one_post.spotName.split(" ")[0],
          spotName2: one_post.spotName.split(" ").splice(1).join(" "),
          latitude: one_post.latitude,
          longitude: one_post.longitude,
          imgForOverlay: one_post.boardImgReponseDtoList[0].imgUrl,
        };
        dispatch(addMapPost(one_marker_data));
        
        // 커뮤니티 리덕스에 데이터 추가
        // let CommunityPost = {
        //   id: one_post.boardId,
        //   spotName: one_post.spotName,
        //   img_url: one_post.boardImgReponseDtoList[0],
        //   likeCnt: 0,
        //   like: false,
        // };
        // dispatch(addPost(CommunityPost));
      
        // history.replace("/"); 
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물을 저장하지 못했습니다.");
      });
  };
};

//start = null, size = null //
const getPostAPI = (start = null, size = null) => {
  return function (dispatch, getState) {
    const board_list = getState().post.list;
    console.log("잘가지고 왔겠지", board_list);

    let end_board = // 마지막 포스트의 id를 서버에 넘겨줘서 그 아이디 부터 15개를 받아오는 페이징처리 방법
      board_list.length == 0
        ? 999 // 그러나 처음 화면이 켜졌을땐 마직막 포스트의 id를 받을 수 없다
        : //그러므로 Number.MAX_SAFE_INTEGER(약 9000조)를 써줘서 가장가까운 수의 id를 먼저받고
          board_list[board_list.length - 1].id; // 이제 처음 받은 포스트중 가장 마지막 포스트 id 기준으로 15개씩 게시물을 받아온다

    console.log("마지막 포스트 정보", end_board);

    axios({
      method: "GET",
      url: `${config.api}/board`,
      data: {
        size: 15,
        lastAriticleId: end_board.id, // 처음에는 9000조를 보낸다
      },
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log("!!!!!!!!!", res.data.data);

        // 라이크 값이 자꾸 false로 오니까 리스트를 뽑아보자!
        // let like_list = [];

        // for (let i = 0; i < res.data.data.length; i++) {
        //   like_list.push(res.data.data[i].liked);
        // }

        // console.log("받아오는 라이크 값들", like_list);

        let result = res.data.data.slice(start, size); // 서버에서 받아오는 게시물들을 start와 size를 정해서 나눠준다
        // console.log("페이징 갯수", result.length);
        if (result.length == 0) {
          // result의 수가 0이라는 것은 더이상 받아올 데이터가 없다는 뜻
          dispatch(loading(false));
          return;
        }
        let paging = {
          start: start + result.length + 1,
          size: size + 15,
        };

        console.log("서버 응답값", res);
        let post_list = [];
        // console.log(res.data.data[0].boardImgReponseDtoList);
        result.forEach((_post) => {
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
            writerId: _post.writerId,
          };
          post_list.unshift(post);
        });
        dispatch(setPost(post_list, paging));
        // dispatch(modalActions.modalEdit(post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
  };
};

const getMapPostAPI = () => {
  return function (dispatch, getState) {
    console.log();

    axios({
      method: "GET",
      url: `${config.api}/map`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        // console.log("서버 응답값", res);
        let map_post_list = [];
        console.log("서버 응답값", res.data.data);
        console.log(res.data.data[0].boardImgReponseDtoList);
        res.data.data.forEach((_post) => {
          let post = {
            id: _post.boardId, // 포스트 id
            like: _post.liked,
            writerName: _post.writerName,
            latitude: _post.latitude,
            longitude: _post.longitude,
            spotName1: _post.spotName.split(" ")[0],
            spotName2: _post.spotName.split(" ").splice(1).join(" "),
            category: _post.category,
            imgForOverlay: _post.boardImgReponseDtoList[0].imgUrl,
            // title: _post.title, // 포스트 title
            // content: _post.content, // 포스트 내용
            // likeCount: _post.likeCount,
            // writerImgUrl: _post.writerImgUrl,        
            // spotName: _post.spotName,
            // imgUrl: _post.boardImgReponseDtoList,
            // comment: _post.boardDetailCommentDtoList,
          };
          map_post_list.unshift(post);
        });
        dispatch(setMapPost(map_post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
  };
};

const deletePostAPI = (board_id) => {
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
        dispatch(deletePost(board_id));
      })
      .catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!");
        console.log("게시글 삭제 에러", err);
      });
  };
};

const editPostAPI = (board_id, _edit) => {
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

      let markerImg = post.img_url[0];

      dispatch(editPost(board_id, post));
      dispatch(modalActions.modalEdit(post)); //맵 모달도 바로 수정 반영
      // dispatch(editMarker(board_id, markerImg)); // 맵에서도 수정 바로 반영 이미지만 바꿔줘도 될거같긴한데.. 흠..
      /// 여기서 게시물수정 정보 초기화를 해줘야 모달창을 다시눌러 수정해도 이상한 현상?을 방지해줌
    });
  };
};

// `http://localhost:3000/${encodeURIComponent("한글파라미터")}`;

const searchPostAPI = (search, start = null, size = null) => {
  return function (dispatch, getState) {
    console.log("검색어 들어오냐~?", search);
    axios({
      method: "GET",
      url: `${config.api}/board/search?searchText=${encodeURIComponent(
        search
      )}`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
      .then((res) => {
        console.log("스타트와 사이즈", start, size);
        console.log("검색결과", res.data.data);
        let result = res.data.data.slice(start, size);
        console.log("슬라이스한 데이터", result);
        if (result.length == 0) {
          // result의 수가 0이라는 것은 더이상 받아올 데이터가 없다는 뜻
          dispatch(loading(false));
          return;
        }
        let paging = {
          start: start + result.length + 1,
          size: size + 15,
        };

        let post_list = [];

        result.forEach((p) => {
          let post = {
            id: p.boardId,
            title: p.title,
            content: p.content,
            img_url: p.boardImgReponseDtoList,
            writerName: p.writerName,
            profileImg: p.writerImgUrl,
            like: p.likeCheck,
            category: p.category,
            likeCnt: p.likeCount,
            comment: p.boardDetailCommentDtoList,
          };
          post_list.unshift(post);
        });
        console.log("포스트 리스트 잘나와?", post_list);
        dispatch(getSearch(post_list, paging));
      })
      .catch((error) => {
        window.alert("검색을 할 수 없습니다.");
        console.log(error);
      });
  };
};

const editLikeP = (post_id, post) => {
  //PLUS
  return function (dispatch, getState) {
    console.log("dd", post_id); // 포스트 id 잘온다
    console.log("cc", post); // 포스트도 잘온다

    let _like = post.like;
    let _likeCnt = post.likeCnt;
    console.log(_like, _likeCnt);

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
    };
    console.log("rrr", board);
    dispatch(add_Like(post_id, board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
  };
};

const editLikeD = (post_id, post) => {
  //PLUS
  return function (dispatch, getState) {
    console.log("dd", post_id); // 포스트 id 잘온다
    console.log("cc", post); // 포스트도 잘온다

    let _like = post.like;
    let _likeCnt = post.likeCnt;
    console.log(_like, _likeCnt);

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
    };
    console.log("rrr", board);

    dispatch(add_Like(post_id, board)); //포스트 아이디 그대로 // 내용은 바꾼 보드로!
  };
};

export default handleActions(
  {
    //애드 포스트는 간단하게 새로 받은 포스트를 리스트 맨앞에 삽입
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [ADD_MAP_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.map_post_list.unshift(action.payload.map_post);
        console.log(draft.map_post_list);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list); // 일단 서버에서 받아온거 이니셜 스테이트 리스트에 삽입
        // draft.list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
        //겹치는 게시물 중복 제거 과정
        draft.paging = action.payload.paging;
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur]; //같은 id를 가진 게시물이 없다면 기존 포스트들과 새로받은 포스트 리턴
          } else {
            // 중복되는 id가 있다면? 포스트가 중복되서 출력되는 걸 막아줘야함
            acc[acc.findIndex((a) => a.id === cur.id)] = cur; //기존 리스트에서 새로받은 리스트와 같은 id가 있다면
            return acc; // 그 게시물은 새로 받은 게시물 => 그러므로 cur은 return 안해준다
          }
        }, []);
      }),
    [SET_MAP_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.map_post_list.push(...action.payload.map_post_list); // 일단 서버에서 받아온거 이니셜 스테이트 리스트에 삽입
        // draft.map_post_list = action.payload.map_post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
        //겹치는 게시물 중복 제거 과정
        draft.map_post_list = draft.map_post_list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur]; //같은 id를 가진 게시물이 없다면 기존 포스트들과 새로받은 포스트 리턴
          } else {
            // 중복되는 id가 있다면? 포스트가 중복되서 출력되는 걸 막아줘야함
            acc[acc.findIndex((a) => a.id === cur.id)] = cur; //기존 리스트에서 새로받은 리스트와 같은 id가 있다면
            return acc; // 그 게시물은 새로 받은 게시물 => 그러므로 cur은 return 안해준다
          }
        }, []);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        console.log(action.payload.board_id); //??
        let idx = draft.list.findIndex((p) => p.id == action.payload.board_id);
        // 수정한 게시물을 찾기 위해서 findindex
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [ADD_LIKE]: (
      state,
      action //이것만쓴다
    ) =>
      produce(state, (draft) => {
        //그냥 게시물 정보들 하나 가져와서 갈아준다!
        console.log("ㅁㅇ", action.payload.post_id);
        console.log("ㄹㅇ", action.payload.board);
        // action.payload.post.like = true;
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        // 수정한 게시물을 찾기 위해서 findindex

        draft.list[idx] = { ...draft.list[idx], ...action.payload.board };
      }),

    [DIS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        //그냥 게시물 정보들 하나 가져와서 갈아준다!
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        // 수정한 게시물을 찾기 위해서 findindex
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //서버에선 이미 지워져서 오지만 한번 더 중복검사
            // 현재 리스트에서 받은 포스트 id와 같은게 없다면?
            return [...draft.list, r]; // 그대로 출력
          }
        });
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
        draft.paging = action.payload.paging;
      }),
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.paging = action.payload.paging;
      }),

    [DELETE_MARKER]: (state, action) =>
      produce(state, (draft) => {
        draft.map_post_list = draft.map_post_list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //서버에선 이미 지워져서 오지만 한번 더 중복검사
            // 현재 리스트에서 받은 포스트 id와 같은게 없다면?
            return [...draft.list, r]; // 그대로 출력
          }
        });
      }),
    //게시글 수정시 마커 이미지도 바로 수정하기 위해서 만듦
    [EDIT_MARKER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.markerImg);
        console.log(action.payload.board_id);
        let idx = draft.map_post_list.findIndex(
          (p) => p.id == action.payload.board_id
        );
        // 수정한 게시물을 찾기 위해서 findindex
        draft.map_post_list[idx] = {
          //[idx].imgUrl[0]? == action.payload.markerImg
          ...draft.map_post_list[idx],
          ...action.payload.markerImg,
        };
      }),
  },
  initialState
);

const actionCreators = {
  getPostAPI,
  addPostAPI,
  addPost,
  addMapPost,
  editPost,
  editPostAPI,
  searchPostAPI,
  getMapPostAPI,
  deletePostAPI,
  add_Like, // ㅜ
  dis_Like,
  editLikeP,
  editLikeD,
  deleteMarker,
};

export { actionCreators };
