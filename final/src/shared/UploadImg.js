// 이미지 업로드를 가능하게 하는 컴포넌트
import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { BiCloudUpload } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/imageActions";

// 이미지를 업로드하는 함수
const UploadImg = (props) => {
  const dispatch = useDispatch();
  const img_preview = useSelector((state) => state.image.img_preview); // 장소 사진 데이터를 리덕스 스토어에서 가져오기
  const profile_preview = useSelector((state) => state.image.profile_preview); // 사용자 이미지를 리덕스 스토어에서 가져오기
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef(); // input 데이터에 접근하는 React hook인 useRef

  const selectFile = (e) => {
   
    props.setImage(fileInput.current.file[0]); // 이 부분이 사진을 파일로서 보내는 핵심
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    // 22번줄의 file이 undefined 이라면 dispatch가 발동되게 한다.
    // window.location.href는 이 컴포넌트가 작동하면 이동하는 url이다.
    // if(window.location.href ===
    //     "http://locationhost:3000/mypage" && file === undefined) {
    //     dispatch(imageActions.profilePreview(img_preview))
    //     }

    if (file === undefined) {
      // 파일이 없어서 undefined 라면
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
      return;
    }

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        component="lable"
        color="default"
        startIcon={<CloudUploadIcon />}
        size="small"
        style={{ marginBottom: "15px" }}
      >
        {/* 업로드 되는 이미지 파일의 형식을 지정 */}
        <input
          id={"file-input"}
          style={{ display: "none" }}
          type="file"
          name="imageFile"
          onChange={selectFile}
          ref={fileInput}
          disabled={is_uploading}
        />
        사진 업로드
      </Button>
    </React.Fragment>
  );
};

export default UploadImg;
