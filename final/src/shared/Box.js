import React from "react";

const Box = () => {
  const [limit, setLimit] = useState(50);
  const toggleEllipsis = (str, limit) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit,
    };
  };

  const onClickMore = (str) => () => {
    setLimit(str.length);
  };

  return (
    <Wrapper>
      <Description>
        {toggleEllipsis(text, limit).string}
        {toggleEllipsis(text, limit).isShowMore && (
          <MoreButton onClick={onClickMore(text)}>...더보기</MoreButton>
        )}
      </Description>
    </Wrapper>
  );
};

export default Box;
