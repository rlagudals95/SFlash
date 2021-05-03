import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, height, max_width } = props;

  const styles = {
    src: src,
    size: size,
    height: height,
    max_width: max_width,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  size: 36,
  // height: "500px",
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
  /* height: ${(props) => props.height}; */
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  /* overflow: hidden; */
  background-image: url("${(props) => props.src}");
  max-width: ${(props) => props.max_width};
  background-size: cover;
  /* height: ${(props) => props.height}; */
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 1px solid;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
