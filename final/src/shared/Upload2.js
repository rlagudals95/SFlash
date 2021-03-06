import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image2";
import styled from "styled-components";

const Upload = (props) => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();
  const preview = useSelector((state) => state.image2.preview);
  const selectFile = async (e) => {
    const file = fileInput.current.files[0];
    const files = fileInput.current.files;

    let images = []; // 이미지 파일들이 들어간 배열

    for (let i = 0; i < files.length; i++) {
      images.push(fileInput.current.files[i]);
    }
    if (file === undefined) {
      dispatch(
        imageActions.setPreview(
          "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/back_01.PNG?alt=media&token=e39ad399-6ef6-4e68-b046-e4a7c2072e36"
        )
      );
      return;
    }

    images.forEach((img) => {
      //images의 파일들을 forEach로 모두 읽게한다
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(imageActions.getPreview(reader.result)); // reader값은 업로드시 바로 확인할 수 있게 프리뷰로 보여주고
        dispatch(imageActions.getFile(img)); // 파일은 따로 리덕스 데이터에 저장
      };
      reader.readAsDataURL(img);
    });
  };

  return (
    <React.Fragment>
      {/* multiple붙이면 파일여러개 업로드가능! */}
      <InputBtn>
        <Label htmlFor="file">
          {/* 사진추가 아이콘 */}
          <UploadBtn>
            <IconRound>
              <LabelIcon></LabelIcon>
              {/* <MdIcons.MdAddToPhotos size="2.5rem" color="#fff" /> */}
            </IconRound>
          </UploadBtn>
        </Label>
        <FileInput
          id="file"
          type="file"
          ref={fileInput}
          onChange={selectFile}
          multiple
          // accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"
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
  width: 70px;
  position: fixed;
  right: 35px;
  top: 55vh;
  cursor: pointer;
  /* @media (max-width: 1440px) {
    right: 5px;
    top: 285px;
  }
  @media (max-width: 1155px) {
    right: 10px;
    top: 320px;
  } */
  @media (max-width: 600px) {
    top: 300px;
    right: 20px;
  }
`;

const LabelIcon = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1%20%EC%82%AC%EC%A7%84%EC%B6%94%EA%B0%80%402x.png?alt=media&token=94c42450-dbf5-4998-854f-8c193084507d");
  width: 70px;
  height: 70px;
  background-size: cover;
  :hover {
    opacity: 0.7;
  }
`;

const Label = styled.label`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1%20%EC%82%AC%EC%A7%84%EC%B6%94%EA%B0%80%402x.png?alt=media&token=94c42450-dbf5-4998-854f-8c193084507d");
  width: 50px;
  height: 50px;
  cursor: pointer;
  /* box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.3); */
`;

const FileInput = styled.input`
  font-size: 2px;
  border: none;
  margin-left: 2vw;
`;

const UploadBtn = styled.div`
  width: 50px;
  height: 50px;
  /* background-color: ${(props) => props.theme.main_color}; */
  border-radius: 25px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const IconRound = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
`;

export default Upload;
