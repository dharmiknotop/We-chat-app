import axios from 'axios';
import { memo, useState } from 'react';
import styles from './css/addMessage.module.scss';

import { useRecoilState, useRecoilValue } from 'recoil';
import { replyingTo, theOtherUser, authUserAtom } from '../../recoil/recoil';

import { BiSend } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

const AddMessage = ({ setIsReplying }) => {
  const user = useRecoilValue(authUserAtom);
  const otherUser = useRecoilValue(theOtherUser);
  const replyerInfo = useRecoilValue(replyingTo);

  const [searchQuery, setSearchQuery] = useState('');

  const [replyTo, setReplyTo] = useRecoilState(replyingTo);

  const createMessage = async () => {
    try {
      await axios.post(
        `/api/messages/addMessage`,
        {
          chatRoomId: otherUser.chatRoomId,
          message: searchQuery,
          userName: user.name,
          otherUserId: otherUser.id,
          replyerInfo,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className={styles.s}>
      {replyerInfo.replyerMessage !== '' && (
        <div className={styles.s__replyerContainer}>
          <div className={styles.s__replytoInnerContainer}>
            <h1 className={styles.s__nameTxt}>
              {replyerInfo.replyerId === user?.id
                ? 'You'
                : replyerInfo?.replyerName}
            </h1>
            <h1 className={styles.s__messageTxt}>
              {replyerInfo.replyerMessage}
            </h1>
          </div>
          <ImCross
            className={styles.s__crossIcon}
            size={15}
            onClick={() => {
              setReplyTo({
                replyerId: '',
                replyerName: '',
                replyerMessage: '',
              });

              setIsReplying(false); // for styling purpose
            }}
          />
        </div>
      )}

      <div className={styles.s__container}>
        <input
          className={styles.s__input}
          type="text"
          placeholder="Type a Message"
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val.target.value);
          }}
          onKeyDown={(e) => {
            if (searchQuery !== '') {
              if (e.keyCode === 13) {
                setReplyTo({
                  replyerId: '',
                  replyerName: '',
                  replyerMessage: '',
                });
                createMessage();
                setSearchQuery('');
              }
            }
          }}
        />

        <BiSend
          color="gray"
          className={styles.s__svg}
          onClick={() => {
            if (searchQuery !== '') {
              createMessage();
              setSearchQuery('');
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(AddMessage);
