import axios from 'axios';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import styles from './css/chatlist.module.scss';

import TheChats from './TheChats';

import { useRecoilState, useRecoilValue } from 'recoil';
import { theOtherUser, authUserAtom, replyingTo } from '../../recoil/recoil';
import { BiSend } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';

const ChatList = ({ chats, messageEndRef }) => {
  const otherUser = useRecoilValue(theOtherUser);
  const user = useRecoilValue(authUserAtom);
  const replyerInfo = useRecoilValue(replyingTo);

  const [replyTo, setReplyTo] = useRecoilState(replyingTo);

  const [isReplying, setIsReplying] = useState(false);

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const createMessage = async () => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
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

      setRequestGetUser({
        loading: false,
        success: 'Added Successfully.',
        error: '',
      });
    } catch (error) {
      console.log('error: ', error);
      setRequestGetUser({
        loading: false,
        success: '',
        error: 'Some unexpected error occur.',
      });
    }
  };

  return (
    <Fragment>
      <div className={` ${styles.s__containerOuter}`}>
        <div
          className={` ${
            isReplying === true
              ? styles.s__containerWithReplyOn
              : styles.s__containerWithoutReply
          }`}
        >
          {' '}
          <div className={styles.s__headerContainer}>
            {otherUser?.logo && (
              <Image
                src={otherUser?.logo}
                alt="logoImg"
                width="50"
                height="50"
                className="rounded-circle"
              />
            )}
            {otherUser?.logo === '' && (
              <Fragment>
                <FaUserCircle size={50} color="gray" />
              </Fragment>
            )}
            <h3 className={styles.s__headerUserName}>{otherUser.name}</h3>
          </div>
          <div className={styles.s__chatContainer}>
            {otherUser.name === '' && (
              <div className={`${styles.s__noUserSelectedContainer}`}>
                {' '}
                currently no user Selected
              </div>
            )}
            {chats && (
              <TheChats
                chats={chats}
                user={user}
                messageEndRef={messageEndRef}
                setIsReplying={setIsReplying}
              />
            )}

            <div className={styles.s__chatContainer__overlay}></div>
          </div>
        </div>
        <div className={styles.s__addAChatContainer}>
          {replyerInfo.replyerMessage !== '' && (
            <div className={styles.s__addAChatContainer__replyerContainer}>
              <div
                className={styles.s__addAChatContainer__replytoInnerContainer}
              >
                <h1 className={styles.s__addAChatContainer__nameTxt}>
                  {replyerInfo.replyerId === user?.id
                    ? 'You'
                    : replyerInfo?.replyerName}
                  {console.log(user)}
                </h1>
                <h1 className={styles.s__addAChatContainer__messageTxt}>
                  {replyerInfo.replyerMessage}
                </h1>
              </div>
              <ImCross
                className={styles.s__addAChatContainer__crossIcon}
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
          <div className={styles.s__addAChatContainer__innerContainer}>
            <input
              className={styles.s__addAChatContainer__input}
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
              className={styles.s__addAChatContainer__svg}
              onClick={() => {
                if (searchQuery !== '') {
                  createMessage();
                  setSearchQuery('');
                }
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatList;
