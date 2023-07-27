import styles from './css/mainScreen.module.scss';
import { useRecoilValue } from 'recoil';
import { authUserAtom } from '../recoil/recoil';

import UserList from './userList/UserList';
import ChatList from './userChats/ChatList';

const Index = () => {
  const user = useRecoilValue(authUserAtom);

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
