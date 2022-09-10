import React from 'react'
import styles from './css/theChats.module.scss'

const TheChats = ({ chats, user }) => {
  console.log(user)
  return (
    <div>
      {chats &&
        chats.map((item) => {
          return (
            <div
              key={item?.id}
              className={`${styles.chats} ${
                item.id === user.id ? styles.text_left : styles.text_right
              }`}
            >
              <span
                className={`${styles.chats} ${
                  item.id === user.id ? styles.chats__left : styles.chats__right
                }`}
              >
                {item?.message}
              </span>
            </div>
          )
        })}
    </div>
  )
}

export default TheChats
