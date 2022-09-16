import axios from 'axios'
import styles from '../../styles/mainScreen.module.scss'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { authUserAtom, messageId, theOtherUser } from '../recoil/recoil'
import { collection, query, where, onSnapshot } from '@firebase/firestore'
import { db } from '../../firebaseConfig'
import LeftSection from './leftSection/LeftSection'
import RightSection from './rightSection/RightSection'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const Index = ({ chats, getMessages, chatRoomId }) => {
  const messageEndRef = useRef()
  const router = useRouter()

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser)

  const user = useRecoilValue(authUserAtom)

  const messageRefId = useRecoilValue(messageId)

  const tempColRef = collection(db, 'chats')

  useEffect(() => {
    user.isLoggedIn === '' ? router.push('/login') : null
  }, [router, user])

  useEffect(() => {
    const unsub = onSnapshot(tempColRef, (snapshot) => {
      if (snapshot.size) {
        if (getMessages) {
          getMessages()
        }
        if (!messageRefId) {
          messageEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }

        console.log('message ref')
      } else {
        console.log('no space')
      }
    })

    return () => {
      unsub()
    }
  }, [db])

  return (
    <div className={` ${styles.containerOuter}`}>
      <div className={` ${styles.container}`}>
        <div className={`${styles.s}`}>
          <LeftSection user={user} setTheChatter={setTheChatter} />
        </div>
        <div className={`${styles.s2}`}>
          <RightSection
            theChatter={theChatter}
            chats={chats}
            messageEndRef={messageEndRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
