import { useState } from 'react';
import Image from 'next/image';
import styles from './css/chatlist.module.scss';

import Chats from './Chats';

import { useRecoilValue } from 'recoil';
import { theOtherUser, authUserAtom, replyingTo } from '../../recoil/recoil';

import { FaUserCircle } from 'react-icons/fa';
import AddMessage from '@component/AddMessage';

const ChatList = () => {
  const [isReplying, setIsReplying] = useState(false);

  const otherUser = useRecoilValue(theOtherUser);
  const user = useRecoilValue(authUserAtom);

  return (
    <div className={` ${styles.s__containerOuter}`}>
      <div
        className={` ${
          isReplying === true
            ? styles.s__containerWithReplyOn
            : styles.s__containerWithoutReply
        }`}
      >
        <div className={styles.s__headerContainer}>
          {otherUser?.logo !== '' ? (
            <Image
              src={otherUser?.logo}
              alt="logoImg"
              width="50"
              height="50"
              className="rounded-circle"
            />
          ) : (
            <FaUserCircle size={50} color="gray" />
          )}
          <h3 className={styles.s__headerUserName}>{otherUser.name}</h3>
        </div>
        <div className={styles.s__chatContainer}>
          {otherUser.name === '' && (
            <div className={`${styles.s__noUserSelectedContainer}`}>
              {' '}
              Currently no user is selected
            </div>
          )}
          <Chats user={user} setIsReplying={setIsReplying} />
          <div className={styles.s__chatContainer__overlay}></div>
        </div>
        <AddMessage />
      </div>
    </div>
  );
};

export default ChatList;
