import styles from './css/rightSection.module.scss'
import { BiSend } from 'react-icons/bi'
import { Fragment, useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { theOtherUser, authUserAtom } from '../../recoil/recoil'
import TheChats from './TheChats'

const RightSection = ({ theChatter, chats }) => {
  const otherUser = useRecoilValue(theOtherUser)
  const user = useRecoilValue(authUserAtom)

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const [searchQuery, setSearchQuery] = useState('')

  const createMessage = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    })
    try {
      const res = await axios.post(
        `/api/messages/addMessage`,
        { chatRoomId: otherUser.chatRoomId, message: searchQuery },
        {
          withCredentials: true,
        },
      )
      console.log(otherUser)

      setRequestGetUser({
        loading: false,
        success: 'Added Successfully.',
        error: '',
      })
    } catch (error) {
      console.log('error: ', error)
      setRequestGetUser({
        loading: false,
        success: '',
        error: 'Some unexpected error occur.',
      })
    }
  }

  return (
    <Fragment>
      <div className={` ${styles.s__container}`}>
        <div className="h-100">
          {' '}
          <div className={styles.s__headerContainer}>{theChatter.name}</div>
          <div className={styles.s__chatContainer}>
            {theChatter.name === '' && (
              <div className={`${styles.s__noUserSelectedContainer}`}>
                {' '}
                currently no user Selected
              </div>
            )}
            {chats && <TheChats chats={chats} user={user} />}

            <div className={styles.s__chatContainer__overlay}></div>
          </div>
        </div>
        <div className={styles.s__addAChatContainer}>
          <input
            className={styles.s__addAChatContainer__input}
            type="text"
            placeholder="Type a Message"
            onChange={(val) => {
              setSearchQuery(val.target.value)
            }}
          />

          <BiSend
            color="gray"
            className={styles.s__addAChatContainer__svg}
            onClick={() => {
              createMessage()
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default RightSection
