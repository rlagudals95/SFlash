import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import Modal from "react-modal";
import SFlash_logo_darkgrey from "../static/SFlash_logo_darkgrey.svg";

import profile_hyunjun from "../static/profile/profile_hyunjun.jpg";
import profile_seungwook from "../static/profile/profile_seungwook.jpg";
import profile_sejeong from "../static/profile/profile_sejeong.jpg";
import profile_minkyu from "../static/profile/profile_minkyu.jpg";
import profile_hyeongmin from "../static/profile/profile_hyeongmin.jpg";
import profile_dayoung from "../static/profile/profile_dayoung.jpg";
import profile_ahyeon from "../static/profile/profile_ahyeon.jpg";
import profile_eunjeong from "../static/profile/profile_eunjeong.jpg";

const AboutDetail = (props) => {
  console.log(props);

  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      <ProfileContainer>
      <ProfileImg src={props.img} onClick={openModal} />
      <Name>{props.name}</Name>
      <Position>{props.position}</Position>
     </ProfileContainer>

    <Modal isOpen={modal} close={closeModal} style={modalStyle}>
      <CloseButton
        src="https://image.flaticon.com/icons/png/512/458/458595.png"
        onClick={closeModal}
      />
      <Grid flex>
        <ProfileImg2 src={props.img} />
        <Grid> 
          <ModalProfileContainer>
            <Name style={{ fontSize: "1.8rem" }}>{props.name}</Name>
            <Position style={{ fontSize: "1.1rem" }}> 
              {props.position}
            </Position>
            <Content>{props.content}</Content>
                <Content>{props.github}</Content>
                <Content>{props.etc_1}</Content>
                <Content>{props.etc_2}</Content>
          </ModalProfileContainer>
        </Grid>
      </Grid>
    </Modal>

    </React.Fragment>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`;
const ModalComponent = styled.div`
  position: fixed;
  width: 950px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;

const SflashLogo = styled.img`
  width: 110px;
  margin: auto;
  text-align: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: grey;
`;

const UpperContainer = styled.div`
  text-align: center;
`;

const BottomContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  margin: auto;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
`;

const ProfileContainer = styled.div`
  margin: 10px;
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ProfileImg = styled.img`
  width: 180px;
  height: 180px;
  margin: 10px;
  border-radius: 170px;
  background-size: cover;
  object-fit: cover;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ProfileImg2 = styled.img`
  width: 360px;
  height: 100%;

  background-size: cover;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${(props) => props.theme.main_grey};
`;
const Position = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
`;
const Content = styled.div`
  margin-top: 30px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
  line-height: 2rem;
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    alignItems: "center",
    textAlign: "cetner",
    backgroundColor: "rgba(48, 48, 48, 0.7)",
    transition: "opacity 2000ms ease-in-out",
    zIndex: "1000",
  },
  content: {
    width: "800px",
    height: "600px",
    margin: "auto",
    padding: "0px",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  },
};

const ModalProfileContainer = styled.div`
  margin: 120px 40px;
`;

const CloseButton = styled.img`
  width: 15px;
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 10px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    color: grey;
    background-color: #eee;
  }
`;

export default AboutDetail;
