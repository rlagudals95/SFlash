import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as storypostActions } from "../redux/modules/storypost";

import StoryUserProfile from "../components/StoryUserProfile";
import StoryContent from "../components/StoryContent";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";

// 유저가 작성한/좋아요한 게시물들을 모아볼 수 있는 페이지 입니다.
// 다른 사람들도 유저의 스토리를 열람할 수 있습니다.
const Story = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const userId = props.match.params.id;
  // console.log("userId:", userId);

  // 스토리 페이지는 크게 3가지로 나뉩니다.
  // (1) 유저 정보: user_info (2) 유저가 올린 게시물: user_post_list (3)유저가 좋아요한 게시물: user_like_list
  const user_info = useSelector((state) => state.profile.user);
  const user_post_list = useSelector((state) => state.storypost.user_post_list);
  const user_like_list = useSelector((state) => state.storypost.user_like_list);
  console.log("user_post_list", user_post_list);
  console.log("user_like_list", user_like_list);

  React.useEffect(() => {
    dispatch(profileActions.getUserInfoAPI(userId));
    dispatch(storypostActions.getUserPostAPI(userId));
    dispatch(storypostActions.getUserLikeAPI(userId));
  }, []);

  // '유저의 게시물/ 유저의 좋아요' 탭 제어하기 : 처음에는 유저의 게시물("myPost") 탭 활성화
  const [active, setActive] = React.useState("myPost");
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const id = e.target.id;
    if (id !== active) {
      setActive(id);
    }
  };

  // ListMode와 MapMode 제어하기
  const [myPost, setMyPost] = React.useState(true);
  console.log("myPost", myPost);

  // ListMode와 MapMode 제어하기
  const [postListMode, setPostListMode] = React.useState(true);
  const onClickCircleButton = () => {
    setPostListMode(!postListMode);
  };
  console.log("postListMode", postListMode);

  // Marker Icon
  const userPostMarkerImgUrl = "https://i.postimg.cc/3w264rbs/2x.png";
  const userLikeMarkerImgUrl = "https://i.postimg.cc/3rZTf11s/2x.png";

  // const user_post_list = useSelector((state) => {
  //   // console.log(state);
  //   // window.alert('');
  //   return state.storypost.user_post_list;
  // });

  // const [active, setActive] = useState(<StoryContent />);
  // const UserPostTab = () => setActive(<StoryContent />);
  // const UserLikeTab = () => setActive(<StoryContent />);

  return (
    <React.Fragment>
      <Wrapper>
        {/* 상단 유저 프로필 부분 컴포넌트 */}
        <StoryUserProfile user_info={user_info} userId={userId} />

        {/* '내 게시물'과 '좋아요한 게시물'을 나눠주는 탭: active 값을 이용해 제어
    active 의 값에 따라 content 부분의 내용이 바뀐다. 
    (content 내 Story_Content 컴퍼넌트에서는 리스트와 지도로 볼수 있도록 다시 나눠지는데
    active 를 활용해 같은 방법으로 제어해준다.*/}

        <Tabs>
          <Tab onClick={() => setMyPost(true)}>
            <b>{user_info.nickname}</b> 님의 게시물
            <TabUnderBar />
          </Tab>
          <VerticalLine>|</VerticalLine>
          <Tab onClick={() => setMyPost(false)}>
            <b>{user_info.nickname}</b> 님의 좋아요
            <TabUnderBar />
          </Tab>
        </Tabs>

        {/* <Tabs>
          <Tab onClick={handleClick} active={active === "myPost"} id={"myPost"}>
            <b>{user_info.nickname}</b> 님의 게시물
            <TabUnderBar active={active === "myPost"} />
          </Tab>
          <VerticalLine>|</VerticalLine>
          <Tab onClick={handleClick} active={active === "myLike"} id={"myLike"}>
            <b>{user_info.nickname}</b> 님의 좋아요
            <TabUnderBar active={active === "myLike"} />
          </Tab>
        </Tabs> */}

        <Icons>
          {postListMode ? (
            <Icon onClick={onClickCircleButton}>
              <HiOutlineMap size="30" />
            </Icon>
          ) : (
            <Icon onClick={onClickCircleButton}>
              <FiImage size="30" />
            </Icon>
          )}
        </Icons>

        {myPost ? (
          <Content active={active === "myPost"}>
            <StoryContent
              post_list={user_post_list}
              marker_icon={userPostMarkerImgUrl}
              postListMode={postListMode}
            />
          </Content>
        ) : (
          <Content active={active === "myLike"}>
            <StoryContent
              post_list={user_like_list}
              marker_icon={userLikeMarkerImgUrl}
              postListMode={postListMode}
            />
          </Content>
        )}

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
  @media (min-width: 1280px) {
  }
  @media (max-width: 1280px) {
  }
  @media (max-width: 960px) {
    font-size: 1.1rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const TabUnderBar = styled.div`
  width: 55%;
  height: 3pt;
  margin: 20px auto -20px auto;
  background-color: ${(props) => (props.active ? props.theme.main_color : "")};
`;

const Content = styled.div`
  
`;
/* ${(props) => (props.active ? "" : "display:none")} */
const Icons = styled.div`
  position: fixed;

  @media (min-width: 1280px) {
    left: 50%;
    transform: translate(550px, 40px);
  }
  @media (max-width: 1280px) {
    bottom: 20px;
    right: 70px;
  }
  @media (max-width: 960px) {
    bottom: 20px;
    right: 10px;
  }
  @media (max-width: 400px) {
    bottom: 10px;
    right: 10px;
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
  border: 2pt solid ${(props) => props.theme.main_color};
  box-sizing: border-box;
  color: ${(props) => props.theme.main_color};
  background-color: #ffffff;
  transition: background-color 0.5s ease-in-out;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.main_color};
    color: #ffffff;
    border: 2pt solid ${(props) => props.theme.main_color};
  }
`;

const VerticalLine = styled.text`
  width: 1px;
  height: 4px;
  font-size: 1.5rem;
  font-weight: 700;
  color: lightgrey; ;
`;

export default Story;
