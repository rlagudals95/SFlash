import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as storyPostActions } from "../redux/modules/storypost";
import InfiniteScroll from "react-infinite-scroll-component";
import StoryPost from "./StoryPost";
import StoryMap from "./StoryMap";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import Spinner from "../shared/Spinner";

const StoryContent = (props) => {
  const dispatch = useDispatch();
  const { post_list, userPostMode, userId } = props;
  const is_loading = useSelector((state) => state.storypost.is_loading);

  React.useEffect(() => {}, []);


  // gridMode 가 true 면 그리드 형태로, false면 맵형태로 보여준다.
  const [gridMode, setGridMode] = React.useState(true);

  const next = () => {
    //스크롤이 바닥에 닿을때 마다 포스트를 정해진 paging 사이즈만큼 가져오는 함수
    if (userPostMode) {
      dispatch(storyPostActions.getUserPostAPI(userId));
    } else {
      dispatch(storyPostActions.getUserLikeAPI(userId));
    }
  };

  if (post_list.length === 0) {
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

  // 게시물 갯수가 0 일때 게시물을 등록해달라는 문구가 뜨고
  // 게시물이 있을 때는 게시물을 보여줍니다.
  if (post_list.length > 0) {
    return (
      <React.Fragment>
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
            <>
              <InfiniteScroll // 무한스크롤 페이징처리 라이브러리다
                dataLength={post_list.length}
                next={next}
                hasMore={true}
                loader={is_loading && <Spinner />} //상태값이 loading 중 일땐 스피너가 보여서 뒤에 게시물이 더 있을음 알려준다
              >
                <GridList>
                  {post_list.map((p) => {
                    return (
                      <StoryPost
                        key={p.id}
                        {...p}
                        userPostMode={userPostMode}
                      ></StoryPost>
                    );
                  })}
                </GridList>
              </InfiniteScroll>
            </>
          ) : (
            <>
              <StoryMap
                post_list={post_list}
                userPostMode={userPostMode}
              />
              <Grid height="50px" />
              <Text>* 게시물 등록은 메인페이지(HOME)에서 가능합니다.</Text>
            </>
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
`;

const UnselectedIcon = styled.button`
  aspect-ratio: 1/1;
  border-radius: 100px;
  margin: 5px;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.main_grey};
  color: #ffffff;
  border: 2pt solid ${(props) => props.theme.main_grey};
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
  grid-gap: 5px;
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
