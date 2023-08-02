import { atom } from 'recoil';
import { Comments } from '@/utils/interface';

export const commentState = atom<Comments[]>({
  key: 'commentState',
  default: [
    {
      name: '안녕 나 응애',
      userVerified: true,
      userImg: 'profile_1',
      time: '1일전',
      content:
        '어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭 우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도 아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니 꼭 봐주세용~!',
      likes: '5',
      replies: [
        {
          name: 'ㅇㅅㅇ',
          userImg: 'profile_2',
          userVerified: false,
          time: '1일전',
          content: '오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다',
          likes: '3',
        },
        {
          name: 'ㅇㅅㅇ',
          userImg: 'profile_2',
          userVerified: false,
          time: '1일전',
          content: 'lorem ipsum test contents',
          likes: '12',
        },
      ],
    },
  ],
});
