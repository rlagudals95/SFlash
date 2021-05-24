import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import CloseIcon from "@material-ui/icons/Close";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Slider from "react-slick";
import UploadPostModal from "./UploadPostModal";
import { actionCreators as storyPostModalActions } from "../../redux/modules/storypostmodal";
import { actionCreators as storyPostActions } from "../../redux/modules/storypost";
import { actionCreators as profileActions } from "../../redux/modules/profile";
import { actionCreators as ModalActions } from "../../redux/modules/storypostmodal";
import { history } from "../../redux/configStore";
import Spinner from "../../shared/Spinner";

const ModalDetail = (props) => {
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickname");
  const user_id = localStorage.getItem("userId");

  const modalData = useSelector((state) => state.mapmodal.post);
  const commentData = useSelector((state) => state.mapmodal.comment); //코멘트를 가져온다
  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현

  console.log(modalData);

  if (commentData) {
  }
  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현
  const [is_Editmodal, setEditModal] = useState();
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

  const [comments, setComments] = useState();
  const ok_submit = comments ? true : false;

  const addLike = () => {
    dispatch(ModalActions.modalAddLikeAPI(modalData.id, modalData));
  };
  const disLike = () => {
    dispatch(ModalActions.modalDisLikeAPI(modalData.id, modalData));
  };

  const addComment = () => {
    dispatch(ModalActions.modalAddCommentAPI(comments, modalData.id));
    setComments("");
  };
  const deleteComment = (id) => {
    dispatch(ModalActions.modalDeleteCommentAPI(id));
  };

  console.log("모달내용", modalData);

  const selectComment = (e) => {
    setComments(e.target.value);
  };

  const closeModal = (e) => {
    dispatch(ModalActions.resetModal(false));
    props.close();
  };

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
  //새로운 데이터가 들어올땐 어떻게 해야할까...?
  return (
    <React.Fragment>
      {modalData ? (
        commentData && ( //모달데이터가 들어와야 실행!
          <React.Fragment>
            <Component onClick={closeModal} />
            <ModalComponent>
                <ModalTopContainer>
                  <ProfileContainer>
                    <ProCircle
                      src={
                        modalData.profileImg
                          ? modalData.profileImg
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      onClick={() => {
                        history.push(`/story/${modalData.writerId}`);
                        dispatch(storyPostActions.resetStory([]));
                        dispatch(profileActions.resetProfile([]));
                        dispatch(
                          profileActions.getUserInfoAPI(modalData.writerId)
                        );
                        dispatch(
                          storyPostActions.getUserPostAPI(modalData.writerId)
                        );
                        dispatch(
                          storyPostActions.getUserLikeAPI(modalData.writerId)
                        );
                      }}
                    />
                    <ModalAuthor
                      onClick={() => {
                        history.push(`/story/${modalData.writerId}`);
                        dispatch(storyPostActions.resetStory([]));
                        dispatch(profileActions.resetProfile([]));
                        dispatch(
                          profileActions.getUserInfoAPI(modalData.writerId)
                        );
                        dispatch(
                          storyPostActions.getUserPostAPI(modalData.writerId)
                        );
                        dispatch(
                          storyPostActions.getUserLikeAPI(modalData.writerId)
                        );
                      }}
                    >
                      {modalData.writerName}
                    </ModalAuthor>
                  </ProfileContainer>

                  <CloseButton onClick={closeModal}>
                    <CloseIcon size="1.5vh" />
                  </CloseButton>
                </ModalTopContainer>

                {/* 이미지 슬라이드 구현 props로 받는 이미지의 개수가 1개를 초과할때  */}
                {/* 그 수만큼 map함수로 출력해준다 */}
                {modalData.img_url[0].imgUrl && modalData.img_url.length > 1 ? ( // 이미지가 없을때 에러뜨는 것을 방지
                  <Slider {...settings}>
                    {modalData.img_url.map((p, idx) => {
                      return (
                        <div>
                          <ModalImg
                            src={
                              modalData.img_url[0].imgUrl &&
                              modalData.img_url[idx].imgUrl
                            }
                          />
                        </div>
                      );
                    })}
                  </Slider>
                ) : (
                  <ModalImg
                    src={
                      modalData.img_url[0].imgUrl && modalData.img_url[0].imgUrl
                    }
                  />
                )}

                <ModalBottomContainer>
                  <InfoBox>
                    <InfoBox_1>
                      {/*is_like 여부로 하트모양 변경  */}
                      {modalData.like ? (
                        <LikeBox>
                          <div style={{ cursor: "pointer" }}>
                            {/* 좋아요 상태에 따라서 하트 모양의 조건부 렌더 */}
                            <FavoriteIcon
                              onClick={disLike}
                              style={{
                                color: "rgb(255, 183, 25)",
                                fontSize: 32,
                              }}
                            />
                            <LikeCntBox> {modalData.likeCnt}</LikeCntBox>
                          </div>
                        </LikeBox>
                      ) : (
                        <LikeBox>
                          <div style={{ cursor: "pointer" }}>
                            <FavoriteBorderIcon
                              style={{
                                fontSize: 32,
                                color: "rgb(255, 183, 25)",
                              }}
                              onClick={addLike}
                            />
                            <LikeCntBox> {modalData.likeCnt}</LikeCntBox>
                          </div>
                        </LikeBox>
                      )}
                      {/*--------------------------------------------------------------------- */}

                      {/* 게시물 수정과 삭제 버튼은 작성자 에게만 보이게 설정  */}
                      {modalData.writerId == user_id ? (
                        <ModalEdit>
                          <React.Fragment onClick={props.close}>
                            <EditBtn onClick={openEditModal}>수정</EditBtn>
                          </React.Fragment>
                          /
                          <DeleteBtn
                            onClick={(e) => {
                              Swal.fire({
                                text: "게시물을 삭제 하시겠습니까?",
                                icon: "question",
                                confirmButtonText: "예",
                                confirmButtonColor: "#ffb719",
                                showCancelButton: true,
                                cancelButtonText: "아니오",
                                cancelButtonColor: "#eee",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  dispatch(
                                    storyPostModalActions.deleteStoryPostAPI(
                                      modalData.id
                                    )
                                  );
                                  props.close(); 
                                }
                              });
                            }}
                          >
                            삭제
                          </DeleteBtn>
                        </ModalEdit>
                      ) : (
                        <ModalCate>#{modalData.category}</ModalCate>
                      )}
                    </InfoBox_1>

                    {/*--------------------------------------------------------------------- */}
                    <InfoBox_2>
                      <PostTilte>
                        {modalData.title}{" "}
                        <PostDate>{timeForToday(modalData.creatAt)}</PostDate>
                      </PostTilte>
                      <PostContents>{modalData.content}</PostContents>
                      <PostTime>{modalData.spotName}</PostTime>
                    </InfoBox_2>
                  </InfoBox>

                  {/*--------------------------------------------------------------------- */}
                  <ModalCmtBox>
                    {commentData &&
                      commentData.map((c, idx) => {
                        //여기서 댓글을 입력하고 map으로 props 값을 돌려서 화면을 띄우게 해줌
                        //댓글이 2개보다 작다면? 1개라면?
                        return (
                          <ReplyBox>
                            <ReplyUnit>
                              <ReplyLeft>
                                <>
                                  <ReplyImg
                                    src={
                                      //댓글 작성자가 아직 프로필 이미지를 등록 안했을 경우엔 기본이미지를 보여주도록 설정
                                      c.writerImgUrl
                                        ? c.writerImgUrl
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                    }
                                    onClick={() => {
                                      history.push(`/story/${c.userId}`);
                                      dispatch(storyPostActions.resetStory([]));
                                      dispatch(profileActions.resetProfile([]));
                                      dispatch(
                                        profileActions.getUserInfoAPI(c.userId)
                                      );
                                      dispatch(
                                        storyPostActions.getUserPostAPI(
                                          c.userId
                                        )
                                      );
                                      dispatch(
                                        storyPostActions.getUserLikeAPI(
                                          c.userId
                                        )
                                      );
                                    }}
                                  ></ReplyImg>
                                  <ReplyWriter
                                    onClick={() => {
                                      history.push(`/story/${c.userId}`);
                                      dispatch(storyPostActions.resetStory([]));
                                      dispatch(profileActions.resetProfile([]));
                                      dispatch(
                                        profileActions.getUserInfoAPI(c.userId)
                                      );
                                      dispatch(
                                        storyPostActions.getUserPostAPI(
                                          c.userId
                                        )
                                      );
                                      dispatch(
                                        storyPostActions.getUserLikeAPI(
                                          c.userId
                                        )
                                      );
                                    }}
                                  >
                                    {c.writerName}
                                  </ReplyWriter>
                                </>
                                <ReplyContent>{c.content}</ReplyContent>
                                <ReplyDate>
                                  {" "}
                                  {timeForToday(c.modified)}
                                </ReplyDate>
                              </ReplyLeft>

                              {nickname == c.writerName ? (
                                <Icon
                                  onClick={() => {
                                    Swal.fire({
                                      text: "댓글을 삭제 하시겠습니까?",
                                      confirmButtonText: "예",
                                      confirmButtonColor: "#ffb719",
                                      showCancelButton: true,
                                      cancelButtonText: "아니오",
                                      cancelButtonColor: "#eee",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteComment(c.commentId);
                                      }
                                    });
                                  }}
                                >
                                  <RiDeleteBinLine size="20" />
                                </Icon>
                              ) : 
                              null}
                            </ReplyUnit>
                          </ReplyBox>
                        );
                      })}
                       <ModalCmtInputBox>
                      <CommentInput
                        type="text"
                        placeholder="댓글달기..."
                        onChange={selectComment}
                        value={comments}
                      />
                      {ok_submit ? (
                        <UploadBtn onClick={addComment}>게시</UploadBtn>
                      ) : (
                        <UploadBtn style={{ opacity: "0.3" }}>게시</UploadBtn>
                      )}

                      {is_Editmodal ? (
                        <UploadPostModal
                          close={closeDetailModal}
                          {...modalData}
                          modal={"modal"}
                        />
                      ) : null}
                    </ModalCmtInputBox>
                  </ModalCmtBox>

                </ModalBottomContainer>
            </ModalComponent>
          </React.Fragment>
        )
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

const ModalImg = styled.img`
  all: unset;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
  border: none;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 4/3;
  background-position: center;
`;

const Component = styled.div`
  position: fixed;
  opacity: 0.8;
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
  border-radius: 0.5vw;
  position: fixed;
  width: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafc;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  margin: auto;
  max-height: 90%;
  overflow-y: auto;
    @media (max-width: 1280px) {
      width: 768px;
    }
    @media (max-width: 768px) {
      width:97%
    }
    @media (max-width: 480px) {
      width: 100vw;
      height: 100vh;
      border-radius: none;
    }
`;
// 모둘 상단부(프로필)-------------------------------------
const ModalTopContainer = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;

const ProCircle = styled.div`
  height: 55px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.src}");
  cursor: pointer;
`;

const ModalAuthor = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  padding-left: 10px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  border-radius: 50%;
  z-index: 100;
  color: lightgrey;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: grey;
  }
`;

// 상세-------------------------------------
const ModalBottomContainer = styled.div`
  text-align: left;
  width: 93%;
  display: flex;
  margin: 10px auto;
  flex-direction: column;
`;

const InfoBox = styled.div`
  width: 100%;
  text-align: left;
  margin: 0px auto;
  padding-top: 5px;
  border-bottom: 1px solid #efefef;
`;

// 좋아요 + 수정/삭제  or 카테고리 -------------------------------------

const InfoBox_1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeBox = styled.div`
  align-items: center;
  display: flex;
`;

const LikeCntBox = styled.div`
  position: absolute;
  display: inline-flex;
  font-size: 1.3rem;
  opacity: 0.7;
  margin-left: 5px;
  top: -10;
`;

const ModalEdit = styled.div`
  opacity: 0.5;
  font-size: 1.1rem;
`;

const EditBtn = styled.span`
  cursor: pointer;
`;

const DeleteBtn = styled.span`
  margin-left: 1px;
  cursor: pointer;
`;

const ModalCate = styled.div`
  background-color: white;
  width: 80px;
  height: 24px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1.1rem;
  padding: 8px 10px;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0.1, 0.1, 0.2);
`;

// 제목, 내용, 시간, 주소-------------------------------------

const InfoBox_2 = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const PostTilte = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostDate = styled.span`
  opacity: 0.5;
  font-size: 1rem;
  margin-left: 10px;
`;

const PostContents = styled.div`
  font-size: 1.2rem;
  opacity: 0.6;
  width: 100%;
`;

const PostTime = styled.div`
  font-size: 1rem;
  opacity: 0.6;
  margin: 15px 0px;
`;

// 댓글--------------------------------------------

const ModalCmtBox = styled.div`
  justify-content: space-between;
  height: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  /* 아래 태그는 댓글이 많으면 
  스크롤로 아래 부분이 위로 올라가게 해서 
  댓글이 보여지게 함 */
  overflow-y: scroll;
  min-height: 30px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1440px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReplyBox = styled.div`
  align-items: center;
  width: 100%;
`;

const ReplyUnit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0px;
`;

const ReplyLeft = styled.div`
  align-items: center;
  display: flex;
`;

const ReplyImg = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  cursor: pointer;
`;

const ReplyWriter = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
`;

const ReplyContent = styled.div`
  font-size: 1.1rem;
  margin-left: 10px;
`;

const ReplyDate = styled.div`
  opacity: 0.5;
  font-size: 1rem;
  margin-left: 10px;
`;

const Icon = styled.div`
  margin-left: 0px;
  padding: 0px 9px;
  color: grey;
  &:hover {
    color: lightgrey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

const ModalCmtInputBox = styled.div`
  position: relative;
  bottom:0;
  margin: 20px 0px;
  width: 100%;
  align-items: center;
  display: flex;
  box-sizing: border-box;
  border: 2px solid #efefef;
  box-shadow: 1px 1px 3px 1px rgba(0, 0.1, 0.1, 0.1);
`;

const CommentInput = styled.input`
  background: white;
  font-size: 1.1rem;
  padding: 12px;
  border: none;
  outline: none;
  width: 100%;
`;

const UploadBtn = styled.div`
  font-size: 1.1rem;
  color: ${(props) => props.theme.main_color};
  background-color: #ffffff;
  cursor: pointer;
  padding: 0px 20px;
  font-weight: 400;
  word-break: keep-all;
`;

export default ModalDetail;
