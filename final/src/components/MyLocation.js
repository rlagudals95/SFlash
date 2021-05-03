// getlocation으로 마커 표시하기
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import sytled from "styled-components";

const { kakao } = window; 

const MyLocation = (props) => {
  const dispatch = useDispatch 

  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  const [address, setAddress] = useState("");
  console.log(address);

  

}