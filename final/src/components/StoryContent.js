import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as storypostActions } from "../redux/modules/storypost";

import Post2 from "./Post2";
import StoryMap from "./StoryMap";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";

const StoryContent = (props) => {
  const { post_list } = props;
  console.log("StoryContents에 props 값으로 받아온 post_list", post_list);
  
  // 버튼 탭 구현하기
  // 처음에는 0번째 인덱스 활성화 git
  const [active, setActive] = useState(1);
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const index = parseInt(e.target.id);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <React.Fragment>
      {post_list.length === 0 ? 
        (<Warning>
          <Text bold size="2rem">SFlash(Logo)</Text>
          <Text size="1.3rem">등록된 게시물이 없습니다 ㅠㅠ!</Text>
        </Warning>
        ):(
          <>
        <Icons>
          <Icon onClick={handleClick} active={active === 1} id={1}>
            <FiImage size="30" onClick={handleClick} active={active === 1} id={1}/>
          </Icon>
          <Icon onClick={handleClick} active={active === 2} id={2}>
            <HiOutlineMap size="30" onClick={handleClick} active={active === 2} id={2}/>
          </Icon>
        </Icons>

            <Content active={active === 1}>
          <GridList>
            {post_list.map((p) => {
              return <Post2 key={p.id} {...p}></Post2>;
            })}
          </GridList>
        </Content>
        <Content active={active === 2}>
        <Grid height="40px" />
          <Box><StoryMap/></Box>
        </Content>
          </>
        )}
        
        

        <Grid height="300px" />
    </React.Fragment>
  );
};

const Warning = styled.div`
  text-align: center;
  margin: 100px auto;
`;

const Icons = styled.div`
  position: fixed;

  @media (min-width: 1280px) {
    left: 50%;
    transform: translate(650px, 80px);
    }
    @media (max-width: 1280px) {
      bottom:20px;
      right:70px;
    }
    @media (max-width: 960px) {
      bottom:20px;
      right:70px;
    }
    @media (max-width: 400px) {
      bottom:20px;
      right:70px;
    }
  display: flex;
  flex-direction: column;
  z-index: 500;
`;

const Icon = styled.button`
  aspect-ratio: 1/1;
  border-radius: 100px;
  margin: 5px;
  padding: 20px;
  border: 2pt solid #eee;
  box-sizing: border-box;

  color: ${(props) => (props.active ? props.theme.main_color : "grey")};
  border: ${(props) => (props.active ? "2pt solid #4670fd" : "")};
  background-color: ${(props) => (props.active ? "white" : "#eee")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    cursor: pointer;
    background-color: ${(props) =>props.theme.main_color};
    color: #ffffff;
    border: lightgrey;
  }
`;

const GridList = styled.div`
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

const Box = styled.div`
  text-align: center;
  margin: auto;
  width: 100%;
  height: 1000px;
  background-color: #eee;
`;

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

export default StoryContent;
