import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";
// import { history } from "../configStore";
import "moment";
import moment from "moment";
// import { config } from "../../shared/config";
// import { NavigateBeforeRounded } from "@material-ui/icons";

const GET_CATEGORY = "GET_CATEGORY";
const RESET_CATEGORY = "RESET_CATEGORY";
const SELECT_CATEGORY = "SELECT_CATEGORY";

//카테고리를 선택할때 마다 is_category 배열에 하나씩 카테고리를 넣어줌
//이미 선택된 카테고리를 누를 시에 중복된 상태값이 들어오면 지워지도록 아래 리듀서에서 설정
const getCategory = createAction(GET_CATEGORY, (category) => ({
  category,
}));
// # 전체를 눌렀을 때 카테고리 상태값을 모두 지워줘 is_category.length가 0이 되면서 전체 게시물이 보여짐
const resetCategory = createAction(RESET_CATEGORY, (is_category) => ({
  is_category,
}));
const selectCategory = createAction(SELECT_CATEGORY, (select_category) => ({
  select_category,
}));

const initialState = {
  is_category: [], // 이제 여기에 각 카테고리를 넣어준다. 요 배열의 길이가 0이면 모두 출력. Map.js에서 사용
  select_category: null, // 게시글 작성때 쓰일 state, 하나씩만 선택가능. UpLoadModal에서 사용.
};

export default handleActions(
  {
    [GET_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        // 카테고리 상태에 카테고리 명을 넣어준다
        draft.is_category.push(action.payload.category);

        // 다른 카테고리가 들어오면 붙여주고
        draft.is_category = draft.is_category.reduce((acc, cur) => {
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
    [RESET_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.is_category = []; // 전체보기 효과를 위해 이렇게 리셋 해준다
      }),
    [SELECT_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.select_category = action.payload.select_category;
      }),
  },

  initialState
);

const actionCreators = { getCategory, resetCategory, selectCategory };

export { actionCreators };
