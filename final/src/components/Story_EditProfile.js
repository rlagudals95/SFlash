import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Story_EditProfile = (props) => {
  const dispatch = useDispatch();
  const { user_info } = props;
  const preview = useSelector((state) => state.image.preview);
  const is_uploading = useSelector((state) => state.image.is_uploading);

  return (
    <React.Fragment>
      <ProfileContainer>
        <ProfileImg
          src={
            preview
              ? preview
              : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
        />
        <text>프로필 사진 바꾸기</text>
        {/* <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
      /> */}
        <text>닉네임</text>
        <text>소개</text>
      </ProfileContainer>
    </React.Fragment>
  );
};
const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  width: 220px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 30px;
  margin: 30px auto;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

export default Story_EditProfile;
