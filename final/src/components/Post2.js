import React, { useState } from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Modal from "./Modal";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SendIcon from "@material-ui/icons/Send";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { actionCreators as modalActions } from "../redux/modules/modal";
import { actionCreators as likeActions } from "../redux/modules/like";

import "../Css/Post.css";

//로그인 후에 이용가능 합니다
const Post2 = (props) => {
  const dispatch = useDispatch();

  // 이미지들 반복문으로 뽑아오기
  let image_list = [];

  for (let i = 0; i < props.img_url.length; i++) {
    image_list.push(props.img_url[i]);
  }
  // console.log("이미지 리스트!", image_list);
  // 댓글들 반복문으로 뽑아오기
  let comment_list = [];
  for (let i = 0; i < props.comment.length; i++) {
    comment_list.push(props.comment[i]);
  }

  // console.log("이미지 리스트", image_list);
  // console.log("첫번째 이미지", image_list[0]);

  // console.log("썸네일", image_list[0].imgUrl);
  // const image = props.imgUrl;

  const PostImage = image_list[0].imgUrl;
  // console.log(PostImage.imgUrl);
  // const [modalOpen, setModalOpen] = useState();
  const [is_modal, setDetailModal] = useState();

  const openModal = () => {
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };

  // 좋아요 함수
  const addLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(likeActions.addLikeAPI(props.id));
  };

  const disLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(likeActions.disLikeAPI(props.id));
  };

  //스타일 컴포넌트//
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

  const PostBox = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${PostImage});
    /* &:hover {
      animation: ${hoverBox} 1s;
    } */
    cursor: pointer;
  `;

  //스타일 컴포넌트//

  // console.log("포스트 프롭스", props);
  // console.log(props.post_image_url);
  return (
    <React.Fragment>
      <Card>
        {/* src={props.post_image_url[0]} */}

        <PostBox onClick={openModal}>
          {/* 이거자체가 지금 투명 0 */}
          <div className={"hoverDark"}>
            <div className={"PostFont"}>
              {props.like ? (
                <FavoriteIcon onClick={disLike} />
              ) : (
                <FavoriteBorderIcon onClick={addLike} />
              )}
              <div>{props.likeCnt} </div>
              <br />
              {props.title}
            </div>
          </div>
          {/* 투명도 0 */}
        </PostBox>
      </Card>
      {is_modal ? (
        <Modal
          close={closeDetailModal}
          {...props} //여기서 모달에 모든 정보를 넘겨주는 구나!
        />
      ) : null}
    </React.Fragment> //여기서 댓글 정보랑 모든걸 넘겨주려나?
  );
};

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

export default Post2;
