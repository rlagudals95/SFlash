import React, { useState } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { actionCreators as imageActions } from "../redux/modules/image2";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Slider from "react-slick";
import UploadImg from "../components/UpLoadModal";
import { useDispatch, useSelector } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import Upload2 from "../shared/Upload2";
import SelectCate from "./SelectCate";
import { actionCreators as postActions } from "../redux/modules/post";
import Input from "../elements/Input";
import Input2 from "../elements/Input2";

const UploadModal = (props) => {
  const { latitude, longitude, spotName } = props;

  console.log(
    "위도: " +
      latitude +
      " , " +
      "경도: " +
      longitude +
      " , " +
      "장소이름 : " +
      spotName
  );

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image2.preview);
  console.log(preview);
  const user_info = useSelector((state) => state.user.user);
  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState(false);
  const post_list = useSelector((state) => state.post.list);
  // const post_id = props.match.params.id;
  const is_edit = props.id ? true : false; //게시글 작성시 props로 id를 받냐 안받냐 차이
  // console.log("수정 게시물 정보", props);
  console.log("수정 화면 이미지들", images);
  const nickname = localStorage.getItem("nickname");

  // const _post = is_edit ? post_list.find((p) => p.id == post_id) : null;
  console.log("프리뷰", preview);
  const ok_submit = contents ? true : false;

  React.useEffect(() => {
    if (is_edit) {
      let editImages = [];

      for (let i = 0; i < props.img_url.length; i++) {
        editImages.push(props.img_url[i]);
      }
      setImages(editImages); // 수정 화면일 때 게시물 이미지를 보여주기 위해서 받은 props 이미지 값을 state에 저장
    }
  }, []);

  // React.useEffect(() => {
  //   if (is_edit && !_post) {
  //     // 포스트 id가 같지 않거나 post_id가 현재 post_list중 같은게 없다면
  //     console.log("포스트 정보가 없어요!");
  //     history.goBack(); // 포스팅을 찾을 수 없다는 뜻 그러므로 리턴

  //     return;
  //   }

  //// 수정가능한 상태인지는 props.id(post_id) 여부에 따라

  //   //만약 수정가능 상태라면
  //   if (is_edit) {
  //     dispatch(imageActions.setPreview(_post.post_image_url)); // 페이지가 렌더링 되면서 기존 이미지 같이 렌더링
  //   } else {
  //     dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
  //   }
  // }, []);

  // 작성된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  const addPost = () => {
    if (!contents) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    let post = {
      title: title,
      content: contents,
      latitude: props.latitude,
      longitude: props.longitude,
      spotName: props.spotName,
    };
    console.log(post);
    dispatch(postActions.addPostAPI(post));
    history.replace("/");
  };

  // 수정된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  //위의 수정 조건을 다 만족 했을 시에 수정 버튼을 눌러 editPostAX를 디스패치로 실행
  // const editPost = () => {
  //   if (!contents) {
  //     window.alert("😗빈칸을 채워주세요...ㅎㅎ");
  //     return;
  //   }
  // };

  //   let post = {
  //     contents: contents,
  //   };
  //   console.log(post_id);
  //   dispatch(postActions.editPostAPI(post_id, post));
  // };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const editPost = () => {
    if (!contents) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    dispatch(postActions.editPostAPI(props.id, _post));
    // history.replace("/postlist");

    // window.location.reload();
  };

  if (images) {
    console.log("이미지 url", images[0].imgUrl);
  }

  // console.log("이미지 원본", images[1].imgUrl);
  // console.log("이미지 url", images[0].imgUrl);

  const _post = {
    title: title,
    content: contents,
  };

  //캐러셀 모듈 코드
  var settings = {
    dots: true, // 이미지 밑의 점을 출력할 건지 입력
    infinite: true,
    speed: 500, //이미지 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //밑에두면 preview값을 바로 받을 수가 없다?

  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ModalComponent>
        {/* <UploadImg setImage={setImage} /> */}
        <ModalHeader>
          <HeaderInner>
            <ExitContainer>
              <ExitBtn onClick={props.close}>
                취소
                {/* <CloseIcon fontSize="large" /> */}
              </ExitBtn>
            </ExitContainer>
            <ModalLeftHeader>
              <ProCircle
                src={
                  props.profileImg
                    ? props.profileImg
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
              />
              <ModalAuthor>{nickname}</ModalAuthor>
            </ModalLeftHeader>
            <Upload2></Upload2>

            {is_edit ? (
              <HeaderEdit onClick={editPost} onClick={props.close}>
                수정
              </HeaderEdit>
            ) : (
              <HeaderEdit
                onClick={addPost}
                // onClick={props.close}
              >
                게시
              </HeaderEdit>
            )}
            {/* <HeaderEdit
              onClick={addPost}
              // onClick={props.close}
            >
              게시
            </HeaderEdit> */}
          </HeaderInner>
        </ModalHeader>
        {/* 게시물 올릴때랑 수정일때 다르게 return */}

        {/* {is_edit? 수정할 때 : 수정안 할 때 via홀더 보여줌 } */}

        {is_edit ? (
          // images는 처음 useEffect로 뽑아내고 for문이 돌기전에 map이 먼저 실행이 되면 인식을 못해서 images값이 있을때 map함수를 실행할 수 있게 설정
          images && (
            <React.Fragment>
              {images.length > 1 ? (
                <Slider {...settings}>
                  {images.map((p, idx) => {
                    return (
                      <div>
                        <ModalImg src={images[idx].imgUrl} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <ModalImg src={images[0].imgUrl} />
              )}
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            {preview ? (
              preview.length > 1 ? (
                <Slider {...settings}>
                  {preview.map((p, idx) => {
                    return (
                      <div>
                        <ModalImg src={preview[idx]} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <ModalImg src={preview} />
              )
            ) : null}
          </React.Fragment>
        )}

        {/* 수정할때  */}

        <ModalBottomContainer>
          <MiddleBox>
            {is_edit ? (
              <React.Fragment>
                <Title>
                  <Input2
                    id="outlined-multiline-static"
                    // label="📝제목 작성"
                    placeholder={props.title}
                    rows={1}
                    variant="outlined"
                    value={title}
                    _onChange={changeTitle}
                  ></Input2>
                </Title>
                <Input
                  id="outlined-multiline-static"
                  // label="📝제목 작성"
                  placeholder={props.content}
                  rows={6}
                  multiLine
                  variant="outlined"
                  value={contents}
                  _onChange={changeContents}
                ></Input>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Title>
                  <Input2
                    id="outlined-multiline-static"
                    // label="📝제목 작성"
                    placeholder={"제목작성..."}
                    rows={1}
                    variant="outlined"
                    value={title}
                    _onChange={changeTitle}
                  ></Input2>
                  {/* <TextField
                id="outlined-multiline-static"
                label="📝제목 작성"
                multiline
                rows={1}
                variant="outlined"
                value={title}
                onChange={changeTitle}
              /> */}
                </Title>
                <Input
                  id="outlined-multiline-static"
                  // label="📝제목 작성"
                  placeholder={"내용작성..."}
                  rows={6}
                  multiLine
                  variant="outlined"
                  value={contents}
                  _onChange={changeContents}
                ></Input>
              </React.Fragment>
            )}
          </MiddleBox>

          {/* <TextField
            id="outlined-multiline-static"
            label="📝글 작성"
            multiline
            rows={6}
            variant="outlined"
            value={contents}
            onChange={changeContents}
          /> */}
          <SelectCate></SelectCate>

          {/* {is_edit ? (
            <WriteSubmit onClick={editPost} onClick={props.close}>
              게시글 수정
            </WriteSubmit>
          ) : (
            <WriteSubmit
              onClick={addPost}
              // onClick={props.close}
            >
              게시글 작성
            </WriteSubmit>
          )} */}
          {/* <WriteSubmit
            onClick={addPost}
            // onClick={editPost}
            // onClick={props.close}
          >
            게시글 작성
          </WriteSubmit> */}
        </ModalBottomContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const ModalImg = styled.img`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
  background-position: 0px;
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  height: 400px;
  /* max-height: 350px; */
  /* background-color: red; */
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 350px;
    max-height: 42vh;
    margin-bottom: -20px;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 40vh;
    max-height: 40vh;
    margin-bottom: 1vh;
  }
`;

const Component = styled.div`
  position: fixed;
  opacity: 0.8;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalComponent = styled.div`
  border-radius: 0.5vw;
  position: fixed !important;
  width: 590px;
  height: 780px;
  max-height: 780px;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: green;
  background-color: #fafafc;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    /* width: 35vw; */
    width: 470px;
    height: 730px;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: absolute;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */

    border: none;
    box-sizing: border-box;
    z-index: 7000;
  }
  /* @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  /* } */ /////////////// */
`;

const ModalHeader = styled.div`
  /* background-color: red; */
  /* padding: 10px 30px; */
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto auto;
  align-items: center;
  padding: 1.3vh 0px;
  width: 95%;
`;

const HeaderEdit = styled.div`
  color: ${(props) => props.theme.main_color};
  font-weight: bold;
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
`;

const ExitContainer = styled.div`
  z-index: 30;
  font-weight: bold;
  /* top: 0;
  right: 0; */
  /* padding: 5px; */
`;

// color: ${(props) => (props.active ? props.theme.main_color : "grey")};
const ExitBtn = styled.button`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme.main_color};
  font-weight: bold;
  background-color: transparent;
  border: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  /* background-color: red; */
  margin: 0px auto;
  margin-top: 30px;
  text-align: left;
  width: 550px;
  height: 330px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  /* background-color: blue; */

  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 450px;
    // 이거 올려주니까 댓글창이보인다..!
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 5vh;
    /* background-color: red; */
  }

  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 93vw;
    height: 50vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 5vh;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const ProCircle = styled.img`
  margin-left: 0.1vw;
  height: 1.7rem;
  width: 1.7rem;
  border-radius: 20px;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;
const ModalAuthor = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const WriteSubmit = styled.button`
  margin: auto;
  text-align: center;
  font-weight: 600;
  background-color: #0095f6;
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    margin: auto;
    margin-top: 2vh;
    text-align: center;
    font-weight: 600;
    background-color: #0095f6;
    color: white;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* background-color: red; */
`;

const Title = styled.div`
  margin-bottom: 1vh;
`;
const CateBtn = styled.div`
  font-size: bold;
  width: 6.5vw;
  /* border: 1px solid lightgray; */
  height: 3.5vh;
  border-radius: 10px;
`;

export default UploadModal;
