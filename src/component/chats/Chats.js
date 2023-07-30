import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { replyingTo, messageId } from '../../recoil/recoil';
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from './css/theChats.module.scss';

import { db } from '../../config/firebaseConfig';
import { collection, onSnapshot } from '@firebase/firestore';

import { OverlayTrigger } from 'react-bootstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Chats = (props) => {
  const { user, setIsReplying, isReplying, otherUser } = props;

  const router = useRouter();
  const { chatRoomId } = router.query;

  const tempColRef = collection(db, 'chats');

  const messageToScroll = useRecoilValue(messageId);

  const messageRef = useRef();
  const messageEndRef = useRef();
  const changeBackgroundRef = useRef(0);

  const [messages, setMessages] = useState([]);

  const [requestGetMessage, setRequestGetMessage] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const getMessages = async () => {
    try {
      setRequestGetMessage({
        loading: true,
        success: '',
        error: '',
      });

      const res = await axios.post(
        `/api/messages/getMessages`,
        { chatRoomId },
        {
          withCredentials: true,
        }
      );

      setMessages(res.data.data);

      setRequestGetMessage({
        loading: false,
        success: 'successfully loaded messages',
        error: '',
      });
    } catch (error) {
      console.log('error: ', error);

      setRequestGetMessage({
        loading: false,
        success: '',
        error: 'Something went wrong',
      });
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(tempColRef, (snapshot) => {
      if (snapshot.size) {
        getMessages();
      }
    });
    return () => {
      unsub();
    };
  }, [db, router, chatRoomId]);

  useEffect(() => {
    // scroll to the last chat message

    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messageEndRef, messages]);

  useEffect(() => {
    // scroll to the particular chat message

    if (messageToScroll) {
      messageRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      if (changeBackgroundRef.current) {
        if (changeBackgroundRef.current.style) {
          changeBackgroundRef.current.style.backgroundColor = '#04b3b3';

          setTimeout(() => {
            changeBackgroundRef.current.style.backgroundColor = 'cyan';
          }, 500);
        }
      }
    }
  }, [messageToScroll, messageRef, changeBackgroundRef]);

  return (
    <div
      className={`${
        isReplying === true ? styles.s__withReply : styles.s__withoutReply
      } ${styles.s__chatContainer}`}
    >
      {requestGetMessage.loading && (
        <div className="text-center pt-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!requestGetMessage.loading && otherUser.name === '' && (
        <div className={`${styles.s__noUserSelectedContainer}`}>
          {' '}
          Currently no user is selected
        </div>
      )}

      {messages &&
        messages.map((item) => {
          return (
            <RenderChats
              item={item}
              message={messageToScroll}
              user={user}
              messageRef={messageRef}
              changeBackgroundRef={changeBackgroundRef}
              setIsReplying={setIsReplying}
              key={item._id}
            />
          );
        })}

      {!requestGetMessage.loading && requestGetMessage.error !== '' && (
        <div className="text-center pt-2">
          <div className="text-danger">{requestGetMessage.error}</div>
        </div>
      )}
      <div ref={messageEndRef} />
      <div className={styles.s__overlay}></div>
    </div>
  );
};

const RenderChats = ({
  item,
  message,
  user,
  messageRef,
  changeBackgroundRef,
  setIsReplying,
}) => {
  const [showDropDownImg, setShowDropDownImg] = useState(false);

  const [replyTo, setReplyTo] = useRecoilState(replyingTo);

  const popoverCard = (item) => {
    return (
      <div className={styles.dropDown}>
        <h1
          className={styles.dropDown__txt}
          onClick={() => {
            document.body.click(); // Added this to make the popover close onClick.

            setReplyTo({
              replyerId: item?.userId,
              replyerName: item?.userName,
              replyerMessage: item?.message,
            });

            setIsReplying(true); // for styling purpose
          }}
        >
          Reply to
        </h1>
      </div>
    );
  };

  const getStylesForUser = (item, user) => {
    if (item.userId === user.id) {
      if (item?.replyerInfo[0]?.replyerId === user.id) {
        return styles.chats__userReplyContainerForUser;
      } else {
        return styles.chats__otherUserReplyContainerForUser;
      }
    }
  };

  const getStylesForOtherUser = (item, user) => {
    if (item.userId !== user.id) {
      if (item?.replyerInfo[0]?.replyerId !== user.id) {
        return styles.chats__userReplyContainerForOtherUser;
      } else {
        return styles.chats__otherUserReplyContainerForOtherUser;
      }
    }
  };

  return (
    <div
      key={item._id}
      ref={item._id === message.id ? messageRef : null}
      className={`${
        item.userId === user.id ? styles.text__right : styles.text__left
      } `}
    >
      <div
        className={`${styles.chats} ${
          item.userId === user.id ? styles.chats__right : styles.chats__left
        }`}
        ref={item._id === message.id ? changeBackgroundRef : null}
        onMouseEnter={() => {
          setShowDropDownImg(true);
        }}
        onMouseLeave={() => {
          setShowDropDownImg(false);
        }}
      >
        {item?.replyerInfo[0]?.replyerName && (
          <div
            className={`${styles.chats__replyContainer} ${getStylesForUser(
              item,
              user
            )} ${getStylesForOtherUser(item, user)}`}
          >
            <h2 className={styles.chats__replyContainer__replyerName}>
              {item?.replyerInfo[0]?.replyerId === user.id
                ? 'You'
                : item?.replyerInfo[0]?.replyerName}
            </h2>
            <h3 className={styles.chats__replyContainer__replyerTxt}>
              {item?.replyerInfo[0]?.replyerMessage}
            </h3>
          </div>
        )}

        <div className={styles.chats__txtContainer}>
          {item?.message}
          <OverlayTrigger
            placement="bottom"
            overlay={popoverCard(item)}
            trigger="click"
            rootClose
          >
            <MdKeyboardArrowDown
              className={`${
                showDropDownImg === true
                  ? styles.dropdownIcon
                  : styles.dropdownIconNotActive
              }`}
            />
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default Chats;
