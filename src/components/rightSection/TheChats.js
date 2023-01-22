import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { replyingTo, messageId } from '../../recoil/recoil';
import { useRecoilState } from 'recoil';

import styles from './css/theChats.module.scss';

import { OverlayTrigger, Popover } from 'react-bootstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiAlertFill } from 'react-icons/ri';

const TheChats = ({
  requestGetMessages,
  chats,
  user,
  messageEndRef,
  setIsReplying,
}) => {
  const message = useRecoilValue(messageId);

  const messageRef = useRef();

  const changeBackgroundRef = useRef(0);

  useEffect(() => {
    if (message.id === '') {
      messageEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [chats, messageEndRef, message]);

  useEffect(() => {
    if (message) {
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
  }, [message, messageRef, changeBackgroundRef]);

  return (
    <Fragment>
      {requestGetMessages.loading && (
        <div className=" pt-4 h-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!requestGetMessages.loading && requestGetMessages.success !== '' && (
        <Fragment>
          {chats &&
            chats.map((item) => {
              return (
                <Fragment key={item._id}>
                  <RenderChats
                    item={item}
                    message={message}
                    user={user}
                    messageRef={messageRef}
                    changeBackgroundRef={changeBackgroundRef}
                    setIsReplying={setIsReplying}
                  />
                </Fragment>
              );
            })}
        </Fragment>
      )}

      <div ref={messageEndRef} />
    </Fragment>
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

  // console.log(item);

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
          Reply
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

export default TheChats;
