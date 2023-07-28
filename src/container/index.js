import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { memo, useEffect, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { authUserAtom, theOtherUser } from '../recoil/recoil';

const UserList = dynamic(() => import('./userList/UserList'));
const ChatList = dynamic(() => import('./userChats/ChatList'));
// import  from '';

const Index = () => {
  const router = useRouter();
  const { chatRoomId } = router.query;

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser);

  const user = useRecoilValue(authUserAtom);

  useMemo(() => {
    //auto selecting the other user/chatter if user refreshes
    user?.userList &&
      user.userList.forEach((item) => {
        if (item.chatRoomId === chatRoomId) {
          setTheChatter({
            id: item?.userId,
            name: item?.userName,
            logo: item?.userLogo,
            chatRoomId,
          });
        }
      });
  }, [user]);

  return (
    <div className="d-flex">
      <UserList />
      <ChatList />
    </div>
  );
};

export default memo(Index);
