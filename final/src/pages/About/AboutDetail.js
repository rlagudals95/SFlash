import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements/index";
import Modal from "react-modal";

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
              <Position2 style={{ fontSize: "1.1rem" }}>
                {props.position}
              </Position2>
              <Grid height="5px" />
              <Content>{props.content}</Content>
              <Skill>{props.skill}</Skill>
              <Grid flex>
              {props.github !== null ? (
                <RefLink onClick={()=> window.open(props.github)}>Github</RefLink>
              ) : null}
              {props.portfolio !== null ? (
                <RefLink onClick={()=> window.open(props.portfolio)}>Portfolio</RefLink>
              ) : null}
              {props.resume !== null ? (
                <RefLink onClick={()=> window.open(props.resume)}>Resume</RefLink>
              ) : null}
              {props.etc_1 !== null ? (
                <RefLink onClick={()=> window.open(props.etc_1)}>Blog</RefLink>
              ) : null}
              {props.etc_2 !== null ? (
                <RefLink onClick={()=> window.open(props.etc_2)}>Blog</RefLink>
              ) : null}
              </Grid>
              <Grid height="20px"></Grid>
            </ModalProfileContainer>
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  margin: 10px;
  text-align: center;
  margin-bottom: 50px;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
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
  color: darkgrey;
`;
const Position2 = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_color};
`;

const Content = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
  line-height: 2rem;
  white-space: pre-line;
`;

const Skill = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
  line-height: 2rem;
`;

const RefLink = styled.div`
  display: block;
  margin-top: 20px;
  margin-right: 15px;
  font-size: 0.9rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_color};
  text-decoration: none;
  margin-bottom: -10px;
  text-decoration: underline;
  :hover {
    cursor: pointer;
    text-decoration: underline;
    color: lightgrey;
  }
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
    backgroundColor: "rgba(48, 48, 48, 0.8)",
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
  margin: 120px 50px;
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
