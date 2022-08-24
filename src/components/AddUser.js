import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/addUser.module.scss'
import { ImCross } from 'react-icons/im'

const AddUser = ({ setAddUserModal, getUserDetails }) => {
  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const [allUsers, setAllUsers] = useState([])

  const getAllUser = async () => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    })
    try {
      const res = await axios.post(
        `/api/auth/getAllUser`,
        {},
        {
          withCredentials: true,
        },
      )
      setAllUsers(res.data.data)
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

  const addUserToChatSection = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    })
    try {
      const res = await axios.post(
        `/api/aboutUser/addUser`,
        { userId: item._id, userName: item.name },
        {
          withCredentials: true,
        },
      )

      getUserDetails()
      setAddUserModal(false)

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
    getAllUser()
  }, [])

  return (
    <div className={styles.s__container}>
      <div className={styles.s__topSection}>
        <div>Add a User to the chat Section</div>
        <ImCross
          onClick={() => {
            setAddUserModal(false)
          }}
          className="cross"
          color="black"
        />
      </div>
      {requestGetUser.loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
      {!requestGetUser.loading && (
        <div className={styles.s}>
          {allUsers?.map((item) => {
            return (
              <div
                key={item?.id}
                className={styles.s__itemContainer}
                onClick={() => {
                  addUserToChatSection(item)
                }}
              >
                {item.name}
              </div>
            )
          })}
        </div>
      )}{' '}
    </div>
  )
}

export default AddUser
