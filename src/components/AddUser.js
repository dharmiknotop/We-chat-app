import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/addUser.module.scss'

const AddUser = () => {
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

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <div className={styles.s__container}>
      <div className={styles.s__topSection}>Add a User to the chat Section</div>
      {requestGetUser.loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
      {!requestGetUser.loading && (
        <div className={styles.s}>
          {allUsers?.map((item) => {
            return <div className={styles.s__itemContainer}>{item.name}</div>
          })}
        </div>
      )}{' '}
    </div>
  )
}

export default AddUser
