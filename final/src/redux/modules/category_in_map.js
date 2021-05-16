import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configStore";
import "moment";
import moment from "moment";

const GET_CATEGORY_IN_MAP = "GET_CATEGORY_IN_MAP";
const GET_ALL_CATEGORY_IN_MAP = "GET_ALL_CATEGORY_IN_MAP";

const GET_MYPOST_IN_MAP = "GET_MYPOST_IN_MAP";
const GET_MYLIKE_IN_MAP = "GET_MYLIKE_IN_MAP";

const RESET_MYPOST_IN_MAP = "RESET_MYPOST_IN_MAP";
const RESET_MYLIKE_IN_MAP = "RESET_MYLIKE_IN_MAP";

const getCategoryInMap = createAction(GET_CATEGORY_IN_MAP, (category_in_map) => ({
  category_in_map,     // category_in_map은 입력하는 카테고리명이에요
}));
const getAllCategoryInMap = createAction(GET_ALL_CATEGORY_IN_MAP, (is_category_in_map) => ({
  is_category_in_map,  
}));

const getMyPostInMap = createAction(GET_MYPOST_IN_MAP, (is_category_in_map) => ({
  is_category_in_map,
}));
const getMyLikeInMap = createAction(GET_MYLIKE_IN_MAP, (is_category_in_map) => ({
  is_category_in_map,
}));

const resetMyPostInMap = createAction(RESET_MYPOST_IN_MAP, (is_category_in_map) => ({
  is_category_in_map,
}));
const resetMyLikeInMap = createAction(RESET_MYLIKE_IN_MAP, (is_category_in_map) => ({
  is_category_in_map,
}));


const initialState = {
  // is_category_in_map: [],
  is_category_in_map: ["카페", "야경", "바다", "산", "꽃", "나홀로", "연인", "친구", "반려동물", "도심", "공원", "전시"], // 이제 여기에 각 카테고리를 넣어준다. 요 배열의 길이가 0이면 모두 출력. Map.js에서 사용
};

export default handleActions(
  {
    [GET_CATEGORY_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        // 카테고리 상태에 카테고리 명을 넣어준다
        draft.is_category_in_map.push(action.payload.category_in_map);

        // 다른 카테고리가 들어오면 붙여주고
        draft.is_category_in_map = draft.is_category_in_map.reduce((acc, cur) => {
          if (acc.findIndex((a) => a === cur) === -1) {
            return [...acc, cur];
          } else {
            // 현재 카테고리상태 배열을 모두 for문으로 돌린다
            // 배열안의 값중에 새로들어온 상태값과 같은게 있다면
            // splice를 이용해 같은 번째(i)의 값을 선택해서 삭제한다
            for (let i = 0; i < acc.length; i++) {
              if (acc[i] === cur) {
                acc.splice(i, 1);
                // i--; //배열 1개가 비워지기 때문에 i를 1개 빼준다 이건 사실 안써도 무방
              }
            }

            return acc;
          }
        }, []);
      }),
    
    [GET_ALL_CATEGORY_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category_in_map = ["카페", "야경", "바다", "산", "꽃", "나홀로", "연인", "친구", "반려동물", "도심", "공원", "전시"]; // 전체보기 효과를 위해 이렇게 리셋 해준다.
      }),  
      
    [GET_MYPOST_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category_in_map = ["내꺼"]
      }), 

    [GET_MYLIKE_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category_in_map = ["내좋아요"]
      }), 

    [RESET_MYPOST_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category_in_map = draft.is_category_in_map.filter((r) => {
          if (r !== "내꺼") {
            return [...draft.is_category_in_map, r]
          }
        })
      }),

    [RESET_MYLIKE_IN_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category_in_map = draft.is_category_in_map.filter((r) => {
          if (r !== "내좋아요") {
            return [...draft.is_category_in_map, r]
          }
        })
      }),
  },
  initialState
);

const actionCreators = { 
  getCategoryInMap,
  getAllCategoryInMap,
  getMyPostInMap,
  getMyLikeInMap,
  resetMyPostInMap,
  resetMyLikeInMap,
};

export { actionCreators };
