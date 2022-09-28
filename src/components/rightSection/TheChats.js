import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { messageId } from "../../recoil/recoil";
import styles from "./css/theChats.module.scss";

import { MdKeyboardArrowDown } from "react-icons/md";

const TheChats = ({ chats, user, messageEndRef }) => {
  const message = useRecoilValue(messageId);

  const [highlightMessage, setHighlightMessage] = useState(false);

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
          // console.log('chats', item)

          return (
            <div
              key={item._id}
              ref={item._id === message.id ? messageRef : null}
              className={`${styles.chats} ${
                item.userId === user.id ? styles.text__right : styles.text__left
              } `}
            >
              <span
                className={`${styles.chats} ${
                  item.userId === user.id
                    ? styles.chats__right
                    : styles.chats__left
                }`}
                ref={item._id === message.id ? changeBackgroundRef : null}
              >
                {item?.message}
                <MdKeyboardArrowDown className={`${styles.dropdownIcon}`} />
              </span>
            </div>
          );
        })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default TheChats;
