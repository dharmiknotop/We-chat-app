import { useEffect } from 'react'
import styles from './css/theChats.module.scss'

const TheChats = ({ chats, user, messageEndRef }) => {
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [chats])

  return (
    <div>
      {chats &&
        chats.map((item) => {
          return (
            <div
              key={item.id}
              className={`${styles.chats} ${
                item.userId === user.id ? styles.text__right : styles.text__left
              }`}
            >
              <span
                className={`${styles.chats} ${
                  item.userId === user.id
                    ? styles.chats__right
                    : styles.chats__left
                }`}
              >
                {item?.message}
              </span>
            </div>
          )
        })}
      <div ref={messageEndRef} />
    </div>
  )
}

export default TheChats
