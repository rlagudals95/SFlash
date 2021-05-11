import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as categoryActionsInMap } from "../redux/modules/category_in_map";
import * as BiIcons from "react-icons/bi";
// import { actionCreators as PostActions } from "../redux/modules/post";
const Category = () => {
  const dispatch = useDispatch();

  const is_category_in_map = useSelector((state) => state.category_in_map.is_category_in_map); //이걸 가져와서 이제 눌린상탠지 안눌린 상탠지 판단

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
        {/* 카페 */}
        {cafe ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCafe(false);
              dispatch(categoryActionsInMap.getCategoryInMap("카페")); // 혹시라도 구현이 힘들땐 그냥 이값을 is_cafe말고 cafe로 보내고 포스트 리스트에서 카테고리가 cafe인 것을 필터해주자
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
              dispatch(categoryActionsInMap.getCategoryInMap("카페"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("야경"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("야경"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("바다"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("바다"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("산"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("산"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("도심"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("도심"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("전시"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("전시"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("공원"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("공원"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("꽃"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("꽃"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("나홀로"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("나홀로"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("연인"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("연인"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("친구"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("친구"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("반려동물"));
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
              dispatch(categoryActionsInMap.getCategoryInMap("반려동물"));
            }}
          >
            #반려동물
          </Btn>
        )}
        <MiddleBox/>
        {/* 전체, 내게시물, 좋아요 게시물 선택박스 */}
        <SpotSelectBox>
          {/* 전체스팟 */}
          {is_category_in_map.length == 0 ? (
            <AllSpotsSelected
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(categoryActionsInMap.resetCategoryInMap());
              }}
            >
              전체스팟
            </AllSpotsSelected>
          ) :  (
            <AllSpots
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
                dispatch(categoryActionsInMap.resetCategoryInMap());
              }}
            >
              전체스팟
            </AllSpots>
          )}
          {/* 내스팟 */}
          {/* {is_login && ( 
          
            <MySpotsSelected
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCafe(false);
                dispatch(categoryActionsInMap.getCategoryInMap("카페")); // 혹시라도 구현이 힘들땐 그냥 이값을 is_cafe말고 cafe로 보내고 포스트 리스트에서 카테고리가 cafe인 것을 필터해주자
              }}
            >
              내스팟  

            </MySpotsSelected>
            
            :)} */}
          <MySpots>내 스팟</MySpots>
          <MyLikeSpots>좋아요 스팟</MyLikeSpots>
        </SpotSelectBox>      
      </CategoryBox>
    </React.Fragment>
  );
};

export default Category;

const MiddleBox = styled.div`
  height: 25px;
`

const SpotSelectBox = styled.div`
  display: flex;
  justify-content: space-evenly;

`;

const AllSpotsSelected = styled.button`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
`;

const AllSpots = styled.button`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid lightgray;
`;

const MySpotsSelected = styled.div`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
`;

const MySpots = styled.div`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid lightgray;
`;

const MyLikeSpotsSelected = styled.div`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
`;

const MyLikeSpots = styled.div`
  width: 55px;
  height: 55px;
  font-size: 15px;
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid lightgray;
`;

const CategoryBox = styled.div`
  /* display: flex;
justify-content: space-between; */
  width: 180px;
  /* border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef; */
  padding: 8px 0px;
  position: fixed;
  z-index: 300;
  right: 50px;
  bottom: 55vh;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  @media (max-width: 400px) {
    /* 1450밑으로 넓이가 내려가면 */
    z-index: 300;
    position: fixed;
    margin: auto;
    width: 50%;
    left: 15vw;
    /* width: 100%;
    left: 0;
    bottom: 0;
    justify-content: space-around;
    flex-direction: row;
    background-color: transparent;
    box-shadow: none;
    padding: 0px 4px;
    padding-top: -50px;
    padding-bottom: 10px; */
  }
  /* @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    z-index: 901;
    width: 100%;
    position: fixed;
    left: 0;
    top: 140px;
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
  padding: 5px 9px;
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
`;
const SelectedBtn = styled.button`
  // 선택 됐을때 버튼
  margin: 2px;
  padding: 5px 9px;
  /* background-color: #3897f0; */
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  color: #3897f0;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
`;
