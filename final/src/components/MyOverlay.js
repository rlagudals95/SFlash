// 부모 컴포넌트는 Main.js
import React from "react";

import styled from "styled-components";
import * as FcIcons from "react-icons/fc";
import * as CgIcons from "react-icons/cg";

// import { actionCreators as commentActions } from "../redux/modules/comment"
// import { actionCreators as userActions } from "../redux/modules/user"
// import { actionCreators as postActions } from "../redux/modules/post"

import { useDispatch, useSelector } from "react-redux";

const CustomOverlay = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const closeOverlay = function() {
    customOverlay.setMap(null);     
  }
  
  return(
    <React.Fragment>
      <ModalContainer>
        <PicBox src={props.imgUrl}>
          {/* Head-Middle-Bottomd으로 구획을 나눔 */}
          <Head>
            <SpotName>{props.spotName}</SpotName>
            <Close onClick={closeOverlay()}/>
          </Head>
          <BottomIconBox>
            <LikeIcon/>
          </BottomIconBox>
        </PicBox>
      </ModalContainer>
    </React.Fragment>
  ) 
}

ModalSmallPost.defatultProps = {
  imgUrl: "https://i.pinimg.com/originals/3b/b2/5c/3bb25c56d66d633b2e6a47250b0eacbb.jpg",
  spotName: "제주도 유채밭",
}

const ModalContainer = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const PicBox = styled.img`
  margin: auto; 
  /* padding: 5px 5px 5px 5px; */
  width: 92%;
  height: 92%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  object-fit: cover;
  background-size : cover;
`;

const Head = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

const SpotName = styled.div`
  position: absolute;
  top: 17px;
  left: 17px;
  background-color: transparent;
  /* color: white; */
  color: white;
  font-size: 21px;
  padding-left: 5px;
`;

const Close = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  height: 17px;
  width: 17px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  object-fit: cover;
  background-size : cover;
  background: url('https://i.postimg.cc/sXBKhhbJ/overlay-close.png');
`;

const Center = styled.div`
  height: 120px
`;

const BottomIconBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const LikeIcon = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  border: none;
  object-fit: cover;
  background-size : cover;
  background-color: transparent;
  background: url('https://i.postimg.cc/nhPDQPx6/heart-pink.png');
`;

export default CustomOverlay;