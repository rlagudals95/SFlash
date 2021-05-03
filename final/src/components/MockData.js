const post_list = [
  {
    id: 1,
    imgUrl: [
      "https://images.unsplash.com/photo-1619274015963-c4a2f50967b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1473969631237-f466cf342b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
      "https://images.unsplash.com/photo-1590598016454-45b7e0ac125c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80",
      "https://images.unsplash.com/photo-1583713124903-6e6c31f46934?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    ],
    title: "바람좋구먼~",
    address: "충청남도 논산시 연무읍",
    category: "카페",
    content: "고독하구먼",
  },
  {
    id: 2,
    imgUrl: [
      "https://images.unsplash.com/photo-1473969631237-f466cf342b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
      "https://image.edaily.co.kr/images/Photo/files/NP/S/2016/06/PS16060300126.jpg",
      "https://images.unsplash.com/photo-1590598016454-45b7e0ac125c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80",
    ],
    title: "황홀~",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "야경",
    content: "잠와 ㅜ",
  },
  {
    id: 3,
    imgUrl: [
      "https://image.edaily.co.kr/images/Photo/files/NP/S/2016/06/PS16060300126.jpg",
    ],
    title: "사서 고생하는 구먼~",
    address: "여수시 미평동 ",
    category: "바다",
    content: "배고파",
  },
  {
    id: 4,
    imgUrl: [
      "https://images.unsplash.com/photo-1583713124903-6e6c31f46934?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    ],
    title: "둥둥..",
    address: "여수 문수 주택단지",
    category: "산",
    content: "항해99",
  },
  {
    id: 5,
    imgUrl: [
      "https://images.unsplash.com/photo-1590598016454-45b7e0ac125c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "꽃",
    content: "화이팅 하십쇼!!",
  },
  {
    id: 6,
    imgUrl: [
      "https://content.presspage.com/uploads/685/1920_solaceinsolo1.jpg?10000",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "나홀로",
    content: "최곱니당!",
  },
  {
    id: 7,
    imgUrl: [
      "https://images.unsplash.com/photo-1542386649-474c879b72d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "연인",
    content: "고만하소잉",
  },
  {
    id: 8,
    imgUrl: [
      "https://images.unsplash.com/photo-1564632302695-ae0485da8b85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "친구",
    content: "뿌링클 사줄분??",
  },
  {
    id: 9,
    imgUrl: [
      "https://images.unsplash.com/photo-1496416412749-10a3022bade0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "반려동물",
    content: "뿌링클 사줄분??",
  },
  {
    id: 10,
    imgUrl: [
      "https://image.edaily.co.kr/images/Photo/files/NP/S/2016/06/PS16060300126.jpg",
    ],
    title: "사서 고생하는 구먼~",
    address: "여수시 미평동 ",
    category: "도심",
    content: "배고파",
  },
  {
    id: 11,
    imgUrl: [
      "https://images.unsplash.com/photo-1583713124903-6e6c31f46934?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    ],
    title: "둥둥..",
    address: "여수 문수 주택단지",
    category: "공원",
    content: "항해99",
  },
  {
    id: 12,
    imgUrl: [
      "https://images.unsplash.com/photo-1590598016454-45b7e0ac125c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80",
    ],
    title: "둥둥..",
    address: "제주시 한림읍 옹포 8길 1-3",
    category: "전시",
    content: "화이팅 하십쇼!!",
  },
];

export default post_list;
