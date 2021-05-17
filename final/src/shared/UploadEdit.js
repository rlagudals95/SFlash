import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image2";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import * as MdIcons from "react-icons/md";
//수정페이지 에서 이미지파일 & 이미지 프리뷰를 추가해주기 위한 업로드 버튼
// image2 모듈의 image안에 프리뷰를 넣어주고 파일은 따로 보관하자

// MdAddToPhotos;
const UploadEdit = (props) => {
  const dispatch = useDispatch();
  //   const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();
  const files = useSelector((state) => state.image2.file);
  // console.log("파일들", files);
  const selectFile = async (e) => {
    const file = fileInput.current.files[0];

    const files = fileInput.current.files;

    let images = []; // 이미지 파일들이 들어간 배열
    console.log("이미지들", images);
    for (let i = 0; i < files.length; i++) {
      images.push(fileInput.current.files[i]);
    }

    if (file === undefined) {
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
      return;
    }

    images.forEach((img) => {
      //images의 파일들을 forEach로 모두 읽게한다
      const reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        // 이부분 액션을 수정에 필요한 액션들로 대체해주자
        dispatch(imageActions.addEditImage(reader.result)); //들어가긴 하는데 이미지를 못읽어준다...흠...
        dispatch(imageActions.getEditFile(img));
      };
      reader.readAsDataURL(img);
    });
  };

  return (
    <React.Fragment>
      {/* multiple붙이면 파일여러개 업로드가능! */}

      <InputBtn>
        {/* 인풋버튼을 커스터마이징 하기위해 라벨을 이용 */}
        <Label htmlFor="file">
          {/* 사진추가 아이콘 */}
          <LabelIcon></LabelIcon>
          {/* <MdIcons.MdAddToPhotos size="2.5rem" color="#fff" /> */}
        </Label>
        <FileInput
          id="file"
          type="file"
          ref={fileInput}
          onChange={selectFile}
          multiple
          style={{ display: "none" }}
        />
      </InputBtn>
    </React.Fragment>
  );
};

const InputBtn = styled.div`
  all: unset;
  font-size: 2px;
  border: none;
  margin-left: 2vw;
  z-index: 7001;
  width: 50px;
  position: fixed;
  right: 5px;
  top: 350px;
  cursor: pointer;
  @media (max-width: 1440px) {
    right: 5px;
    top: 285px;
  }
  @media (max-width: 1155px) {
    right: 10px;
    top: 320px;
  }
  @media (max-width: 600px) {
    top: 250px;
    right: 20px;
  }
`;

const LabelIcon = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1%20%EC%82%AC%EC%A7%84%EC%B6%94%EA%B0%80%402x.png?alt=media&token=94c42450-dbf5-4998-854f-8c193084507d");
  width: 50px;
  height: 50px;
  background-size: cover;
`;

const Label = styled.label`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1%20%EC%82%AC%EC%A7%84%EC%B6%94%EA%B0%80%402x.png?alt=media&token=94c42450-dbf5-4998-854f-8c193084507d");
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.3);
`;

const FileInput = styled.input``;

export default UploadEdit;
