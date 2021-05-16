import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as storypostActions } from "../redux/modules/storypost";

import StoryPost from "./StoryPost";
import StoryMap from "./StoryMap";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";

const StoryContent = (props) => {
  const { post_list, marker_icon } = props;
  console.log("StoryContents에 props 값으로 받아온 post_list", post_list);

  // gridMode 가 true 면 그리드 형태로, false면 맵형태로 보여준다.
  const [gridMode, setGridMode] = React.useState(true);

  // 게시물 갯수가 0 일때 게시물을 등록해달라는 문구가 뜹니다.
  if (post_list === 0) {
    return (
      <React.Fragment>
        <Warning>
          <SflashLogo />
          <Text size="1.1rem" color="grey">
            게시물을 등록해 주세요!
          </Text>
        </Warning>
      </React.Fragment>
    );
  }
  // 게시물이 있을 때
  else {
    return (
      <React.Fragment>
        {/* 우측 아이콘 버튼 : gridMode를 제어 합니다.*/}
        <Icons>
          {gridMode ? (
            <>
              <SelectedIcon onClick={() => setGridMode(true)}>
                <FiImage size="25" />
              </SelectedIcon>
              <UnselectedIcon onClick={() => setGridMode(false)}>
                <HiOutlineMap size="25" />
              </UnselectedIcon>
            </>
          ) : (
            <>
              <UnselectedIcon onClick={() => setGridMode(true)}>
                <FiImage size="25" />
              </UnselectedIcon>
              <SelectedIcon onClick={() => setGridMode(false)}>
                <HiOutlineMap size="25" />
              </SelectedIcon>
            </>
          )}
        </Icons>

        <>
          {gridMode ? (
            <GridList>
              {post_list.map((p) => {
                return <StoryPost key={p.id} {...p}></StoryPost>;
              })}
            </GridList>
          ) : (
            <StoryMap post_list={post_list} marker_icon={marker_icon} />
          )}
        </>
        <Grid height="300px" />
      </React.Fragment>
    );
  }
};

const Warning = styled.div`
  text-align: center;
  margin: 30px auto;
  padding: 150px;
  border: 2.5pt solid #eee;
`;
const SflashLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe");
  width: 100px;
  height: 100px;
  margin: auto;
  background-size: cover;
`;

const Icons = styled.div`
  position: fixed;
  @media (min-width: 1280px) {
    left: 50%;
    transform: translate(550px, 40px);
  }
  @media (max-width: 1280px) {
    bottom: 100px;
    right: 70px;
  }
  @media (max-width: 960px) {
    bottom: 100px;
    right: 20px;
  }
  @media (max-width: 400px) {
    bottom: 100px;
    right: 10px;
  }
  display: flex;
  flex-direction: column;
  z-index: 500;
`;

const SelectedIcon = styled.button`
  aspect-ratio: 1/1;
  border-radius: 100px;
  margin: 5px;
  padding: 20px;
  border: 2pt solid #eee;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.main_color};
  color: #ffffff;
  border: 2pt solid ${(props) => props.theme.main_color};
  transition: background-color 0.5s ease-in-out;
  /* :hover {
    cursor: pointer;
    background-color: #eee;
    color: grey;
    border: 2pt solid #eee;
  } */
`;

const UnselectedIcon = styled.button`
  aspect-ratio: 1/1;
  border-radius: 100px;
  margin: 5px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  color:  ${(props) => props.theme.main_color};
  border: 2pt solid ${(props) => props.theme.main_color};
  transition: background-color 0.5s ease-in-out;
  :hover {
    cursor: pointer;
    background-color: #eee;
    color: grey;
    border: 2pt solid #eee;
  }
`;

const GridList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  margin: auto;
  width: 100%;
  padding: 20px 0px;
  flex-wrap: wrap;
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    padding: 10px 0px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2px;
    padding: 0px 0px;
  }
`;


export default StoryContent;
