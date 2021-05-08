import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as storypostActions } from "../redux/modules/storypost";

import StoryUserProfile from "../components/StoryUserProfile";
import StoryContent from "../components/StoryContent";

const Story = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const userId = props.match.params.id;
  console.log("userId:", userId);

  const user_info = useSelector((state) => state.profile.user);
  const user_post_list = useSelector((state) => state.storypost.user_post_list);
  console.log(user_info);
  // const user_like_list = useSelector((state) => state.storypost.user_like_list);
  console.log(user_info);
  console.log(user_post_list);

  const nickname = user_info.nickname;

  React.useEffect(() => {
    dispatch(profileActions.getUserInfoAPI(userId));
    // 유저인포가 없으면 화면을 띄워주지 않도록 한다.

    dispatch(storypostActions.getUserPostAPI(userId));
    // dispatch(storypostActions.getUserLikeAPI(nickname));
  }, []);

  // const user_post_list = useSelector((state) => {
  //   // console.log(state);
  //   // sindow.alert('');
  //   return state.storypost.user_post_list
  // });

  // const [active, setActive] = useState(<StoryContent />);
  // const UserPostTab = () => setActive(<StoryContent />);
  // const UserLikeTab = () => setActive(<StoryContent />);

  // '나의 게시물/ 나의 좋아요' 탭 제어하기 : 처음에는 0번째 인덱스 활성화
  const [active, setActive] = useState("myPost");
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const id = e.target.id;
    if (id !== active) {
      setActive(id);
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        {/* 상단 유저 프로필 부분 컴포넌트 */}
        <StoryUserProfile user_info={user_info} />
        {/* 
      <Tabs>
          <Tab onClick={UserPostTab} >
            <b>{user_info.nickname}</b> 님의 게시물
       
          </Tab>
          <text fontSize="4rem" fontWeight="700" style={{ color: "grey" }}>
            |
          </text>
          <Tab onClick={UserLikeTab}>
            <b>{user_info.nickname}</b> 님의 좋아요
     
          </Tab>
        </Tabs>

         <Content >
          {active}
        </Content> */}

        {/* '내 게시물'과 '좋아요한 게시물'을 나눠주는 탭: active 값을 이용해 제어
    active 의 값에 따라 content 부분의 내용이 바뀐다. 
    (content 내 Story_Content 컴퍼넌트에서는 리스트와 지도로 볼수 있도록 다시 나눠지는데
    active 를 활용해 같은 방법으로 제어해준다.*/}
        <Tabs>
          <Tab onClick={handleClick} active={active === "myPost"} id={"myPost"}>
            <b>{user_info.nickname}</b> 님의 게시물
            <TabUnderBar active={active === "myPost"} />
          </Tab>
          <text fontSize="4rem" fontWeight="700" style={{ color: "grey" }}>
            |
          </text>
          <Tab onClick={handleClick} active={active === "myLike"} id={"myLike"}>
            <b>{user_info.nickname}</b> 님의 좋아요
            <TabUnderBar active={active === "myLike"} />
          </Tab>
        </Tabs>

        {/* <Content active={active === "myPost"}>
          <StoryContent post_list={user_post_list} />
        </Content>
        <Content active={active === "myLike"}>
          <StoryContent />
        </Content> */}
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
  width: 100%;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 49%;
  padding: 25px;
  font-size: 1.3rem;
  color: ${(props) => (props.active ? props.theme.main_color : "grey")};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background-color: ${(props) => (props.active ? "white" : "white")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: ${(props) => (props.active ? "white" : "#eee")};
  }
`;
const TabUnderBar = styled.div`
  width: 55%;
  height: 3pt;
  margin: 20px auto -20px auto;
  background-color: ${(props) => (props.active ? props.theme.main_color : "")};
`;

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

export default Story;
