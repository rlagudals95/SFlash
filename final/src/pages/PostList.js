import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

// 컴포넌트 파일들 임포트해오기
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/SideNav";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import LogBtn from "../components/LogBtn";
import Post2 from "../components/Post2";
import Category from "../components/Category";
import Input2 from "../elements/Input2";
import Modal from "../components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";

import "../Css/Modal.css";
import modal from "../redux/modules/modal";
import post_list from "../components/MockData";
import category from "../redux/modules/category";
import UploadModal from "../components/UpLoadModal";
import MobileCate from "../components/mobile/MobileCate";
import MobileSelect from "../components/mobile/MobileSelect";
import MobileNav from "../components/mobile/MobileNav";
import { actionCreators as PostActions } from "../redux/modules/post";

const PostList = () => {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(PostActions.getPostAPI());
  // }, []);

  const is_category = useSelector((state) => state.category.is_category);
  const paging = useSelector((state) => state.post.paging);
  const loading = useSelector((state) => state.post.is_loading);
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);

  // category 모듈의 상태값에 따른 판단여부
  const resultCafe = is_category.find((item) => item === "카페"); //요게 카페가 나온다는건? 배열안에 카페가 있다는 것!
  const resultNight = is_category.find((item) => item === "야경");
  const resultOcean = is_category.find((item) => item === "바다");
  const resultMountain = is_category.find((item) => item === "산");
  const resultFlower = is_category.find((item) => item === "꽃");
  const resultAlone = is_category.find((item) => item === "나홀로");
  const resultCouple = is_category.find((item) => item === "연인");
  const resultFreind = is_category.find((item) => item === "친구");
  const resultPet = is_category.find((item) => item === "반려동물");
  const resultCity = is_category.find((item) => item === "도심");
  const resultPark = is_category.find((item) => item === "공원");
  const resultExhibition = is_category.find((item) => item === "전시");

  console.log("카페가 들어있다!", resultCafe);

  const board_list = useSelector((state) => state.post.list);
  console.log("잘 가지고 왔나~", board_list);

  const [search, setSearch] = React.useState("");

  React.useEffect(
    () => {
      dispatch(PostActions.getPostAPI());
    },
    [
      // is_category
    ]
  ); //카테고리 상태값이 바뀔 때 마다 useEffect 실행

  // console.log("카테고리 뭐 가지고 올까?", is_category);

  const searchPost = board_list.filter((val) => {
    // 검색기능(필터링)을 변수로 지정해 놓고 .map앞에 붙혀둔다
    if (search == "") {
      return val;
    } else if (val.title.includes(search)) {
      return val;
    } else if (val.content.includes(search)) {
      return val;
    }
  });

  const next = () => {
    dispatch(PostActions.getPostAPI(paging.start, paging.size));
  };

  return (
    <React.Fragment>
      {/* <InfiniteScroll  // 서버와 연결되면 인피니티 스크롤 게시!
        dataLength={post_list.length}
        next={next}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Container>
        //여기안에 모든 내용물이 들어가야 할수도 각각 무한스크롤 적용해야 할수도?
          {post_list.map((p, idx) => {
            return <Post2 key={p.id} {...p}></Post2>;
          })}
        </Container>
      </InfiniteScroll> */}
      {/* {loading && <Spinner />} */}
      <TopBox>
        <Search>
          {/* 검색기능  */}
          <Input2
            value={search}
            placeholder="카테고리를 검색해주세요 (●'◡'●)"
            _onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></Input2>
        </Search>
      </TopBox>
      {/* 검색기능 구현 */}
      <Container>
        {/* 전체보기 선택 */}
        {searchPost.map((p) => {
          if (is_category.length == 0) {
            return <Post2 key={p.id} {...p}></Post2>;
          }
        })}
        {/* {"카페 선택"} */}
        {searchPost.map((p) => {
          if (resultCafe) {
            if (p.category == "카페") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"야경 선택"} */}
        {searchPost.map((p) => {
          if (resultNight) {
            if (p.category == "야경") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"바다 선택"} */}
        {searchPost.map((p) => {
          if (resultOcean) {
            if (p.category == "바다") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"산 선택"} */}
        {searchPost.map((p) => {
          if (resultMountain) {
            if (p.category == "산") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"꽃 선택"} */}
        {searchPost.map((p) => {
          if (resultFlower) {
            if (p.category == "꽃") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"나홀로 선택"} */}
        {searchPost.map((p) => {
          if (resultAlone) {
            if (p.category == "나홀로") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"연인 선택"} */}
        {searchPost.map((p) => {
          if (resultCouple) {
            if (p.category == "연인") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"친구 선택"} */}
        {searchPost.map((p) => {
          if (resultFreind) {
            if (p.category == "친구") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"반려동물 선택"} */}
        {searchPost.map((p) => {
          if (resultPet) {
            if (p.category == "반려동물") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"도심 선택"} */}
        {searchPost.map((p) => {
          if (resultCity) {
            if (p.category == "도심") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}{" "}
        {/* {"공원 선택"} */}
        {searchPost.map((p) => {
          if (resultPark) {
            if (p.category == "공원") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
        {/* {"전시 선택"} */}
        {searchPost.map((p) => {
          if (resultExhibition) {
            if (p.category == "전시") {
              return <Post2 key={p.id} {...p}></Post2>;
            }
          }
        })}
      </Container>
      <Navbar />
      <MobileNav />
      <Web>
        {" "}
        <Category />
      </Web>
      <MobileCate></MobileCate>
      {/* <MobileCate></MobileCate> */}

      <Box></Box>
      {/* <Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/postwrite");
        }}
      ></Button> */}
    </React.Fragment>
  );
};

export default PostList;

//그리드 속성을 이렇게 줘야 모달창이 잘만들어진다!
const Container = styled.div`
  ${(prop) => prop.theme.responsiveContainer};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  margin: auto;
  width: 100%;
  padding: 50px 0px;
  flex-wrap: wrap;

  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  @media (max-width: 1450px) {
    // 1450밑으로 넓이가 내려가면
    margin-top: -5vh;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    margin: auto auto;
    padding: 0;
  }
  @media (max-width: 600px) {
    margin-top: 19vh;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2px;
  }
`;

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;

const OutBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

const Box = styled.div`
  height: 200px;
`;

const TextBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 15%;
  z-index: 200;
`;

const TopBox = styled.div`
  width: 100%;
  height: 110px;
`;

const Mobile = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
  }
`;

const Web = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const Search = styled.div`
  display: block;
  margin: auto auto;
  margin-top: 130px;
  display: flex;
  width: 24vw;
  margin-bottom: 20px;
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1); */
  border: none;
  box-sizing: border-box;
  @media (max-width: 1450px) {
    // 1450밑으로 넓이가 내려가면
    width: 35vw;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    display: none;
  }
`;
