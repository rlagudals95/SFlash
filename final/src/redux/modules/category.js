import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { NavigateBeforeRounded } from "@material-ui/icons";

const GET_CATEGORY = "GET_CATEGORY";
const RESET_CATEGORY = "RESET_CATEGORY";

const getCategory = createAction(GET_CATEGORY, (category) => ({
  category,
}));
const resetCategory = createAction(RESET_CATEGORY, (is_category) => ({
  is_category,
}));

const initialState = {
  is_category: [], // 이제 여기에 각자 타입을 다 넣어준다? // 요 배열의 길이가 0이면 모두 출력
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
  },
  initialState
);

const actionCreators = { getCategory, resetCategory };

export { actionCreators };
