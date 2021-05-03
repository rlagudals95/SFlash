// 필요한 패키지, 함수들 import 해오기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 리덕스 모듈 파일들 import 해오기
import User from "./modules/user";
import Post from "./modules/post";
import Category from "./modules/category";
import Email from "./modules/email";
import Profile from "./modules/profile";
// import Image from "./modules/image";
// import Like from "./modules/like";

// 스토어에 히스토리를 넣어주기
export const history = createBrowserHistory();

// 리덕스 모듈 파일들의 리듀서들을 한데 모아서 통합된 리듀서를 만든다.
const rootReducer = combineReducers({
  user: User,
  post: Post,
  category: Category,
  email: Email,
  profile: Profile,
  // image: Image,
  // like: Like,
  router: connectRouter(history),
});

// 미들웨어 준비하기
// history-thunk 연결
// 스토어에 히스토리를 넣어준다.
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금 환경을 알려줌 : 여기서는 개발환경
const env = process.env.NODE_ENV;

// 개발자도구에서 보이는 redux-logger
// 이거하면 ACTION(ex : SET_POST)에 따라서 일어나는 일을 보여준다
// 개발 상태에서만 보이고, 배포하면 보이지 않는다.
if (env === "development") {
  // const { logger } = require("redux-logger");
  // middlewares.push(logger);
}

// redux devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 미들웨어들을 묶어주기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 미들웨어와 루트리듀서를 엮어서 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

// 스토어를 다른 곳에서 쓸 수 있도록 export 해준다.
// index.js에서 임포트 된다.

export default store();
