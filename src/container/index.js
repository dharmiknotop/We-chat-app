import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from './css/mainScreen.module.scss';

import { useRecoilState, useRecoilValue } from 'recoil';
import { authUserAtom, theOtherUser } from '../recoil/recoil';

import UserList from './userList/UserList';
import ChatList from './userChats/ChatList';

const Index = () => {
  const user = useRecoilValue(authUserAtom);

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser);

  const router = useRouter();
  const { chatRoomId } = router.query;

  //   console.log('user', user);

  useEffect(() => {
    user?.userList &&
      user.userList.forEach((item) => {
        if (item.chatRoomId === chatRoomId) {
          console.log(item.chatRoomId === chatRoomId);
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
    <div className={styles.containerOuter}>
      <div className={styles.container}>
        <UserList user={user} />
        <ChatList />
      </div>
    </div>
  );
};

export default Index;
