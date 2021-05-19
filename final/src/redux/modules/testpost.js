const getPostAPI = (start = null, size = null) => {
  return function (dispatch, getState) {
    const board_list = getState().post.list;
    console.log("잘가지고 왔겠지", board_list);

    let end_board = // 마지막 포스트의 id를 서버에 넘겨줘서 그 아이디 부터 15개를 받아오는 페이징처리 방법
      board_list.length == 0
        ? 999 // 그러나 처음 화면이 켜졌을땐 마직막 포스트의 id를 받을 수 없다
        : //그러므로 Number.MAX_SAFE_INTEGER(약 9000조)를 써줘서 가장가까운 수의 id를 먼저받고
          board_list[0].id; // 이제 처음 받은 포스트중 가장 마지막 포스트 id 기준으로 15개씩 게시물을 받아온다

    console.log("마지막 포스트 아디디", end_board);

    let size = 15;
    axios({
      method: "GET",
      // url: `${config.api}/board`,
      url: `${config.api}/board/community/scroll?size=${size}&lastBoardId=${end_board}`,
      // data: {
      //   size: 15,
      //   lastAriticleId: end_board.id, // 처음에는 9000조를 보낸다
      // },
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log("스크롤 요청");
        console.log("!!!!!!!!!", res.data.data);

        // 라이크 값이 자꾸 false로 오니까 리스트를 뽑아보자!
        // let like_list = [];

        // for (let i = 0; i < res.data.data.length; i++) {
        //   like_list.push(res.data.data[i].liked);
        // }

        // console.log("받아오는 라이크 값들", like_list);

        let result = res.data.data.slice(start, size); // 서버에서 받아오는 게시물들을 start와 size를 정해서 나눠준다
        // console.log("페이징 갯수", result.length);
        if (result.length == 0) {
          // result의 수가 0이라는 것은 더이상 받아올 데이터가 없다는 뜻
          dispatch(loading(false));
          return;
        }
        let paging = {
          start: start + result.length + 1,
          size: size + 15,
        };

        console.log("서버 응답값", res);
        let post_list = [];
        // console.log(res.data.data[0].boardImgReponseDtoList);
        result.forEach((_post) => {
          let post = {
            id: _post.boardId, // 포스트 id
            // title: _post.title, // 포스트 title
            // content: _post.content, // 포스트 내용
            // writerName: _post.writerName,
            img_url: _post.boardImgUrl,
            category: _post.category,
            // profileImg: _post.writerImgUrl,
            like: _post.liked,
            likeCnt: _post.likeCount,
            // comment: _post.boardDetailCommentDtoList,
            // creatAt: _post.modified,
            spotName: _post.spotName,
            // writerId: _post.writerId,
          };
          post_list.unshift(post);
        });
        dispatch(setPost(post_list, paging));
        // dispatch(modalActions.modalEdit(post_list));
      })
      .catch((err) => {
        window.alert("게시물을 가져오는데 문제가 있어요!");
        console.log("게시물 로드 에러", err);
      });
  };
};


