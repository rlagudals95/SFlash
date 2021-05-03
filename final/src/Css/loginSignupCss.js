import styled from "styled-components";

const Container = styled.div`
  @media (min-width: 1280px) {
      width: 380px;
    }
    @media (max-width: 1280px) {
      width: 380px;
    }
    @media (max-width: 960px) {
      width: 380px;
    }
    @media (max-width: 400px) {
      width: 300px;
    }
  margin: auto;
  padding: 80px 50px;
  border: none;
  text-align: center;
  flex-direction: column;
`;

const Title = styled.div`
margin-top: 50px;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: start;
  color: #343a40;
`;

const InputStyle = styled.input`
  border: none;
  width: 92%;
  height: 36px;
  border: 1px grey solid;
  border-radius: 4px;
  margin: 8px auto;
  padding: 4px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
  
`;

const SolidBtn = styled.button`
  border: none;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px auto;
  font-size: 0.9rem;
  font-weight: 500;
  ${(props) => (props.color ? `color:${props.color};` : "")}
  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
    transition: ease-in-out, width .35s ease-in-out;
  }
`;

const BorderBtn = styled.button`
  width: 100%;
  min-height: 45px;
  max-height: 70px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 8px auto;
  font-size: 0.9rem;
  font-weight: 500;
  color: grey;
  background-color: #ffffff;
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    border: none;
    cursor: pointer;
  }
`;

const CheckBtn = styled.button`
  min-width: 24%;
  height: 45px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0px auto 0px 5px;
  font-size: 0.9rem;
  font-weight: 500;
  color: grey;
  background-color: #ffffff;
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    border: none;
    cursor: pointer;
  }
  position: relative;
  top: 0px;
  right: 0%;
`;

const TextBtn = styled.text`
  font-size: 0.8rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InfoUl = styled.ul`
  font-size: 12px;
  color: #666666;
  font-weight: 400;
  text-align: left;
  margin-top: 0px;
`;

const InfoLi = styled.li`
  list-style: none;
`;


export { 
  Container,
  Title, 
  InputStyle, 
  SolidBtn, 
  BorderBtn, 
  CheckBtn,
  TextBtn,
  InfoUl,
  InfoLi
 };
