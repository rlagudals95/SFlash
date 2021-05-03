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
import "../Css/Post.css";

//로그인 후에 이용가능 합니다
const Post2 = (props) => {
  const dispatch = useDispatch();

  // const [modalOpen, setModalOpen] = useState();
  const [is_modal, setDetailModal] = useState();

  const openModal = () => {
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
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
    background-image: url("${props.imgUrl}");
    background-repeat: no-repeat;

    /* &:hover {
      animation: ${hoverBox} 1s;
    } */
    cursor: pointer;
  `;

  //스타일 컴포넌트//

  return (
    <React.Fragment>
      <Card>
        <PostBox src={props.post_image_url} onClick={openModal}>
          {/* 이거자체가 지금 투명 0 */}
          <div className={"hoverDark"}>
            <div className={"PostFont"}>
              <FavoriteBorderIcon />
              <div>0 </div>
              <br />
              {props.address}
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
