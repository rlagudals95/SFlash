import React, { useState } from "react";
import styled from "styled-components";

// 컴포넌트 파일들 임포트해오기
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "../components/SideNav";
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
import { actionCreators as PostActions } from "../redux/modules/post";

const PostList = () => {
  const dispatch = useDispatch();

  const is_category = useSelector((state) => state.category.is_category);

  // console.log("데이터 카테고리", post_list.category);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    // console.log("계속 실행 되는겨?");
    dispatch(PostActions.getPostAPI(is_category));
  }, [is_category]); //카테고리 상태값이 바뀔 때 마다 useEffect 실행

  //filter

  const a = (cate) => {
    is_category.includes(
      is_category.filter((c, idx) => {
        if (c == cate) {
          return cate;
        }
      })
    );
  };

  console.log(a("꽃"));

  console.log("카테고리 뭐 가지고 올까?", is_category);

  //is_category 안에서 특정 카테고리 하나를 찾는방법

  // const is_over = (is_category, post_category) => {
  //   for (let i = 0; i < is_category.length; i++) {
  //     is_category.includes(post_category[i]);

  //   }
  //   is_category.includes(post_category[0]);
  //   is_category.includes(post_category[1]);
  //   is_category.includes(post_category[2]); // 하나라도 포함되있는지 검사
  //   (findIndex >> idx) >> post_catefgory[idx];
  // };

  return (
    <React.Fragment>
      {/* <InfiniteScroll  // 서버와 연결되면 인피니티 스크롤 게시!
        dataLength={post_list.length}
        next={next}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Container>
          {post_list.map((p, idx) => {
            return <Post2 key={p.id} {...p}></Post2>;
          })}
        </Container>
      </InfiniteScroll> */}
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
        {post_list //포스트리스트를 필터링 해준다 // 이런식으로 카테고리 별로 구현 할 수도??
          .filter((val) => {
            if (
              search == ""
              // &&
              // val.category.includes(
              //   is_category.forEach((c) => {
              //     console.log("들어온 카테고리???/", `${c}`);
              //     return `${c}`;
              //   })
              // )
            ) {
              return val;
              //카테고리가 포함되어있는??
            } else if (
              val.title.includes(search)
              // &&
              // val.category.includes(
              //   is_category.forEach((c) => {
              //     console.log("들어오나???", c);
              //     return c;
              //   })
              // ) // 제목이 검색 내용에 있을때랑 카테고리가 카페인 것만
            ) {
              return val; // axios로 받아온 제목이 검색어에 포함 되었을때
            } else if (
              val.content.includes(search)
              // &&
              // val.category.includes(
              //   is_category.forEach((c) => {
              //     console.log("들어오나???", c);
              //     return c;
              //   })
              // )
            ) {
              return val; // axios로 받아온 글쓴이가 검색어에 포함 되었을때
            }
          })
          .map((p, i) => {
            // 0,1,2,3,4똑같은지 비교 is_category에서 0,1,2,3,4번째 뽑은것 //함수처리 x
            if (
              p.category.includes(
                is_category.filter((c, idx) => {
                  if (c == "야경") {
                    console.log(c);
                    return "야경";
                  }
                })
              )
            ) {
              // is_category 안에 "야경이 있다면" 여기에 "야경이" 없다면 "no" 같은 아무단어?
              //태그 하나에 대해서만 검사가 된다.... 원하는대로 하려면 if문 여러개
              //카테고리 배열을 2개 받는 함수 // 2개중에서 겹치는게 하나라도 있는지 // p.category와 is_category
              // 그럼 여기값을 잘 가지고 놀면될 거 같다
              //""인 상태면 모든걸 출력
              //카테고리를 포함하고 있으면 그것들만 리턴시켜줘라
              return (
                <>
                  <Post2 key={i} {...p} />
                </>
              );
            } else if (
              p.category.includes(
                is_category.filter((c, idx) => {
                  if (c == "나홀로") {
                    return "나홀로";
                  }
                })
              )
            ) {
              //이거 하나하나를 껐다 켜볼까?
              return (
                <>
                  <Post2 key={i} {...p} />
                </>
              );
            } else if (
              p.category.includes(
                is_category.filter((c, idx) => {
                  if (c == "카페") {
                    return "카페";
                  }
                })
              )
            ) {
              return (
                <>
                  <Post2 key={i} {...p} />
                </>
              );
            } else if (
              p.category.includes(
                is_category.filter((c, idx) => {
                  if (c == "꽃") {
                    return "꽃";
                  }
                })
              )
            ) {
              return (
                <>
                  <Post2 key={i} {...p} />
                </>
              );
            }
            // else {
            //   return (
            //     <>
            //       <Post2 key={i} {...p} />
            //     </>
            //   );
            // }
          })}
      </Container>
      <SideNav />
      {/* <LogBtn /> */}
      {/* <SearchBar
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      /> */}

      <Category />
      <Box></Box>
    </React.Fragment>
  );
};

export default PostList;

//그리드 속성을 이렇게 줘야 모달창이 잘만들어진다!
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
  grid-auto-rows: 405px;
  grid-gap: 24px;
  text-align: center;
  margin: auto;
  width: 1266px;
  height: 100%;
  padding: 50px 200px;
  flex-wrap: wrap;
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
  width: 100vw;
  height: 110px;
`;

const Search = styled.div`
  margin: auto auto;

  margin-top: 130px;
  display: flex;
  width: 450px;
  margin-bottom: 20px;
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1); */
  border: none;
`;
