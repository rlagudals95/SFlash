import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import post_list from "../../components/MockData";
import { getCookie } from "../../shared/Cookie";
import { CgLogOut } from "react-icons/cg";

const SET_POST = "SET_POST";
const SET_MAP_POST = "SET_MAP_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list) => ({ post_list })); //paging은 나중에 넣기
const setMapPost = createAction(SET_MAP_POST, (map_post_list) => ({
  map_post_list,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (id) => ({ id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  // list와 map_post_list에 게시물 데이터가 들어간다.
  // 카테고리별 데이터를 담을 배열을 만들 필요는 없고
  // 데이터를 사용하는 컴포넌트에서 필터로 카테고리별 데이터를 만들면 된다.
  list: [], //post_list, total과 같은것?
  map_post_list: [], // 지도상에 뜨는 게시물의 데이터들.
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
  like: false,
  paging: { state: null, size: 12 },
};

const addPostAPI = (post) => {
  return function (dispatch, getState) {
    const user_info = getState().user.user;
    const _file = getState().image2.file;
    console.log("파일들", _file);
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("latitude", post.latitude);
    formData.append("longitude", post.longitude);
    formData.append("spotName", post.spotName);
    // 폼데이터 이미지 파일들은 한개 씩 보내기!
    for (let i = 0; i < _file.length; i++) {
      formData.append("file", _file[i]);
    }

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
        // console.log(formData);
        // console.log("게시물이 갔다!!", res);
        // console.log(res);
        // console.log(res.data);
        // let data = {

        // }
        // dispatch(add)
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("게시물을 저장하지 못했습니다.");
      });
  };
};

// let result = res.data.slice(start, size);
// if (result.length === 0) {
//   //불러온 게시물이 끝났다면 return;
//   dispatch(loading(false)); // 로딩 중이면 스피너를 보여주게 설정해줘도 되겠구나
//   return;
// }
// console.log(result);
// let paging = {
//   start: start + result.length + 1,
//   size: size + 12,
// };

//start = null, size = null
const getPostAPI = () => {
  return function (dispatch, getState) {
    console.log("여기까진오지??");
    axios({
      method: "GET",
      url: `${config.api}/board`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    }).then((res) => {
      console.log("서버 응답값", res);
      let post_list = [];
      // console.log(res.data.data[0].boardImgReponseDtoList);
      res.data.data.forEach((_post) => {
        let post = {
          id: _post.boardId, // 포스트 id
          title: _post.title, // 포스트 title
          content: _post.content, // 포스트 내용
          // insert_dt: _post.insetDt,
          writerName: _post.writerName,
          img_url: _post.boardImgReponseDtoList,
          category: _post.category,
          profileImg: _post.writerImgUrl,
          like: _post.liked,
          likeCnt: _post.likeCount,
          comment: _post.boardDetailCommentDtoList,
          creatAt: _post.modified,
        };
        post_list.unshift(post);
      });
      dispatch(setPost(post_list));
    });
    // .catch((err) => {
    //   window.alert("게시물을 가져오는데 문제가 있어요!");
    //   console.log("게시물 로드 에러", err);
    // });
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

const editPostAPI = (boadrd_id, post) => {
  return function (dispatch, getState) {
    console.log("잘나와?", post);
    const _file = getState().image2.file;
    console.log("파일가져오기", _file);

    // const _category = getState().category. 이건 민규님이 만들어 주신거에서 가져와야 한다..
    // 그게아니라 post_list 에서  boadrd_id가 같은 post를 찾아서 category를 빼와야한다

    // let idx = post_list.findIndex((p) => p.id == boadrd_id);

    // const category = post_list[idx].category;

    if (!boadrd_id) {
      console.log("게시물이 없습니다!");
      return;
    }

    ////////////////

    // for (let i = 0; i < 10000000; i++) { // 두 배열을 비교하는 반복문
    //   JSON.stringify(a) == JSON.stringify(b);
    // }
    // if (_image == _post.imgUrl) {
    //   axios({
    //     method: "PUT",
    //     url: `${config.api}/board/${boadrd_id}`,
    //     data: {
    //       ..._post,
    //       category: "카페",
    //       spotName: "_post.spotName"??",
    //     },
    //   }).then((res) => {
    //     dispatch(editPost(board_id, post));
    //     console.log(res);
    //   });
    // } else {
    //   axios({
    //     method: "PUT",
    //     url: `${config.api}/board/${boadrd_id}`,
    //     data: {
    //      ..._post,
    //       category: "카페",
    //       file: "_file",
    //       spotName: "주소인가??",
    //     },
    //   }).then((res) => {
    //      let edit_list = {}
    //     dispatch(editPost(board_id , post))

    //  history.replace("/");
    //   });
    // }
  };
};

// const deletePostAPI = () => {
//   return function (dispatch, getState) {
//     axios({
//       method: "DELETE",
//       url: `${config.api}/board/${category}`,
//     })
//       .then((res) => {
//         dispatch(deletePost(id));
//         history.push("/");
//       })
//       .catch((err) => {
//         window.alert("게시글 삭제에 문제가 있습니다!");
//       });
//   };
// };

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
        console.log("서버 응답값", res);
        let map_post_list = [];
        console.log(res.data.data);
        console.log(res.data.data[0].boardImgReponseDtoList);
        res.data.data.forEach((_post) => {
          let post = {
            id: _post.id, // 포스트 id
            title: _post.title, // 포스트 title
            content: _post.content, // 포스트 내용
            // insert_dt: _post.insetDt,
            like: _post.like,
            likeCount: _post.likeCount,
            writerName: _post.writerName,
            writerImgUrl: _post.writerImgUrl,
            latitude: _post.latitude,
            longitude: _post.longitude,
            spotName: _post.spotName,
            category: _post.category,
            imgUrl: _post.boardImgReponseDtoList,
            profileImg: _post.writerImgUrl,
            comment: _post.boardDetailCommentDtoList,
            creatAt: _post.modified,
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

const searchPostAPI = (search) => {
  return function (dispatch, getState) {
    console.log("검색어 들어오냐~?", search);
    axios({
      method: "GET",
      url: `${config.api}/board/search?searchText=${search}`,
    })
      .then((res) => {
        console.log("검색결과", res.data.data);

        let post_list = [];

        res.data.data.forEach((p) => {
          let post = {
            id: p.boardId,
            title: p.title,
            content: p.content,
            img_url: p.boardImgReponseDtoList,
            writerName: p.writerName,
            profileImg: p.writerImgUrl,
            like: p.likeCheck,
            category: null,
            likeCnt: p.likeCount,
            comment: [],
          };
          post_list.unshift(post);
        });
        dispatch(setPost(post_list));
      })
      .catch((error) => {
        window.alert("검색을 할 수 없습니다.");
        console.log(error);
      });
  };
};

export default handleActions(
  {
    //애드 포스트는 간단하게 새로 받은 포스트를 리스트 맨앞에 삽입
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list.push(...action.payload.post_list); // 일단 서버에서 받아온거 이니셜 스테이트 리스트에 삽입
        draft.list = action.payload.post_list;
        // draft.paging = action.payload.paging; // 페이징 처리
        //겹치는 게시물 중복 제거 과정
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
        // draft.list.push(...action.payload.post_list); // 일단 서버에서 받아온거 이니셜 스테이트 리스트에 삽입
        draft.map_post_list = action.payload.map_post_list;
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
  },
  initialState
);

const actionCreators = {
  getPostAPI,
  addPostAPI,
  editPost,
  editPostAPI,
  searchPostAPI,
  getMapPostAPI,
  deletePostAPI,
};

export { actionCreators };
