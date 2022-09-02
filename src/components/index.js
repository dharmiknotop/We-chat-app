import axios from 'axios'
import styles from '../../styles/mainScreen.module.scss'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { authUserAtom, theOtherUser } from '../recoil/recoil'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from '@firebase/firestore'
import { db } from '../../firebaseConfig'
import LeftSection from './LeftSection'
import RightSection from './rightSection/RightSection'

const Index = ({ chats }) => {
  const [theChatter, setTheChatter] = useRecoilState(theOtherUser)

  const user = useRecoilValue(authUserAtom)

  const otherUser = useRecoilValue(theOtherUser)

  const [snapshot, loading, error] = useCollection(collection(db, 'chats'))

  // const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

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
