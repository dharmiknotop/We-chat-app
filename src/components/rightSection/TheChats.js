import React from 'react'

const TheChats = ({ chats }) => {
  console.log(chats)
  return (
    <div>
      {chats &&
        chats.map((item) => {
          return <div key={item?.id}>{item?.message}</div>
        })}
    </div>
  )
}

export default TheChats
