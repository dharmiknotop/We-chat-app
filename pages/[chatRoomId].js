import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainScreen from '../src/components/index';

export default function Home() {
  const router = useRouter();

  const { chatRoomId } = router.query;

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const [messages, setMessages] = useState([]);

  const getMessages = async (id) => {
    console.log('chatRoomId main', id);
    try {
      setRequestGetUser({
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

      setRequestGetUser({
        loading: false,
        success: 'Added Successfully.',
        error: '',
      });
    } catch (error) {
      console.log('error: ', error);
      setRequestGetUser({
        loading: false,
        success: '',
        error: 'Some unexpected error occur.',
      });
    }
  };
  // console.log(chatRoomId);

  useEffect(() => {
    getMessages(chatRoomId);
  }, [chatRoomId]);

  return (
    <div>
      <MainScreen
        chats={messages}
        getMessages={getMessages}
        setMessages={setMessages}
        chatRoomId={chatRoomId}
      />
    </div>
  );
}
