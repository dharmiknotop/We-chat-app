import axios from 'axios'
import styles from '../../styles/mainScreen.module.scss'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { authUserAtom, theOtherUser } from '../recoil/recoil'
import { collection, query, where, onSnapshot } from '@firebase/firestore'
import { db } from '../../firebaseConfig'
import LeftSection from './LeftSection'
import RightSection from './rightSection/RightSection'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useList } from 'react-firebase-hooks/database'
// import { getDatabase, ref } from 'firebase/database'

const Index = ({ chats, getMessages, chatRoomId }) => {
  const router = useRouter()

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser)

  const user = useRecoilValue(authUserAtom)

  const otherUser = useRecoilValue(theOtherUser)

  // const [snapshots, loading, error] = useList(ref(database, 'chats'))

  // useEffect(() => {
  //   console.log('this is snapshot')
  // }, [snapshots])

  let tempChatRoomId
  if (chatRoomId) {
    tempChatRoomId = chatRoomId
  } else {
    tempChatRoomId = ''
  }

  // console.log('chtRoomId', tempChatRoomId)

  const colRef = query(
    collection(db, 'chats'),
    where('chatRoomId', '==', `${tempChatRoomId}`),
  )
  const tempColRef = collection(db, 'chats')

  // console.log(
  //   query(
  //     collection(db, 'chats'),
  //     where('chatRoomId', '==', `${tempChatRoomId}`),
  //   ),
  // )

  useEffect(() => {
    user.isLoggedIn === '' ? router.push('/login') : null
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(tempColRef, (snapshot) => {
      if (snapshot.size) {
        if (getMessages) getMessages()
        console.log('space to hai')
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
          <RightSection theChatter={theChatter} chats={chats} />
        </div>
      </div>
    </div>
  )
}

export default Index
