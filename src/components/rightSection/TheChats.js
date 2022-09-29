import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { replyingTo, messageId } from "../../recoil/recoil";
import { useRecoilState } from "recoil";

import styles from "./css/theChats.module.scss";

import { OverlayTrigger, Popover } from "react-bootstrap";
import { MdKeyboardArrowDown } from "react-icons/md";

const TheChats = ({ chats, user, messageEndRef }) => {
  const message = useRecoilValue(messageId);

  const messageRef = useRef();

  const changeBackgroundRef = useRef(0);

  // console.log('messagesId',message.id);

  useEffect(() => {
    if (message.id === "") {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [chats, messageEndRef, message]);

  useEffect(() => {
    if (message) {
      messageRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (changeBackgroundRef.current) {
        if (changeBackgroundRef.current.style) {
          changeBackgroundRef.current.style.backgroundColor = "#04b3b3";

          setTimeout(() => {
            changeBackgroundRef.current.style.backgroundColor = "cyan";
          }, 500);
        }
      }
    }
  }, [message, messageRef, changeBackgroundRef]);

  return (
    <div>
      {chats &&
        chats.map((item) => {
          // console.log(item);
          return (
            <RenderChats
              key={item._id}
              item={item}
              message={message}
              user={user}
              messageRef={messageRef}
              changeBackgroundRef={changeBackgroundRef}
            />
          );
        })}
      <div ref={messageEndRef} />
    </div>
  );
};

const RenderChats = ({
  item,
  message,
  user,
  messageRef,
  changeBackgroundRef,
}) => {
  const [showDropDownImg, setShowDropDownImg] = useState(false);

  const [replyTo, setReplyTo] = useRecoilState(replyingTo);

  // console.log(item);

  const popoverNotification = (
    <Popover
      id={`${styles.popover_menu_options}`}
      style={{
        borderRadius: "0px",
        padding: "0px",
      }}
    >
      <Popover.Content
        style={{
          borderRadius: "0px",
          padding: "0px",
        }}
      >
        <div className={styles.dropDown}>
          <h1
            className={styles.dropDown__txt}
            onClick={() => {
              setReplyTo({
                replyerId: item?.userId,
                replyerName: item?.userName,
                replyerMessage: item?.message,
              });
            }}
          >
            Reply
          </h1>
        </div>
      </Popover.Content>
    </Popover>
  );

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
                ? "You"
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
            overlay={popoverNotification}
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
