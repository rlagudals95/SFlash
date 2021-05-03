import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as categoryActions } from "../redux/modules/category";
import * as BiIcons from "react-icons/bi";
// import { actionCreators as PostActions } from "../redux/modules/post";
const Category = () => {
  const dispatch = useDispatch();

  const is_category = useSelector((state) => state.category.is_category); //이걸 가져와서 이제 눌린상탠지 안눌린 상탠지 판단

  // console.log(is_category);
  // console.log("카테고리 배열길이", is_category.length);

  const [cafe, setCafe] = useState();
  const [night, setNight] = useState();
  const [ocean, setOcean] = useState();
  const [mountain, setMountain] = useState();
  const [flower, setFlower] = useState();
  const [alone, setAlone] = useState();
  const [couple, setCouple] = useState();
  const [freind, setFreind] = useState();
  const [pet, setPet] = useState();
  const [exhibition, setExhibition] = useState();
  const [city, setCity] = useState();
  const [park, setPark] = useState();

  React.useEffect(() => {}, []);

  return (
    // 해당 카테고리 클릭시 넘어온 포스트 중에서 카테고리가 일치한 것만 return 해줘야한다!
    // 한가지 방법은 카테고리마다 페이지를 만들어서 클릭시 다른 페이지 렌더링
    // 다른 방법은 PostList페이지에서 map을 돌리는 조건을 is_cafe? 로 돌리고 p.category가 cafe인것만 출력되게 돌림

    //// 여기선 카테고리를 눌렀을 때 category 모듈에 is_category 안에 상태값이 들어 가도록 설계해야한다
    <React.Fragment>
      <CategoryBox>
        {/*  */}
        {/* 전체보기 버튼 */}
        <CategoryInfo>
          <CateGoryTitle>
            <CategoryIcon>
              {" "}
              <BiIcons.BiBookBookmark size="25px" />
            </CategoryIcon>
            카테고리
          </CateGoryTitle>
        </CategoryInfo>
        {is_category.length == 0 ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(categoryActions.resetCategory());
              //여기서 모든 스테이트 false로 바꿔주는 작업도 해줘야한다
            }}
          >
            #전체
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCafe(false);
              setNight(false);
              setOcean(false);
              setMountain(false);
              setFlower(false);
              setAlone(false);
              setCouple(false);
              setFreind(false);
              setPet(false);
              setExhibition(false);
              setCity(false);
              setPark(false);
              dispatch(categoryActions.resetCategory()); //카테고리 상태 배열을 0으로 만듦
              // window.location.reload();
              //여기서 모든 스테이트 false로 바꿔주는 작업도 해줘야한다
            }}
          >
            #전체
          </Btn>
        )}
        {/* 카페 */}
        {cafe ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCafe(false);
              dispatch(categoryActions.getCategory("카페")); // 혹시라고 구현이 힘들땐 그냥 이값을 is_cafe말고 cafe로 보내고 포스트 리스트에서 카테고리가 cafe인 것을 필터해주자
            }}
          >
            #카페
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCafe("cafe");
              dispatch(categoryActions.getCategory("카페"));
            }}
          >
            #카페
          </Btn>
        )}
        {/* 야경 */}
        {night ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setNight(false);
              dispatch(categoryActions.getCategory("야경"));
            }}
          >
            #야경
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setNight("night");
              dispatch(categoryActions.getCategory("야경"));
            }}
          >
            #야경
          </Btn>
        )}{" "}
        {/* 바다 */}
        {ocean ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOcean(false);
              dispatch(categoryActions.getCategory("바다"));
            }}
          >
            #바다
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOcean("night");
              dispatch(categoryActions.getCategory("바다"));
            }}
          >
            #바다
          </Btn>
        )}
        {/* 산 */}
        {mountain ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMountain(false);
              dispatch(categoryActions.getCategory("산"));
            }}
          >
            #산
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMountain("mountain");
              dispatch(categoryActions.getCategory("산"));
            }}
          >
            #산
          </Btn>
        )}
        {/* 도심 */}
        {city ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCity(false);
              dispatch(categoryActions.getCategory("도심"));
            }}
          >
            #도심
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCity("city");
              dispatch(categoryActions.getCategory("도심"));
            }}
          >
            #도심
          </Btn>
        )}
        {/* 전시 */}
        {exhibition ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExhibition(false);
              dispatch(categoryActions.getCategory("전시"));
            }}
          >
            #전시
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExhibition("exhibitiom");
              dispatch(categoryActions.getCategory("전시"));
            }}
          >
            #전시
          </Btn>
        )}
        {/* 공원 */}
        {park ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPark(false);
              dispatch(categoryActions.getCategory("공원"));
            }}
          >
            #공원
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPark("park");
              dispatch(categoryActions.getCategory("공원"));
            }}
          >
            #공원
          </Btn>
        )}
        {/* 꽃 */}
        {flower ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFlower(false);
              dispatch(categoryActions.getCategory("꽃"));
            }}
          >
            #꽃
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFlower("flower");
              dispatch(categoryActions.getCategory("꽃"));
            }}
          >
            #꽃
          </Btn>
        )}
        {/* 나홀로 */}
        {alone ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAlone(false);
              dispatch(categoryActions.getCategory("나홀로"));
            }}
          >
            #나홀로
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAlone("alone");
              dispatch(categoryActions.getCategory("나홀로"));
            }}
          >
            #나홀로
          </Btn>
        )}
        {couple ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCouple(false);
              dispatch(categoryActions.getCategory("연인"));
            }}
          >
            #연인
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCouple("couple");
              dispatch(categoryActions.getCategory("연인"));
            }}
          >
            #연인
          </Btn>
        )}
        {freind ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFreind(false);
              dispatch(categoryActions.getCategory("친구"));
            }}
          >
            #친구
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFreind("freind");
              dispatch(categoryActions.getCategory("친구"));
            }}
          >
            #친구
          </Btn>
        )}
        {pet ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPet(false);
              dispatch(categoryActions.getCategory("반려동물"));
            }}
          >
            #반려동물
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPet("pet");
              dispatch(categoryActions.getCategory("반려동물"));
            }}
          >
            #반려동물
          </Btn>
        )}
      </CategoryBox>
    </React.Fragment>
  );
};

export default Category;

const CategoryBox = styled.div`
  /* display: flex;
justify-content: space-between; */
  width: 170px;
  /* border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef; */
  padding: 8px 0px;
  position: fixed;
  z-index: 300;
  right: 50px;
  bottom: 50vh;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 1450px) {
    // 1450밑으로 넓이가 내려가면
    z-index: 5000;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    justify-content: space-around;
    flex-direction: row;
    background-color: transparent;
    box-shadow: none;
    padding: 0px 4px;
    padding-top: -50px;
    padding-bottom: 10px;
  }
  /* height: 100px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: lightgrey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  } */
`;
const CategoryInfo = styled.div`
  display: flex;
  margin-bottom: 11px;
  /* border-bottom: 1px solid lightgray; */
`;

const CateGoryTitle = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  width: 100%;
  font-size: 17px;

  padding-bottom: 7px;
  @media (max-width: 1450px) {
    display: none;
  }
`;

const CategoryIcon = styled.div`
  margin-right: 12px;
`;

const Btn = styled.button`
  margin: 3px;
  padding: 3px 7px;
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
const SelectedBtn = styled.button`
  // 선택 됐을때 버튼
  margin: 2px;
  padding: 3px 7px;
  /* background-color: #3897f0; */
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  color: #3897f0;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
`;
