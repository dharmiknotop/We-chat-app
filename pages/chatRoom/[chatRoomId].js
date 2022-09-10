import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MainScreen from '../../src/components/index'

export default function Home() {
  const router = useRouter()

  const { chatRoomId } = router.query

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const [messages, setMessages] = useState([])

  const getMessages = async () => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    })
    try {
      const res = await axios.post(
        `/api/messages/getMessages`,
        { chatRoomId },
        {
          withCredentials: true,
        },
      )

      setMessages(res.data.data)

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

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    getMessages()
  }, [chatRoomId])

  return (
    <div>
      <MainScreen
        chats={messages}
        getMessages={getMessages}
        chatRoomId={chatRoomId}
      />
    </div>
  )
}
