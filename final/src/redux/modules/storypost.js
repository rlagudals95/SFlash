import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import { config } from "../../shared/config";

const SET_POST = "SET_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list) => ({ post_list })); //paging은 나중에 넣기
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
    list: [], //post_list
    paging: { start: null, next: null, size: 3 },
    is_loading: false,
    like: false,
    paging: { state: null, size: 12 },
  };

  
  const getMyPostAPI = (start = null, size = null) => {
    return function (dispatch, getState) {
      axios({
        method: "GET",
        url: `${config.api}/mypage/myboard`,
        headers: {
          "X-AUTH-TOKEN": `${config.jwt}`,
        }
      }).then((res) => {
        // console.log(res.data.data);
        // let post_list = [];
        // res.data.data.forEach((_post) => {
        //   let user_info = {
        //     nickname : _post.writer,

            
  
        //   },
        //   let post = {

        // }
        // )
        // }      
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
    };
  };

  const getOthersPostAPI = (start = null, size = null) => {
    console.log("확인확인");
    return function (dispatch, getState) {
      axios({
        method: "GET",
        url: `${config.api}/mypage/myboard`,
        headers: {
          "X-AUTH-TOKEN": "jwt",
        }
      }).then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
    };
  };




  export default handleActions(
    {
        [SET_POST]: (state, action) =>
        produce(state, (draft) => {
          draft.list.push(...action.payload.post_list); // 일단 서버에서 받아온거 이니셜 스테이트 리스트에 삽입
          draft.paging = action.payload.paging; // 페이징 처리
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

        [LOADING]: (state, action) =>
        produce(state, (draft) => {
          draft.is_loading = action.payload.is_loading;
        }),
    },
    initialState
  );

  const actionCreators = {
    getMyPostAPI,
    setPost,
    loading
  };
  
  export { actionCreators };