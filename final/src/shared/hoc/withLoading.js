import React from "react";
import Spinner from "../Spinner.js";

export default function withLoading(WrappedComponent) {
  return function withLoading({ is_loading, ...props }) {
    if (is_loading) {
      return <Spinner />;
    }
    return <WrappedComponent {...props} />;
  };
}

// import React from 'react';
// import Spinner from '../Spinner.js'

// export default function withLoading(
// WrappedComponent,
// msg = "로딩 중...",
// ) {
//     return function withLoading({ is_loading, ...props }){
//         if(is_loading) {
//             return msg;
//         }
//         return <WrappedComponent {...props} />
//     }
// }

// 사옹방법 : 로딩 스피너가 필요한 부분에 해당 파일을 import 시키고 필요한 부분에 is_loading을 props로 넣어준다.


