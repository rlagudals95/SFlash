// GridList에서 보여지는 1개의 Post
// Post2의 사본
import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as ModalActions } from "../redux/modules/storypostmodal";
import { actionCreators as storyPostActions } from "../redux/modules/storypost";
import PostModal from "./StoryPostModal/PostModal";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "../Css/Post.css";

//로그인 후에 이용가능 합니다
const StoryPost = (props) => {
  const dispatch = useDispatch();

  const [is_modal, setDetailModal] = useState();
  const openModal = () => {
    dispatch(ModalActions.getModalPostAPI(props.id));
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };

  // 좋아요 
  const addLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.userPostMode) {
      dispatch(storyPostActions.addUserPostLikeAPI(props.id, props));
    } else {
      dispatch(storyPostActions.addUserLikeLikeAPI(props.id, props));
    }
  };

  // 좋아요 취소
  const disLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.userPostMode) {
      dispatch(storyPostActions.deleteUserPostLikeAPI(props.id, props));
    } else {
      dispatch(storyPostActions.deleteUserLikeLikeAPI(props.id, props));
    }
  };

  return (
    <React.Fragment>
      <Card>
        {/* src={props.post_image_url[0]} */}

        <PostBox onClick={openModal} src={props.img_url[0].imgUrl}>
          {/* 이거자체가 지금 투명 0 */}
          <div className={"hoverDark"}>
            {props.like}
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
        </PostBox>
      </Card>
      {is_modal ? (
        <PostModal
          close={closeDetailModal}
          boardId={props.id} //모달에 모든 정보를 넘겨준다.
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

const Card = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
`;

export default StoryPost;
