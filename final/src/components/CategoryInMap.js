import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as categoryActionsInMap } from "../redux/modules/category_in_map";
import * as BiIcons from "react-icons/bi";
// import { actionCreators as PostActions } from "../redux/modules/post";

const CategoryInMap = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = localStorage.getItem("nickname");
  
  const is_category_in_map = useSelector((state) => {
    return state.category_in_map.is_category_in_map
  });
  const map_post_list = useSelector((state) => {
    return state.post.map_post_list
  });

  const is_all = is_category_in_map.length === 0  ? true : false;        // 모든 게시물 판단 기준
  const is_mine = map_post_list.writerName === nickname ? true : false;  // 내게시물 판단 기준
  const is_mylike = map_post_list.like === true ? true : false;          // 내가 좋아요 한 게시물 판단 기준.
  console.log(is_all);

  // console.log(is_category);
  // console.log("카테고리 배열길이", is_category.length);

  const [cafe, setCafe] = useState("cafe");
  const [night, setNight] = useState("night");
  const [ocean, setOcean] = useState("ocean");
  const [mountain, setMountain] = useState("mountain");
  const [flower, setFlower] = useState("flower");
  const [alone, setAlone] = useState("alone");
  const [couple, setCouple] = useState("couple");
  const [friend, setFreind] = useState("friend");
  const [pet, setPet] = useState("pet");
  const [exhibition, setExhibition] = useState("exhibition");
  const [city, setCity] = useState("city");
  const [park, setPark] = useState("park");
  const [showMine, setShowMine] = useState(false);
  const [showLike, setShowLike] = useState(false);

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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("카페"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("야경"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("바다"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("산"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("도심"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("전시"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("공원"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("꽃"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("나홀로"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("연인"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
            }}
          >
            #연인
          </Btn>
        )}
        {friend ? (
          <SelectedBtn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFreind(false);
              dispatch(categoryActionsInMap.getCategoryInMap("친구"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
            }}
          >
            #친구
          </SelectedBtn>
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFreind("friend");
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("친구"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
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
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.getCategoryInMap("반려동물"));
              dispatch(categoryActionsInMap.resetMyPostInMap());
              dispatch(categoryActionsInMap.resetMyLikeInMap());
            }}
          >
            #반려동물
          </Btn>
        )}
        <MiddleBox/>

        {/* 전체, 내게시물, 좋아요 게시물 선택박스 */}
        <SpotSelectBox>
          {/* 전체스팟 찾기 */}
          {is_all ? (  // is_category_in_map 리스트안에 아무것도 없다면
            <AllSpotsSelected
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMine(false);
                setShowLike(false);
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
                setShowMine(false);
                setShowLike(false);
                dispatch(categoryActionsInMap.resetCategoryInMap());
              }}
            > 전체스팟
            </AllSpots>
          )}
          {/* 내스팟 찾기 */}
          {showMine ? (
            <MyPostSpotsSelected
              onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMine(false);
              setShowLike(false);
              dispatch(categoryActionsInMap.resetCategoryInMap());
              }}
            > 내스팟  
            </MyPostSpotsSelected>
            ) : (
            <MyPostSpots
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
                setShowMine(true);
                setShowLike(false);
                dispatch(categoryActionsInMap.getMyPostInMap());
              }}
            > 내스팟  
            </MyPostSpots>
            )}
          {/* 내좋아요스팟 찾기 */}
          {showLike ? (
            <MyLikeSpotsSelected
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMine(false);
                setShowLike(false);
                dispatch(categoryActionsInMap.resetCategoryInMap());
              }}
            > 좋아요 스팟
            </MyLikeSpotsSelected>
            ) : (
              <MyLikeSpots
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
                setShowMine(false);
                setShowLike(true);
                dispatch(categoryActionsInMap.getMyLikeInMap());
              }}
            > 좋아요 스팟
            </MyLikeSpots>
            )} 
        </SpotSelectBox>      
      </CategoryBox>
    </React.Fragment>
  );
};

export default CategoryInMap;

const MiddleBox = styled.div`
  height: 35px;
`;

const SpotSelectBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const AllSpotsSelected = styled.button`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const AllSpots = styled.button`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const MyPostSpotsSelected = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const MyPostSpots = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white; 
  border-radius: 5px;
  box-sizing: border-box;
  /* 테두리 갈색 */
  border: 1px solid lightgray;  
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const MyLikeSpotsSelected = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #3897f0;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const MyLikeSpots = styled.div`
  display: flex;
  flex-direction: column;
  width: 55px;
  height: 55px;
  font-size: 10px;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid lightgray;
  cursor: pointer;
  margin: 5px;
  padding: 5px;
  text-align: center;
`;

const CategoryBox = styled.div`
  /* display: flex;
justify-content: space-between; */
  width: 210px;
  /* border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef; */
  padding: 8px 0px;
  position: fixed;
  z-index: 300;
  right: 50px;
  top: 18vh;
  /* bottom: 50vh; */
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
  /* @media (max-width: 1450px) {
    display: none; */
  /* } */
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
