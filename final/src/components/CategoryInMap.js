import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as categoryActionsInMap } from "../redux/modules/category_in_map";
import * as BiIcons from "react-icons/bi";
import AllBtn from "../shared/images/spotIcons/_01_AllSpotsBtn.png"
import AllMyPostBtn from "../shared/images/spotIcons/_02_AllMyPostsBtn.png"
import AllMyLikeBtn from "../shared/images/spotIcons/_03_AllMyLikesBtn.png"
import Swal from "sweetalert2"; 

const CategoryInMap = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = localStorage.getItem("nickname");

  const is_category_in_map = useSelector((state) => {
    return state.category_in_map.is_category_in_map;
  });
  const map_post_list = useSelector((state) => {
    return state.post.map_post_list;
  });

  const is_all = is_category_in_map.length === 12 ? true : false; // 모든 게시물 판단 기준
  console.log("is_category_in_map의 길이: " + is_category_in_map.length);
  const is_mine = map_post_list.writerName === nickname ? true : false; // 내게시물 판단 기준
  const is_mylike = map_post_list.like === true ? true : false; // 내가 좋아요 한 게시물 판단 기준.
  console.log(is_all);

  // console.log(is_category);
  // console.log("카테고리 배열길이", is_category.length);
  const [allCategory, setAllCategory] = useState(true);
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

  if (!is_login) { // 로그인을 하지 않았다면?
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
              {/* <CategoryIcon>
                {" "}
                <BiIcons.BiBookBookmark size="25px" />
              </CategoryIcon> */}
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
          <MiddleBox />
          {/* 전체, 내게시물, 좋아요 게시물 선택박스 */}
          <SpotSelectBox>
            {/* 전체스팟 찾기 */}
            {is_all ? ( // is_category_in_map 리스트 안에 모든 카테고리가 다 들어 있다면
              <Spots
                src={AllBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMine(false);
                  setShowLike(false);
                }}
              />
            ) : (
              <Spots
                src={AllBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCafe(true);
                  setNight(true);
                  setOcean(true);
                  setMountain(true);
                  setFlower(true);
                  setAlone(true);
                  setCouple(true);
                  setFreind(true);
                  setPet(true);
                  setExhibition(true);
                  setCity(true);
                  setPark(true);
                  setShowMine(false);
                  setShowLike(false);
                  dispatch(
                    categoryActionsInMap.getAllCategoryInMap(is_category_in_map)
                  );
                  dispatch(categoryActionsInMap.resetMyPostInMap());
                  dispatch(categoryActionsInMap.resetMyLikeInMap());
                }}
              />
            )}
            {/* 내스팟 찾기 */}
              <Spots
                src={AllMyPostBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  Swal.fire({
                    title: "내 스팟게시물을 작성하려면?",
                    html: "로그인을 하면 지도에서 원하는 위치를 클릭해서 <br>자신의 게시물을 작성할 수 있어요! ✨",
                    confirmButtonText: "로그인",
                    confirmButtonColor: "#ffb719",
                    imageUrl: 'https://i.postimg.cc/3JbxN2wp/2x.png',
                    showCancelButton: true,
                    cancelButtonText: "나중에 할래요",
                    cancelButtonColor: "#eee"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push("/login");
                    }
                  })
                }}
              />
            {/* 내좋아요스팟 찾기 */}
              <Spots
                src={AllMyLikeBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  Swal.fire({
                    title: "좋아요한 스팟을 보려면?",
                    html: "로그인을 하고 이 버튼을 클릭하면 <br>자신이 좋아요한 게시물만 모아서 볼 수 있어요 😍",
                    confirmButtonText: "로그인",
                    confirmButtonColor: "#ffb719",
                    imageUrl: 'https://i.postimg.cc/50QwmKJJ/2x.png',
                    showCancelButton: true,
                    cancelButtonText: "나중에 할래요",
                    cancelButtonColor: "#eee"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      history.push("/login");
                    }
                  })
                }}
              />
          </SpotSelectBox>
        </CategoryBox>
      </React.Fragment>
    );
  } else { // 로그인 한 조건에서 내스팟 내좋아요 버튼을 누르면 sweetalert창 대신 마커가 찍힌다
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
              {/* <CategoryIcon>
                {" "}
                <BiIcons.BiBookBookmark size="25px" />
              </CategoryIcon> */}
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
          <MiddleBox />
          {/* 전체, 내게시물, 좋아요 게시물 선택박스 */}
          <SpotSelectBox>
            {/* 전체스팟 찾기 */}
            {is_all ? ( // is_category_in_map 리스트 안에 모든 카테고리가 다 들어 있다면
              <Spots
                src={AllBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMine(false);
                  setShowLike(false);
                }}
              />
            ) : (
              <Spots
                src={AllBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCafe(true);
                  setNight(true);
                  setOcean(true);
                  setMountain(true);
                  setFlower(true);
                  setAlone(true);
                  setCouple(true);
                  setFreind(true);
                  setPet(true);
                  setExhibition(true);
                  setCity(true);
                  setPark(true);
                  setShowMine(false);
                  setShowLike(false);
                  dispatch(
                    categoryActionsInMap.getAllCategoryInMap(is_category_in_map)
                  );
                  dispatch(categoryActionsInMap.resetMyPostInMap());
                  dispatch(categoryActionsInMap.resetMyLikeInMap());
                }}
              />
            )}
            {/* 내스팟 찾기 */}
            {showMine ? (
              <Spots
                src={AllMyPostBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowLike(false);
                }}
              />
            ) : (
              <Spots
                src={AllMyPostBtn}
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
              />
            )}
            {/* 내좋아요스팟 찾기 */}
            {showLike ? (
              <Spots
                src={AllMyLikeBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMine(false);
                }}
              />
            ) : (
              <Spots
                src={AllMyLikeBtn}
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
              />
            )}
          </SpotSelectBox>
        </CategoryBox>
      </React.Fragment>
    );
  }
};

