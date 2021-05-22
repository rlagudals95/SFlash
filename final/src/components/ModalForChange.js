// 게시물 작성자와 로그인 한 사용자가 같으면
// 게시물 우측상단의 ... 모양의 버튼이 보이게 하고
// 그걸 누르면 게시물 수정/게시물 삭제가 뜨는 모달창
import React from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

// import {actionCreators as postActions} from "../redux/modules/post"
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

const ModalForCate = (props) => {
  const dispatch = useDispatch();

  // console.log(props);
  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>
      {/* 여기까지는 모달 외부와 우측 상단 x표를 클릭하면 모달창이 없어지게 하는 요소들  */}
      <ModalBox>
        <EditBox
          onClick={(e) => {
            // e.prevent..., e.stopPro.. 이것들로 이벤트 버블링을 막는다
            e.preventDefault();
            e.stopPropagation();
            // 클릭하면 게시물 수정 페이지로 이동
            history.push(`/upload/${props.id}`);
          }}
        >
          게시물 수정
        </EditBox>
        <DeleteBox
          onClick={(e) => {
            // e.prevent..., e.stopPro.. 이것들로 이벤트 버블링을 막는다
            e.preventDefault();
            e.stopPropagation();
            // console.log(props);
            // 클릭하면 게시물 삭제
            dispatch(postActions.deletePostAX(props.id));
          }}
        >
          게시물 삭제
        </DeleteBox>
      </ModalBox>
    </React.Fragment>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.6;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 30;
`;

const ExitContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;
`;
const ExitBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBox = styled.div`
  border: none;
  outline: none;
  position: fixed;
  width: 400px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #fff;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 자식 속성의 div들이 세로로 정렬되게 하는 부분 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  align-items: center;
  z-index: 100;

  @media (max-width: 614px) {
    width: 50%;
    /* height: 50%; */
  }
`;

const EditBox = styled.div`
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 48px;
  color: black;
  font-weight: bold;
  /* 내부 글씨들이 수직방향으로 가운데 정렬되게 하는 태그 */
  display: table;
  line-height: 48px;
  vertical-align: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  /* @media (max-width: 614px) {
    width: 50%;
    height: 50%;
  } */
`;

const DeleteBox = styled.div`
  width: 100%;
  height: 48px;
  color: black;
  font-weight: bold;
  display: table;
  line-height: 48px;
  vertical-align: center;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  /* @media (max-width: 614px) {
    width: 50%;
    height: 50%;
  } */
`;

export default ModalForCate;
