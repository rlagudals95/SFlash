import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import Modal from "react-modal";
import SFlash_logo_darkgrey from "../static/SFlash_logo_darkgrey.svg";

const About = (props) => {
  const aboutUs = props.aboutUs;

  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Grid height="80px"></Grid>
        <UpperContainer>
          <SflashLogo src={SFlash_logo_darkgrey} />
          <Grid height="20px"></Grid>
          <Text>We are team SFlash!</Text>
        </UpperContainer>
        <Grid height="40px"></Grid>
        <BottomContainer>
          {aboutUs.map((a) => {
            return (
              <ProfileContainer key={a.id} {...a}>
                <ProfileImg src={a.img_url} onClick={openModal} />
                <Name>{a.name}</Name>
                <Position>{a.position}</Position>
                <Modal isOpen={modal} close={closeModal} style={modalStyle}>
                  <CloseButton
                    src="https://image.flaticon.com/icons/png/512/458/458595.png"
                    onClick={closeModal}
                  />

                  <Grid flex>
                    <ProfileImg2 src={a.img_url} />
                    <Grid> 
                      <ModalProfileContainer>
                        <Name style={{ fontSize: "1.8rem" }}>{a.name}</Name>
                        <Position style={{ fontSize: "1.1rem" }}> 
                          {a.position}
                        </Position>
                      </ModalProfileContainer>
                    </Grid>
                  </Grid>
                </Modal>
              </ProfileContainer>
            );
          })}
          <Grid height="50px"></Grid>
        </BottomContainer>
      </Wrapper>
    </React.Fragment>
  );
};

About.defaultProps = {
  aboutUs: [
    {
      id: 0,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 1,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 2,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 3,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 4,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 5,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 6,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
    {
      id: 7,
      name: "Hyunjun Jang",
      position: "Backend Junior",
      img_url:
        "https://nomadbiba.com/wp-content/uploads/2017/06/neonbrand-263869-unsplash.jpg",
    },
  ],
};

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

const modalStyle = {
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    alignItems: "center",
    textAlign: "cetner",
    backgroundColor: "rgba(48, 48, 48, 0.2)",
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
  margin: 80px 40px;
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

export default About;