export default CategoryInMap;

// 카테고리 박스 정보
const CategoryBox = styled.div`
  width: 240px;
  /* width: 330px; */
  padding: 8px 0px;
  position: fixed;
  z-index: 300;
  right: 50px;
  top: 19vh;
  background-color: #F2F3F7;
  /* background-color: red; */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  @media (max-width: 1400px) {
    z-index: 300;
    margin: auto;
  }
  @media (max-width: 600px) {
    z-index: 300;
    margin: auto;
  }
  @media (max-width: 400px) {
    z-index: 300;
    margin: auto;
    right: 13vw;
  }
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
  font-weight: bold;
  padding-bottom: 7px;
  opacity: 0.6;
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
  /* 선택 됐을때 버튼 */
  margin: 3px;
  padding: 5px 9px;
  /* background-color: #3897f0; */
  background-color: white;
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid #ffb719;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  color: #ffb719;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
`;

const MiddleBox = styled.div`
  height: 38px;
  background-color: #F2F3F7;
  /* background-color: #00ff00 */
`;

const SpotSelectBox = styled.div`
position:relative;
  width: 240px;
  display: flex;
  justify-content: space-between;
  background-color: #F2F3F7;
  /* background-color: red; */
`;

const Spots = styled.img`
  width: 68px;
  height: 68px;
  background-color: #F2F3F7;
  border-radius: 5px;
  background-size: cover;
  object-fit: cover;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 8px;
  box-shadow: 3px 3px 5px 1px rgba(0.1, 0.2, 0.2, 0.2);
  /* box-shadow: 4px 4px 5px 1px rgba(0.2, 0.2, 0.2, 0.2); */
`;

const AllSpots = styled.img`
position:absolute;
  width: 80px;
  height: 80px;
  /* background-image: url('https://i.postimg.cc/q7Qcs4JC/button-01.png'); */
  /* background-size: cover; */
  /* background-color: #F2F3F7; */
  background-color: #ff8000;
  box-sizing: border-box;
  cursor: pointer;
  /* padding: 4px; */
  object-fit: cover;
`;

const MyPostSpots = styled.img`
position:absolute;
  width: 100px;
  height: 100px;
  /* background-image: url('https://i.postimg.cc/dDMGs0Bg/button-02.png'); */
  background-size: cover;
  /* background-color: #F2F3F7; */
  background-color: #0000a0;
  box-sizing: border-box;
  cursor: pointer;
  object-fit: cover;
  margin: auto;
`;

const MyLikeSpots = styled.img`
position:absolute;
  width: 100px;
  height: 100px;
  /* background-image: url('https://i.postimg.cc/wv7W37XB/button-03.png'); */
  background-size: cover;
  /* background-color: #F2F3F7; */
  background-color: #ff0080;
  box-sizing: border-box;
  cursor: pointer;
  object-fit: cover;
`;

const AllSpotsSelected = styled.img`
  width: 100px;
  height: 100px;
  /* width: 108px;
  height: 108px; */
  /* background-color: white; */
  background-color: #F2F3F7;
  border-radius: 5px;
  box-sizing: border-box;
  /* border: 3px solid rgb(255, 183, 25); */
  cursor: pointer;
  /* margin: 1px; */
  /* background-size: cover; */
  /* box-shadow: 4px 4px 5px 1px rgba(0.2, 0.2, 0.2, 0.2); */
`;

const MyPostSpotsSelected = styled.img`
  width: 85px;
  height: 85px;
  /* width: 108px;
  height: 108px; */
  /* background-color: white; */
  background-color: #F2F3F7;
  border-radius: 5px;
  box-sizing: border-box;
  /* border: 3px solid rgb(27, 38, 133); */
  cursor: pointer;
  /* margin: 1px; */
  /* background-size: cover; */
  /* box-shadow: 4px 4px 5px 1px rgba(0.2, 0.2, 0.2, 0.2); */
`;

const MyLikeSpotsSelected = styled.img`
  width: 85px;
  height: 85px;
  /* width: 108px;
  height: 108px; */
  /* background-color: white; */
  background-color: #F2F3F7;
  border-radius: 5px;
  box-sizing: border-box;
  /* border: 3px solid rgb(253, 133, 152); */
  cursor: pointer;
  /* margin: 1px; */
  /* background-size: cover; */
  /* box-shadow: 4px 4px 5px 1px rgba(0.2, 0.2, 0.2, 0.2); */
`;

const MyLikeSpotstest = styled.div`
  width: 90px;
  height: 90px;
  background-image: url('https://i.postimg.cc/wv7W37XB/button-03.png');
  /* width: 108px;
  height: 108px; */
  /* background-color: white; */
  background-color: #F2F3F7;
  /* border-radius: 5px; */
  box-sizing: border-box;
  /* border: none; */
  cursor: pointer;
  padding: 2px;
  /* background-size: cover; */
  /* box-shadow: 4px 4px 5px 1px rgba(0.2, 0.2, 0.2, 0.2); */
`;