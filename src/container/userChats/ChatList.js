import { useState } from 'react';
import styles from './css/chatlist.module.scss';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const Chats = dynamic(() => import('@component/chats/Chats'));
const AddMessage = dynamic(() => import('@features/addMessage/AddMessage'));

import { useRecoilValue } from 'recoil';
import { theOtherUser, authUserAtom } from '../../recoil/recoil';

import { FaUserCircle } from 'react-icons/fa';

const ChatList = () => {
  const [isReplying, setIsReplying] = useState(false);

  const otherUser = useRecoilValue(theOtherUser);
  const user = useRecoilValue(authUserAtom);

  return (
    <div className={styles.s__containerOuter}>
      <div className={styles.s__headerContainer}>
        {otherUser?.logo !== '' ? (
          <Image
            src={otherUser?.logo}
            alt="logoImg"
            width="50"
            height="50"
            className={`rounded-circle ${styles.s__userImage}`}
          />
        ) : (
          <FaUserCircle
            size={50}
            color="gray"
            className={styles.s__userImage}
          />
        )}
        <h3 className={styles.s__headerUserName}>{otherUser.name}</h3>
      </div>

      <Chats
        user={user}
        setIsReplying={setIsReplying}
        isReplying={isReplying}
        otherUser={otherUser}
      />

      <AddMessage setIsReplying={setIsReplying} />
    </div>
  );
};

export default ChatList;
