import axios from 'axios';
import styles from '../../styles/mainScreen.module.scss';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { authUserAtom, messageId, theOtherUser } from '../recoil/recoil';
import { collection, query, where, onSnapshot } from '@firebase/firestore';
import { db } from '../../firebaseConfig';
import LeftSection from './leftSection/LeftSection';
import RightSection from './rightSection/RightSection';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const messageEndRef = useRef();
  const router = useRouter();

  const [requestGetMessages, setRequestGetMessages] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const user = useRecoilValue(authUserAtom);

  const messageRefId = useRecoilValue(messageId);

  const tempColRef = collection(db, 'chats');

  const { chatRoomId } = router.query;

  const [messages, setMessages] = useState([]);

  const getMessages = async (id) => {
    try {
      setRequestGetMessages({
        loading: true,
        success: '',
        error: '',
      });
      const res = await axios.post(
        `/api/messages/getMessages`,
        { chatRoomId: id },
        {
          withCredentials: true,
        }
      );

      setMessages(res.data.data);

      setRequestGetMessages({
        loading: false,
        success: 'Added Successfully.',
        error: '',
      });
    } catch (error) {
      console.log('error: ', error);
      setRequestGetMessages({
        loading: false,
        success: '',
        error: 'Some unexpected error occur.',
      });
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(tempColRef, (snapshot) => {
      if (snapshot.size) {
        getMessages(chatRoomId);
        if (!messageRefId) {
          messageEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      } else {
        console.log('no space');
      }
    });

    return () => {
      unsub();
    };
  }, [db, router, chatRoomId]);

  return (
    <div className={` ${styles.containerOuter}`}>
      <div className={` ${styles.container}`}>
        <div className={`${styles.s}`}>
          <LeftSection user={user} />
        </div>
        <div className={`${styles.s2}`}>
          <RightSection
            chats={messages}
            messageEndRef={messageEndRef}
            requestGetMessages={requestGetMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
