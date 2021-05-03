// 부모 컴포넌트는 Main.js
import React from "react";

import styled from "styled-components";
import * as FcIcons from "react-icons/fc";
import * as CgIcons from "react-icons/cg";

// import { actionCreators as commentActions } from "../redux/modules/comment"
// import { actionCreators as userActions } from "../redux/modules/user"
// import { actionCreators as postActions } from "../redux/modules/post"

import { useDispatch, useSelector } from "react-redux";

const ModalSmallPost = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  
  return(
    <React.Fragment>
      <ModalContainer>
        <PicBox src={props.image_url}>
          {/* Head-Middle-Bottomd으로 구획을 나눔 */}
          <Head>
            <SpotName>{props.spot_name}</SpotName>
          </Head>
          <Center/>
          <BottomIconBox>
            <HeartIcon/>
            <CommentIcon/>
            <BinIcon/>
          </BottomIconBox>
        </PicBox>
      </ModalContainer>
    </React.Fragment>
  ) 
}

ModalSmallPost.defatultProps = {
  image_url: "https://i.pinimg.com/originals/3b/b2/5c/3bb25c56d66d633b2e6a47250b0eacbb.jpg",
  spot_name: "제주도 유채밭",
}

const ModalContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  background-color: white;
`;

const PicBox = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  background-size: cover;
`;

const Head = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-start;
`;

const SpotName = styled.div`
  background-color: transparent;
  color: white;
  font-size: 12px;
  padding-left: 5px;
`;

const Center = styled.div`
  height: 120px
`;

const BottomIconBox = styled.div`
  height: 40px;
  display: flex;
  justify-content: flex-end;
`;

const HeartIcon = styled.div`
  padding: 10px;
`;

const CommentIcon = styled.div`
  padding: 10px;
`;

const BinIcon = styled.div`
  padding: 10px;
`;

export default ModalSmallPost;