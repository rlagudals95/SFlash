import React, { useState } from "react";
import styled from "styled-components";
// import throttled from "lodash"; // throttle, debounce 사용
import { actionCreators as categoryActions } from "../redux/modules/category";
import { useDispatch, useSelector } from "react-redux";

const SelectCate = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.select_category);
  // console.log("선택한 카테고리는???", category);

  const scrollRef = React.useRef(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);
  //카테고리 함수들

  const cafe = () => {
    dispatch(categoryActions.selectCategory("카페"));
  };
  const night = () => {
    dispatch(categoryActions.selectCategory("야경"));
  };
  const ocean = () => {
    dispatch(categoryActions.selectCategory("바다"));
  };
  const mountain = () => {
    dispatch(categoryActions.selectCategory("산"));
  };
  const city = () => {
    dispatch(categoryActions.selectCategory("도심"));
  };
  const exhibition = () => {
    dispatch(categoryActions.selectCategory("전시"));
  };
  const park = () => {
    dispatch(categoryActions.selectCategory("공원"));
  };
  const flower = () => {
    dispatch(categoryActions.selectCategory("꽃"));
  };
  const alone = () => {
    dispatch(categoryActions.selectCategory("나홀로"));
  };

  const couple = () => {
    dispatch(categoryActions.selectCategory("연인"));
  };
  const freind = () => {
    dispatch(categoryActions.selectCategory("친구"));
  };
  const pet = () => {
    dispatch(categoryActions.selectCategory("반려동물"));
  };

  return (
    <React.Fragment>
      <HoriznalBtn
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {/*  */}
        {category === "카페" ? (
          <SelectBtn>카페</SelectBtn>
        ) : (
          <Btn onClick={cafe}>카페</Btn>
        )}
        {/*  */}
        {category === "야경" ? (
          <SelectBtn>야경</SelectBtn>
        ) : (
          <Btn onClick={night}>야경</Btn>
        )}
        {/*  */}
        {category === "바다" ? (
          <SelectBtn>바다</SelectBtn>
        ) : (
          <Btn onClick={ocean}>바다</Btn>
        )}
        {/*  */}
        {category === "산" ? (
          <SelectBtn>산</SelectBtn>
        ) : (
          <Btn onClick={mountain}>산</Btn>
        )}
        {/*  */}
        {category === "도심" ? (
          <SelectBtn>도심</SelectBtn>
        ) : (
          <Btn onClick={city}>도심</Btn>
        )}
        {/*  */}
        {category === "전시" ? (
          <SelectBtn>전시</SelectBtn>
        ) : (
          <Btn onClick={exhibition}>전시</Btn>
        )}
        {/*  */}
        {category === "공원" ? (
          <SelectBtn>공원</SelectBtn>
        ) : (
          <Btn onClick={park}>공원</Btn>
        )}
        {/*  */}
        {category === "꽃" ? (
          <SelectBtn>꽃</SelectBtn>
        ) : (
          <Btn onClick={flower}>꽃</Btn>
        )}
        {/*  */}
        {category === "나홀로" ? (
          <SelectBtn>나홀로</SelectBtn>
        ) : (
          <Btn onClick={alone}>나홀로</Btn>
        )}
        {/*  */}
        {category === "연인" ? (
          <SelectBtn>연인</SelectBtn>
        ) : (
          <Btn onClick={couple}>연인</Btn>
        )}
        {/*  */}
        {category === "친구" ? (
          <SelectBtn>친구</SelectBtn>
        ) : (
          <Btn onClick={freind}>친구</Btn>
        )}
        {/*  */}
        {category === "반려동물" ? (
          <SelectBtn>반려동물</SelectBtn>
        ) : (
          <Btn onClick={pet}>반려동물</Btn>
        )}
      </HoriznalBtn>
    </React.Fragment>
  );
};

const HoriznalBtn = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  /* overflow-y: visible; */
  /* width: 550px; */
  /* height: 40px; */
  /* align-items: center;
  text-align: center; */
  width: 100%;

  overflow-x: scroll;
  /* overflow-y: scroll; */
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    height: 100px;
    padding-bottom: 50px;
  }
`;

const Btn = styled.button`
  /* text-align: center; */
  all: unset;
  display: inline-block;
  margin: 5px;
  margin-top: 15px;
  padding: 5px 23px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: none;

  cursor: pointer;
  word-break: keep-all; // 특수문자 띄워쓰기x 띄워쓰기 기준으로 break 줄바꿈 제어
  width: 200px;
  height: 38px;
  color: rgba(0, 0, 0, 0.5);
  /* font-size: 0.8rem; */
  /* overflow-y: visible; */
  /* width: 400000000000px; */
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  @media (max-width: 600px) {
    padding: 0px 15px;
    font-size: 0.8rem;
    height: 1.5rem;
  }
`;

const SelectBtn = styled.div`
  all: unset;
  display: inline-block;
  margin: 3px;
  margin-top: 13px;
  padding: 5px 23px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;
  word-break: keep-all;
  width: 200px;
  height: 38px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  border: 1px solid ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.main_color};
  @media (max-width: 600px) {
    padding: 0px 15px;
    font-size: 0.8rem;
    height: 1.5rem;
  }
`;

export default SelectCate;
