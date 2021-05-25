import React from "react";
import styled from "styled-components";

const MobileNot = (props) => {
  return (
    <React.Fragment>
      <Wrap>
        <Mobile>
          <MobileText>
            모바일 페이지는 추후 배포예정 입니다 pc웹으로 방문해주시면
            감사하겠습니다
          </MobileText>
        </Mobile>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #343a40;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 77777;
`;

const Mobile = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 40%;
  /* margin: auto; */
  height: 300px;
  width: 300px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/SFlashLogoDark.png?alt=media&token=f1f6e54f-4058-41ff-9c58-d5c0c62b9711");
  background-size: cover;
  z-index: 77778;
`;

const MobileText = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 110%;
  width: 100%;
  height: 20%;
  font-size: 22px;
  color: ${(props) => props.theme.main_color};
  text-align: center;
`;

export default MobileNot;
