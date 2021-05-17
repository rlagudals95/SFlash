// GridList에서 보여지는 1개의 Post
// Post2의 사본

import React, { useState } from "react";
import { history } from "../redux/configStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import FavoriteIcon from "@material-ui/icons/Favorite";

import PostModal from "./StoryPostModal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { actionCreators as likeActions } from "../redux/modules/storylike";
import { actionCreators as ModalActions } from "../redux/modules/storypostmodal";


import "../Css/Post.css";

//로그인 후에 이용가능 합니다
const StoryPost = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const boardId = props.id ;
  console.log("userPostMode:", props.userPostMode);

  React.useEffect(() => {
    console.log("시작");
    // if(props.userPostMode){
    //   dispatch(likeActions.getUserPostLike());
    // }else{
    //   dispatch(likeActions.getUserLikeLike());
    // }
  }, []);

  const paging = useSelector((state) => state.post.paging);
  const like = useSelector((state) => state.storylike.like);
  console.log("좋아요 정보", like);

  const [is_modal, setDetailModal] = useState();

  const openModal = () => {
    setDetailModal(true);
    dispatch(ModalActions.getModalPostAPI(boardId)); 
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };

  // 좋아요 함수
  const addLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("ADDLIKE!!!!!", props.id, props)
    if(props.userPostMode){
      dispatch(likeActions.addUserPostLikeAPI(props.id, props));
    }else{
      // dispatch(likeActions.addUserLikeLikeAPI(props.id, props));
    }
  
  }
    // dispatch(PostActions.editLikeP(props.id, props)); // 리덕스


  const disLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("DISLIKE!!!!!", props.id, props)
    if(props.userPostMode){
      dispatch(likeActions.deleteUserPostLikeAPI(props.id, props));
    }else{
      // dispatch(likeActions.deleteUserLikeLikeAPI(props.id, props));
    }
    // dispatch(likeActions.disLikeAPI(props.id, props));
    // dispatch(PostActions.editLikeD(props.id, props));
  };

  return (
    <React.Fragment>
      <Card>
        {/* src={props.post_image_url[0]} */}

        <PostBox
          onClick={openModal}
          src={props.img_url[0].imgUrl}
        >
          {/* 이거자체가 지금 투명 0 */}
          <div className={"hoverDark"}>
            {like}
            <div className={"PostFont"}>
              {props.like ? (
                <FavoriteIcon
                  fontSize="24px"
                  onClick={disLike}
                  style={{ fontSize: 40 }}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="24px"
                  onClick={addLike}
                  style={{ fontSize: 40 }}
                />
              )}
              <div>{props.likeCnt} </div>
              <br />
              {props.spotName}
            </div>
          </div>
          {/* 투명도 0 */}
        </PostBox>
      </Card>
      {is_modal ? (
        <PostModal
          close={closeDetailModal}
          boardId={props.id} //여기서 모달에 모든 정보를 넘겨주는 구나!
        />
      ) : null}
    </React.Fragment> 
  );
};

const PostBox = styled.div`
  background-position: center;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  background-size: cover;
  background-repeat: no-repeat;

  background-image: url("${(props) => props.src}");
  cursor: pointer;
`;

const hoverBox = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0.3;

  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Card = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
`;

const CntBox = styled.span`
  margin: 8px 0px 8px 2px;
`;

export default StoryPost;
