import React, { useState } from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Slider from "react-slick";
import UploadModal from "./UpLoadModal";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as CommnetActions } from "../redux/modules/comment";
import { actionCreators as likeActions } from "../redux/modules/like";
import { forEach } from "lodash";

const ModalDetail = (props) => {
  const dispatch = useDispatch();
  // React.useEffect(() => {}, []);

  // console.log("모달 프롭스", props);
  // const commnet_list = props.comment_list  // 이렇게 받아오면 되려나?
  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현
  const [is_Editmodal, setEditModal] = useState();

  // const is_like = props.like 라이크가 있냐 확인?

  const openEditModal = () => {
    setEditModal(true);
  };
  const closeDetailModal = () => {
    setEditModal(false);
  };

  //캐러셀 모듈 코드
  var settings = {
    dots: true, // 이미지 밑의 점을 출력할 건지 입력
    infinite: true,
    speed: 500, //이미지 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 받아온 이미지들
  let image_list = [];

  for (let i = 0; i < props.img_url.length; i++) {
    image_list.push(props.img_url[i]);
  }

  let images = [];

  image_list.forEach((img) => {
    images.push(img.imgUrl);
  });

  console.log("이미지들!!", images);
  // const image = image_list[0];

  // console.log("이미지!", image);

  // const a = image_list.forEach((img) => {
  //   img.imgUrl;
  //   console.log(img.imgUrl);
  // });

  // console.log(a);

  // console.log("이미지s", images);
  // let images = [];

  // for (let i = 0; i < image_list.length; i++) {
  //   images.push(props.image_list[i]);
  // }

  //이게 서버에서 받아온 코멘트들
  let comment_list = [];
  for (let i = 0; i < props.comment.length; i++) {
    comment_list.push(props.comment[i]);
  }

  console.log("코멘트", comment_list);

  //가짜 코멘트 리스트
  const commentList = props.comment;

  const is_comment = comment_list ? true : false;
  const [comments, setComments] = useState();
  const ok_submit = comments ? true : false;

  const addLike = () => {
    dispatch(likeActions.addLikeAPI(props.id));
  };

  const disLike = () => {
    dispatch(likeActions.disLikeAPI(props.id));
  };

  const getCommnet = () => {
    //작성한 댓글 내용 디스패치로 보낸다~
    dispatch(CommnetActions.addCommentAPI(comments, props.id));
  };

  // console.log("댓글 내용", comments);
  console.log("보드 아이디", props.id);
  const selectComment = (e) => {
    setComments(e.target.value);
  };

  //////////////////////////////////////////////////////////////////////////////////
  //이미지 스타일 컴포넌트 다른 위로 올려서 props로 이미지를 바로 받는게 좋은 것 같다

  const ModalImg = styled.img`
    background-image: url(${props.images});
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 42.5vh;
    max-height: 350px;
    @media (max-width: 1440px) {
      /* 1450밑으로 넓이가 내려가면 */
      /* all: unset; */
      background-image: url(${props.images});
      background-size: cover;
      object-fit: cover;
      background-position: 0px;
      background-repeat: no-repeat;
      border: none;
      box-sizing: border-box;
      width: 100%;
      height: 35vh;
    }
    @media (max-width: 600px) {
      /* 1450밑으로 넓이가 내려가면 */
      /* all: unset; */
      background-image: url(${props.images});
      background-size: cover;
      object-fit: cover;
      background-position: 0px;
      background-repeat: no-repeat;
      border: none;
      box-sizing: border-box;
      width: 100%;
      height: 40vh;
    }
  `;

  //작성 날짜 설정하기
  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />

      <ModalComponent>
        <ModalHeader>
          <ModalLeftHeader>
            <ProCircle src={props.profile_image_url} />
            <ModalAuthor>username</ModalAuthor>
            <PostDate>방금 전{/* {timeForToday(props.insert_dt)} */}</PostDate>
            <ExitContainer>
              <ExitBtn onClick={props.close}>
                <CloseIcon fontSize="large" />
              </ExitBtn>
            </ExitContainer>
          </ModalLeftHeader>
          {/* {props.user_id === props.is_me ? (
              <ModalRightHeader onClick={props.openChangeModal}>
                <MoreHorizIcon height="14px" width="14px" cursor="pointer" />
              </ModalRightHeader>
            ) : null} */}
        </ModalHeader>
        {/* 이미지 슬라이드 구현 props로 받는 이미지의 개수가 1개를 초과할때  */}
        {/* 그 수만큼 map함수로 출력해준다 */}
        {images.length > 1 ? (
          <Slider {...settings}>
            {images.map((p, idx) => {
              return (
                <div>
                  <ModalImg src={images[idx]} />
                </div>
              );
            })}
          </Slider>
        ) : (
          <ModalImg src={images[0]} />
        )}

        <ModalBottomContainer>
          <InfoBox>
            <InfoBoxInner>
              {/*is_like 여부로 하트모양 변경  */}
              {props.like ? (
                <div>
                  {" "}
                  <FavoriteIcon onClick={disLike} style={{ color: "red" }} />
                  {props.likeCnt}
                </div>
              ) : (
                <div>
                  <FavoriteBorderIcon onClick={addLike} />
                  {props.likeCnt}
                </div>
              )}

              {/* 작성자 에게만 보이게 설정  */}
              <ModalEdit>
                <React.Fragment onClick={props.close}>
                  <EditBtn
                    onClick={() => {
                      setEditModal(true);
                    }}
                  >
                    수정
                  </EditBtn>
                </React.Fragment>
                /
                <DeleteBtn
                  onClick={(e) => {
                    // e.prevent..., e.stopPro.. 이것들로 이벤트 버블링을 막는다
                    e.preventDefault();
                    e.stopPropagation();
                    // 클릭하면 게시물 삭제
                    dispatch(postActions.deletePostAPI(props.id));
                  }}
                >
                  삭제
                </DeleteBtn>
              </ModalEdit>
            </InfoBoxInner>
            <React.Fragment>
              <PostTilte>{props.title}</PostTilte>
              <PostContents>{props.content}</PostContents>
              <PostTime>방금전</PostTime>
            </React.Fragment>
          </InfoBox>
          <ModalCmtBox>
            {is_comment
              ? comment_list.map((c, idx) => {
                  //여기서 댓글을 입력하고 map으로 props 값을 돌려서 화면을 띄우게 해줌

                  //댓글이 2개보다 작다면? 1개라면?
                  return (
                    <ReplyBox>
                      <Replys>
                        <ReplyLeft>
                          <ReplyImg src={c.writerImgUrl}></ReplyImg>
                          <ReplyWriter>{c.writerName}</ReplyWriter>
                          <Reply>{c.content}</Reply>
                        </ReplyLeft>
                        <ReplyRight>
                          <CmtDate>
                            {/* 방금 전 */}
                            {timeForToday(c.modified)}
                          </CmtDate>
                          <CmtDeleteBtn>
                            <DeleteForeverIcon />
                          </CmtDeleteBtn>
                        </ReplyRight>
                      </Replys>
                    </ReplyBox>
                  );
                })
              : null}
          </ModalCmtBox>
          <ModalCmtInputBox>
            <CommentInput
              type="text"
              placeholder="댓글달기..."
              onChange={selectComment}
              value={comments}
            />
            {ok_submit ? (
              <UploadBtn onClick={getCommnet}>게시</UploadBtn>
            ) : (
              <UploadBtn style={{ opacity: "0.3" }}>게시</UploadBtn>
            )}
          </ModalCmtInputBox>
        </ModalBottomContainer>
      </ModalComponent>
      {is_Editmodal ? (
        <UploadModal close={closeDetailModal} {...props} />
      ) : null}
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalComponent = styled.div`
  position: fixed !important;
  width: 580px;
  height: 830px;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    width: 35vw;
    height: 67vh;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;
  }
  /* @media (max-width: 1210px) {
    position: fixed;
    width: 35vw;
    height: 67vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border: none;
    box-sizing: border-box;
  } */

  @media (max-width: 1030px) {
    // 1210밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    width: 50vw;
    height: 67vh;
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
    z-index: 1000;
    border: none;
    box-sizing: border-box;

    z-index: 7000;
  }
  /* @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  } */
`;

const ExitContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
`;

const ExitBtn = styled.button`
  cursor: pointer;
  color: lightgray;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  text-align: left;
  width: 550px;
  height: 39.5vh;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  margin: 0px auto;
  /* @media (max-width: 1600px) {
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 100%;
    height: 340px; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  } */

  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 100%;
    height: 30vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 100%;
    height: 50vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const ModalHeader = styled.div`
  padding: 1.5vh;
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

// const ModalRightHeader = styled.div`
//   cursor: pointer;
// `;

const ProCircle = styled.img`
  margin-left: 0.1vw;
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 50%;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;
const ModalAuthor = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
`;

const PostDate = styled.span`
  font-size: 0.3rem;
  opacity: 0.3;
  padding-top: 0.35vh;
`;
const InfoBox = styled.div`
  width: 100%;
  height: 20vh;
  text-align: left;
  margin: 0px auto;
  border-bottom: 1px solid #efefef;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 2vw); //패딩대신... 오,....
    height: 15.5vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }

  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 7vw); //패딩대신... 오,....
    height: 18vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
`;

const InfoBoxInner = styled.div`
  width: 550px; //요놈 크기 바꿔
  height: 33px;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: 100%;
    height: 20vh;
    padding: 0px;
  }
`;

const ModalEdit = styled.div`
  opacity: 0.5;
  font-size: 0.8rem;
`;

const PostTilte = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 550px;
  margin-bottom: 10px;
`;
const PostContents = styled.div`
  font-size: 0.9rem;
  opacity: 0.6;
  width: 550px;
  margin-top: 3px;
`;

const PostTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.4;
  margin: 15px 0px 8px 0px;
`;
const ModalCmtInputBox = styled.div`
  align-items: center;
  margin-bottom: -4.5vh;
  width: 100%;
  height: 7vh;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  box-sizing: border-box;
  border: 2px solid #efefef;
  background-color: white;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    height: 10vh;
  }
  @media (max-width: 1100px) {
    // 1450밑으로 넓이가 내려가면
    height: 7vh;
  }

  @media (max-width: 600px) {
    height: 6vh;
  }
`;

const ModalCmtBox = styled.div`
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  height: 38vh;
  background-color: white;

  /* 아래 태그는 댓글이 많으면 
  스크롤로 아래 부분이 위로 올라가게 해서 
  댓글이 보여지게 함 */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    flex-direction: column;

    padding: 0px 14px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReplyBox = styled.div`
  /* padding: 5px 25px 0px 0px; */
  align-items: center;
  /* margin-left: -12px; */
  width: 100%;
  margin: auto auto;
`;

const Replys = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3vh;
  @media (max-width: 1440px) {
    /* background-color: red; */
    display: flex;
    align-items: center;
    margin-top: 1vh;
    justify-content: space-between;
    height: 3vh;
  }
`;
const ReplyImg = styled.div`
  height: 3vh;
  width: 3vh;
  border-radius: 50%;
  background-size: cover;
  margin-right: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;

const ReplyWriter = styled.div`
  font-size: 1.5vh;
  font-weight: bold;
  padding-right: 10px;
`;

const Reply = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ReplyLeft = styled.div`
  align-items: center;
  display: flex;
`; // space-between 효과 주기위해서 쓴다
const ReplyRight = styled.div`
  display: flex;
`;

const CmtDate = styled.div`
  font-size: 0.2rem;
  margin: auto 0;
  opacity: 0.3;
`;

const CmtDeleteBtn = styled.button`
  height: 0.3vh;
  width: 0.3vh;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  opacity: 0.2;
  margin-right: 1.3vw;
  margin-bottom: 2.3vh;
  &:hover {
    opacity: 1;
  }
`;
const CommentInput = styled.input`
  background: white;
  border: none;
  outline: none;
  width: 100%;
  padding: auto 0px;
  background-color: white;
`;
const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
  width: 30px;
  margin-right: 1vw;
  /* margin: 10px 5px 0px 0px; */
  /* padding-bottom: 5px; */
  /* width: 30px;
  @media (max-width: 1440px) {
   
    margin: 5px 5px 0px 0px;
  }
  @media (max-width: 600px) {
    
    margin: 10px 5px 0px 0px;
    width: 40px;
  } */
`;

const EditBtn = styled.span`
  cursor: pointer;
`;

const DeleteBtn = styled.span`
  margin-left: 1px;
  cursor: pointer;
`;

export default ModalDetail;
