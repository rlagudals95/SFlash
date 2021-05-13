import React, { useState } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image2";
import { actionCreators as profileActions } from "../redux/modules/profile";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Slider from "react-slick";
import UploadImg from "../components/UpLoadModal";
import { useDispatch, useSelector } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
// 업로드용 파일선택 버튼
import Upload2 from "../shared/Upload2";
// 수정용 파일선택 버튼
import UploadEdit from "../shared/UploadEdit";
import SelectCate from "./SelectCate";
import Input from "../elements/Input";
import Input2 from "../elements/Input2";
import { CgLogOut } from "react-icons/cg";

const UploadModal = (props) => {
  const { latitude, longitude, spotName } = props;
  const userId = localStorage.getItem("userId");

  React.useEffect(() => {
    if (is_edit) {
      // dispatch(imageActions.resetEdit([])); //
      dispatch(imageActions.getPost(props.id));

      console.log("hi");
    }
    dispatch(profileActions.getUserInfoAPI(userId));
  }, []);

  // console.log(
  //   "위도: " +
  //     latitude +
  //     " , " +
  //     "경도: " +
  //     longitude +
  //     " , " +
  //     "장소이름 : " +
  //     spotName
  // );

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image2.preview);
  // 수정 페이지 이미지
  const onlyImg = useSelector((state) => state.image2.image);

  // 수정 페이지에서 추가한 이미지 파일 (서버로 보내주기 위해 저장)
  const editFile = useSelector((state) => state.image2.edit_file);

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.profile.user);
  console.log("유저아이디", userId);
  console.log("포스트리스트", post_list);
  console.log("유저정보", user_info);
  console.log("유저프로필", profile);
  // console.log("서버로 보내줄 수정파일", editFile[0]);
  // console.log("서버로 보내줄 수정파일", editFile[1]);
  // console.log("서버로 보내줄 수정파일", editFile[2]);
  // console.log("서버로 보내줄 수정파일", editFile[3]);
  // console.log(preview);

  const [contents, setContents] = React.useState(props.content);
  const [title, setTitle] = React.useState(props.title);
  const [images, setImages] = React.useState(false);

  const [image_list, setImageList] = React.useState();
  const is_file = useSelector((state) => state.image2.file);
  console.log("이미지는 최소한장!", is_file);
  // const post_id = props.match.params.id;
  const is_edit = props.id ? true : false; //게시글 작성시 props로 id를 받냐 안받냐 차이
  // console.log("수정 게시물 정보", props);
  // console.log("수정 화면 이미지들", images);
  const nickname = localStorage.getItem("nickname");
  const editImgList = useSelector((state) => state.image2.edit); // 요걸 가져와야해
  // const editImage = useSelector((state) => state.image2.image);
  const deleteId = useSelector((state) => state.image2.id);
  const is_category = useSelector((state) => state.category.select_category);

  // console.log("카테고리 선택했니?", is_category);
  // console.log("삭제된 id", deleteId);
  // console.log("서버로 보내줄 수정파일(에딧 파일)", editFile); // 수정중 다시 맘에 안들어서 삭제하고 싶다면 여길 수정
  // console.log("온리이미지~!~!~!!", onlyImg); //
  // console.log("고치자 ㅜㅜ", editImgList); // 수정하는 포스트리스트가 온다 map으로 이미지 돌리자
  // console.log(editImgList.img_url); // 수정해야하는 이미지 리스트
  const ok_submit = contents ? true : false;

  const addPost = (e) => {
    if (!is_file) {
      window.alert("😗사진은 최소 1장 이상 업로드 해주세요!");
      return;
    }
    if (!contents) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    if (!title) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    if (!is_category) {
      window.alert("😗카테고리를 선택해주세요...ㅎㅎ");
      return;
    }

    //카테고리 선택 조건

    let post = {
      title: title,
      content: contents,
      latitude: props.latitude,
      longitude: props.longitude,
      spotName: props.spotName,
    };
    // console.log(post);
    if (is_file) {
      dispatch(postActions.addPostAPI(post));
    } else {
      window.alert("😗사진은 최소 1장 이상 업로드 해주세요!");
      return;
    }

    // closeModal();
    props.close();
    // history.replace("/");
  };

  const editPost = () => {
    if (!contents) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    if (!title) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    if (onlyImg.length == 0) {
      window.alert("😗사진을 최소 1장 이상 업로드 해주세요!");
      return;
    }
    if (onlyImg.length > 5) {
      window.alert("😗사진은 최대 5장까지 업로드 가능합니다...ㅎㅎ");
      return;
    }
    let edit = {
      title: title,
      contents: contents,
    };
    dispatch(postActions.editPostAPI(props.id, edit));
    props.close();

    dispatch(imageActions.resetEdit([])); //업로드 후 리덕스에 남은 수정 정보 모두 리셋
    //에딧파일 초기화...
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  if (images.length == 0) {
    images.push("http://via.placeholder.com/400x300");
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
                <CloseIcon fontSize="large" />
              </ExitBtn>
            </ExitContainer>
            <ModalLeftHeader>
              <ProCircle
                src={
                  is_edit
                    ? props.profileImg
                      ? props.profileImg
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    : profile.profileImgUrl
                }
              />
              <ModalAuthor>{nickname}</ModalAuthor>
            </ModalLeftHeader>
            {/* 업로드와 수정시 파일선택 버튼이 다르게 설정 */}

            {/* {is_edit ? (
              <HeaderEdit onClick={editPost}>수정</HeaderEdit>
            ) : (
              <HeaderEdit onClick={addPost}>게시</HeaderEdit>
            )} */}
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
        {is_edit ? <UploadEdit /> : <Upload2 />}
        {is_edit ? (
          onlyImg && (
            <React.Fragment>
              {onlyImg.length >= 1 ? (
                <Slider {...settings}>
                  {onlyImg.map((p, idx) => {
                    return (
                      <div>
                        {/* imgUrl이 없다면?! */}
                        <ModalImg
                          // 수정 중에 추가한 이미지엔 imgUrl이 없고 파일리더로 읽은 값만 있기 때문에 src에 그냥 값을 넣어주도록 조건설정
                          src={
                            onlyImg[idx].imgUrl
                              ? onlyImg[idx].imgUrl
                              : onlyImg[idx] // 파일리더로 읽은값 그대로 src에 삽입
                          }
                        >
                          <DeleteImg
                            onClick={() => {
                              dispatch(
                                // 서버로 삭제한 이미지 id 보내주기 위해 작성
                                imageActions.getDeleteId(onlyImg[idx].imgUrlId)
                              );
                              //미리 등록해둔 이미지가 있는 경우엔 imgUrlId값이 있어 그것으로 삭제가능
                              if (onlyImg[idx].imgUrlId) {
                                dispatch(
                                  imageActions.deleteImage(
                                    onlyImg[idx].imgUrlId
                                  )
                                );
                              } else {
                                dispatch(
                                  imageActions.deleteImageIdx(onlyImg[idx]) //asdjuifhuiawefhuiewbhfiubawefbiuewabiuf
                                );
                                //파일 삭제하는 액션

                                // dispatch(

                                // );
                              }

                              dispatch(imageActions.deleteFileIdx(idx));
                              // 수정시 등록하는 사진에는 id값이 없어서 직접 값을 비교해서 삭제해줌
                              // console.log("주목!!", onlyImg[idx]);
                              console.log(
                                "몇번 이미지인가?",
                                idx, // 몇번 이미지인가와
                                onlyImg[idx].imgUrlId //이미지 id
                              );
                            }}
                          >
                            삭제
                          </DeleteImg>
                        </ModalImg>
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <ModalImg
                  onClick={() => {
                    console.log(
                      "몇번 이미지인가?"
                      // editImgList.img_url[0].imgUrl
                    );
                  }}
                  src={"http://via.placeholder.com/400x300"}
                />
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
                        <ModalImg src={preview[idx]}></ModalImg>
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
              <EditCommentBox>
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
              </EditCommentBox>
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
          {/* 카테고리는 수정할 수 없기때문에 게시글 수정 모달에선 가려준다 */}
          {is_edit ? null : <SelectCate></SelectCate>}
          {is_edit ? (
            <BottomEdit2 onClick={editPost}>수정하기</BottomEdit2>
          ) : (
            <BottomEdit onClick={addPost}>게시하기</BottomEdit>
          )}
        </ModalBottomContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const BottomEdit = styled.div`
  color: ${(props) => props.theme.main_color};
  font-weight: bold;
  /* background-color: ${(props) => props.theme.main_color}; */
  border: 2px solid ${(props) => props.theme.main_color};
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 12px 0px;
  border-radius: 7px;
  margin: 15px 0px;
  box-sizing: border-box;
  :hover {
    background-color: ${(props) => props.theme.main_color};
    color: white;
  }
  @media (max-width: 1440px) {
  }
  @media (max-width: 600px) {
  }
`;
const BottomEdit2 = styled.div`
  color: ${(props) => props.theme.main_color};
  font-weight: bold;
  /* background-color: ${(props) => props.theme.main_color}; */
  border: 2px solid ${(props) => props.theme.main_color};
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 12px 0px;
  border-radius: 7px;
  margin: 15px 0px;
  box-sizing: border-box;
  :hover {
    background-color: ${(props) => props.theme.main_color};
    color: white;
  }
  @media (max-width: 1440px) {
    margin: 15px 0px;
  }
  @media (max-width: 600px) {
  }
`;

const DeleteImg = styled.div`
  z-index: 4700;
  text-align: center;
  position: relative;
  background-color: red;
  width: 50px;
  top: 15px;
  right: -15px;
  padding: 3px 8px;
  background-color: white;
  color: rgba(0, 0, 0, 0, 0.1);
  opacity: 0.5;
  border-radius: 5px;
  font-weight: bold;
  font-size: 13px;
  /* border: 1px solid rgba(0, 0, 0, 0, 0.08); */
  cursor: pointer;
`;

const ModalImg = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
  background-position: 0px;
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 410px;
  max-height: 350px;
  /* background-color: red; */
  @media (max-width: 1440px) {
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 630px;
    max-height: 330px;
    margin-bottom: -20px;
  }
  @media (max-width: 1155px) {
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 320px;
    max-height: 320px;
    /* height: 465px;
    max-height: 465px; */
    margin-bottom: -20px;
  }
  @media (max-width: 600px) {
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 600px;
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
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */

    z-index: 6999;
  }
`;

const ModalComponent = styled.div`
  border-radius: 0.5vw;
  position: fixed !important;
  width: 590px;
  height: 820px;
  max-height: 820px;
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
  @media (max-width: 1155px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    /* width: 35vw; */
    width: 470px;
    height: 780px;
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
  margin: 0px auto;
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
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
  opacity: 0.5;
`;

// color: ${(props) => (props.active ? props.theme.main_color : "grey")};
const ExitBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.main_color};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  /* background-color: red; */
  margin: 0px auto;
  margin-top: 30px;
  text-align: left;

  width: 550px;
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;

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
  @media (max-width: 1155px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 450px;
    // 이거 올려주니까 댓글창이보인다..!
    height: 370px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 5vh;
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
    margin-top: 2vh;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const EditCommentBox = styled.div``;

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

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 255px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    height: 235px;
    /* background-color: red; */
  }
  /* justify-content: space-between; */
  /* background-color: red; */
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    height: 220px;
  }
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
