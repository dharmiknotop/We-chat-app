import { useEffect } from 'react'
import axios from 'axios'
import { authUserAtom } from '../recoil/recoil'
import { useRecoilState } from 'recoil'

const ValidateUser = () => {
  const [user, setUser] = useRecoilState(authUserAtom)
  const getUserDetails = async () => {
    try {
      const res = await axios.get(`api/validateSession`, {
        withCredentials: true,
      })
      setUser({
        id: res.data.data._id,
        name: res.data.data.name,
        email: res.data.data.email,
      })
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return <div></div>
}

export default ValidateUser
