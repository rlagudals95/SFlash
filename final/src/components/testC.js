{
  /* {is_category.length >= 1 ? (
          is_category.map((c) => {
            if (c == "is_cafe") {
              //안에 있냐? 로 봐야할듯?
              return (
                <SelectedBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  카페
                </SelectedBtn>
              );
            }
          })
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(categoryActions.getCategory("is_cafe"));
            }}
          >
            카페
          </Btn>
        )} */
}

{
  /* {is_category.length >= 1 ? (
          is_category.map((c) => {
            if (c == "is_night") {
              return (
                <SelectedBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  야경
                </SelectedBtn>
              );
            }
          })
        ) : (
          <Btn
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(categoryActions.getCategory("is_night"));
            }}
          >
            야경
          </Btn>
        )} */
}

//////////////////////////////////////////////////////

<Container>
  {post_list //포스트리스트를 필터링 해준다 // 이런식으로 카테고리 별로 구현 할 수도??
    // .filter((val) => {
    //   if (search == "") {
    //     return val;
    //   } else if (val.title.includes(search)) {
    //     return val;
    //   } else if (val.content.includes(search)) {
    //     return val;
    //   }
    // })
    .map((p, i) => {
      // 0,1,2,3,4똑같은지 비교 is_category에서 0,1,2,3,4번째 뽑은것 //함수처리 x
      if (
        p.category.includes(
          is_category.filter((c, idx) => {
            if (c == "야경") {
              return c;
            }
          })
        )
      ) {
        // is_category 안에 "야경이 있다면" 여기에 "야경이" 없다면 "no" 같은 아무단어?
        //태그 하나에 대해서만 검사가 된다.... 원하는대로 하려면 if문 여러개
        //카테고리 배열을 2개 받는 함수 // 2개중에서 겹치는게 하나라도 있는지 // p.category와 is_category
        // 그럼 여기값을 잘 가지고 놀면될 거 같다
        //""인 상태면 모든걸 출력
        //카테고리를 포함하고 있으면 그것들만 리턴시켜줘라
        return (
          <>
            <Post2 key={i} {...p} />
          </>
        );
      }
      // else if (
      //   p.category.includes(
      //     is_category.filter((c, idx) => {
      //       if (c == "나홀로") {
      //         return c;
      //       }
      //     })
      //   )
      // ) {
      //   //이거 하나하나를 껐다 켜볼까?
      //   return (
      //     <>
      //       <Post2 key={i} {...p} />
      //     </>
      //   );
      // }
      //else if (
      //   p.category.includes(
      //     is_category.filter((c, idx) => {
      //       if (c == "카페") {
      //         return c;
      //       }
      //     })
      //   )
      // ) {
      //   return (
      //     <>
      //       <Post2 key={i} {...p} />
      //     </>
      //   );
      // } else if (
      //   p.category.includes(
      //     is_category.filter((c, idx) => {
      //       if (c == "꽃") {
      //         return c;
      //       }
      //     })
      //   )
      // ) {
      //   return (
      //     <>
      //       <Post2 key={i} {...p} />
      //     </>
      //   );
      // }
    })}
</Container>;

//////////////////////////

{
  post_list.map((p, idx) => {
    if (is_category.length == 0) {
      return <Post2 {...p} />;
    }
    if (is_category.length > 0) {
      if (
        p.category.includes(
          is_category.filter((c, idx) => {
            if (c == "야경") {
              return c;
            }
          })
        )
      ) {
        return (
          <>
            <Post2 {...p} />
          </>
        );
      }
    }
  });
}
{
  post_list.map((p, idx) => {
    if (is_category.length > 0) {
      if (
        p.category.includes(
          is_category.filter((c, idx) => {
            if (c == "카페") {
              return c;
            }
          })
        )
      ) {
        return (
          <>
            <Post2 {...p} />
          </>
        );
      }
    }
  });
}

////////////////////////////////////
{
  post_list.map((p, idx) => {
    if (is_category.length > 0) {
      if (
        p.category.includes(
          is_category.filter((c, idx) => {
            console.log("어기보세요!", c);
            if (c == "카페") {
              return c;
            } else {
              console.log("카페 포함 안됐는데?", c);
            }
          })
        )
      ) {
        if (p.category == "카페") {
          return (
            <>
              <Post2 {...p} />
            </>
          );
        }
      }
    }
  });
}

{
  /*  */
}
{
  {
    post_list.map((p, idx) => {
      if (is_category.length > 0) {
        if (
          p.category.includes(
            is_category.filter((c, idx) => {
              console.log("어기보세요!", c);
              if (c == "야경") {
                return c;
              } else {
                console.log("야경 포함 안됐는데?", c);
              }
            })
          )
        ) {
          return (
            <>
              <Post2 {...p} />
            </>
          );
        }
      }
    });
  }
}
