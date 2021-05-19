import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as storypostActions } from "../redux/modules/storypost";
import { actionCreators as postActions } from "../redux/modules/post";
import axios from "axios";
import { config } from "../shared/config";

import StoryUserProfile from "../components/StoryUserProfile";
import StoryContent from "../components/StoryContent";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import lib from "react-kakao-maps";
import { findIndex } from "lodash";

// 유저가 작성한/좋아요한 게시물들을 모아볼 수 있는 페이지 입니다.
// 다른 사람들도 유저의 스토리를 열람할 수 있습니다.

const Story = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const userId = props.match.params.id;
  console.log("userId:", userId);

  React.useEffect(() => {
      dispatch(profileActions.getUserInfoAPI(userId));

      dispatch(storypostActions.getUserPostAPI(userId));
      dispatch(storypostActions.getUserLikeAPI(userId));
  }, []);

  // 스토리 페이지는 크게 3가지로 나뉩니다.
  // (1) 유저 정보: user_info (2) 유저가 올린 게시물: user_post_list (3)유저가 좋아요한 게시물: user_like_list
  const user_info = useSelector((state) => state.profile.user);
  const user_post_list = useSelector((state) => state.storypost.user_post_list);
  const user_like_list = useSelector((state) => state.storypost.user_like_list);
  console.log("user_post_list", user_post_list);
  console.log("user_like_list", user_like_list);

  // Map Marker Icon
  const userPostMarkerImgUrl = "https://i.postimg.cc/zDHr74DL/2x.png";
  const userLikeMarkerImgUrl = "https://i.postimg.cc/3rZTf11s/2x.png";

  const [userPostMode, setUserPostMode] = React.useState(true);

  return (
    <React.Fragment>
      <Wrapper>
        {/* 상단 유저 프로필 부분 컴포넌트 */}
        <StoryUserProfile user_info={user_info} userId={userId} />
        <Tabs>
          {/* 유저가 올린 게시물 탭 */}
          {userPostMode ? (
            <>
              <SelectedTab>
                <b>{user_info.nickname}</b> 님의 게시물
                <TabUnderBar />
              </SelectedTab>
              <VerticalBar />
              <UnselectedTab
                onClick={() => {
                  setUserPostMode(false);
                }}
              >
               {user_info.nickname} 님의 좋아요
              </UnselectedTab>
            </>
          ) : (
            <>
              <UnselectedTab
                onClick={() => {
                  setUserPostMode(true);
                }}
              >
                {user_info.nickname} 님의 게시물
              </UnselectedTab>
              <VerticalBar />
              <SelectedTab>
                <b>{user_info.nickname}</b> 님의 좋아요
                <TabUnderBar />
              </SelectedTab>
            </>
          )}
        </Tabs>

        <Content>
          {userPostMode ? (
            <StoryContent
              post_list={user_post_list}
              marker_icon={userPostMarkerImgUrl}
              userPostMode={userPostMode}
              userId={userId}
            />
          ) : (
            <StoryContent
              post_list={user_like_list}
              marker_icon={userLikeMarkerImgUrl}
              userPostMode={userPostMode}
              userId={userId}
            />
          )}
        </Content>

      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  margin: 0 auto;
  margin-bottom: 3%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const SelectedTab = styled.div`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 49%;
  padding: 25px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.main_grey};
  background-color: #ffffff;
  transition: background-color 0.5s ease-in-out;
  :hover {
  }
  @media (max-width: 960px) {
    font-size: 0.9rem;
  }
  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const UnselectedTab = styled.div`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 49%;
  padding: 25px;
  font-size: 1.3rem;
  font-weight: 400;
  color: grey;
  transition: background-color 0.5s ease-in-out;
  :hover {
    color: ${(props) => props.theme.main_color};
  }
  @media (max-width: 960px) {
    font-size: 0.9rem;
  }
  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const TabUnderBar = styled.div`
  width: 80%;
  min-width: 145px;
  height: 3pt;
  margin: 20px auto -25px auto;
  background-color: ${(props) => props.theme.main_grey};
  @media (max-width: 960px) {
    height: 2pt;
  }
  @media (max-width: 400px) {
    height: 2pt;
  }
`;

const Content = styled.div``;

const VerticalBar = styled.div`
  height: 30px;
  width: 2px;
  background-color: #eee;
`;

export default Story;
