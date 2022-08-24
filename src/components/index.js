import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import styles from '../../styles/mainScreen.module.scss'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { Modal } from 'react-bootstrap'
import AddUser from './AddUser'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { authUserAtom, theOtherUser } from '../recoil/recoil'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from '@firebase/firestore'
import { db } from '../../firebaseConfig'
import { BiSend } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Index = () => {
  const locationRef = useRef()

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  })

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser)

  const user = useRecoilValue(authUserAtom)

  const otherUser = useRecoilValue(theOtherUser)

  const [showDropDown, setShowDropDown] = useState(false)

  const [addUserModal, setAddUserModal] = useState(false)

  const [userList, setUserList] = useState([])

  const [snapshot, loading, error] = useCollection(collection(db, 'chats'))

  console.log(snapshot)

  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

  console.log(chats)

  const changeDropDownStatus = () => {
    setShowDropDown(false)
  }

  const getUserDetails = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    })
    try {
      const res = await axios.get(`api/validateSession`, {
        withCredentials: true,
      })

      console.log(res.data.data.userList)

      setUserList(res.data.data.userList)

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

  const renderLeftSection = () => {
    return (
      <div className={styles.s1}>
        <div className={styles.s1__headerContainer}>
          <h3 className={styles.s1__heading}>{user?.name}</h3>
          {/* Header Section */}
          <div className={styles.s1__threeDotIconContainer} ref={locationRef}>
            <BsThreeDotsVertical
              onClick={() => {
                setShowDropDown(!showDropDown)
              }}
            />
            <ul
              className={
                showDropDown === true
                  ? `${styles.s1__dropdownActive} ${styles.s1__dropdown}  `
                  : `${styles.s1__dropdown} `
              }
            >
              <li
                onClick={() => {
                  setAddUserModal(true)
                  setShowDropDown(false)
                }}
              >
                Add a user
              </li>
              <li onClick={() => {}}>log out</li>
            </ul>
          </div>
        </div>
        {/* the user list of user's contact  */}
        <div className={styles.s1}>
          {userList?.map((item) => {
            return (
              <div
                key={item?.id}
                onClick={() => {
                  setTheChatter({
                    id: item?.id,
                    name: item?.userName,
                  })
                }}
              >
                {item?.userName}
              </div>
            )
          })}
        </div>{' '}
      </div>
    )
  }

  const renderRightSection = () => {
    return (
      <div className={` ${styles.s2__container}`}>
        <div className="h-100">
          {' '}
          <div className={styles.s2__headerContainer}>{theChatter.name}</div>
          <div className={styles.s2__chatContainer}>
            asdf
            <div className={styles.s2__chatContainer__overlay}></div>
          </div>
        </div>
        <div className={styles.s2__addAChatContainer}>
          <input
            className={styles.s2__addAChatContainer__input}
            type="text"
            placeholder="Type a Message"
          />

          <BiSend color="gray" className={styles.s2__addAChatContainer__svg} />
        </div>
      </div>
    )
  }

  const renderAddUserModal = () => {
    return (
      <Modal
        show={addUserModal}
        size="lg"
        onHide={() => setAddUserModal(false)}
        style={{
          borderRadius: '0px',
        }}
      >
        <Modal.Body
          style={{
            padding: '0px',
          }}
        >
          <AddUser
            setAddUserModal={setAddUserModal}
            getUserDetails={getUserDetails}
          />
        </Modal.Body>
      </Modal>
    )
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  // this hook is used to close the dropdown if the user click anywhere outside the dropdown section

  useOnClickOutside(locationRef, changeDropDownStatus)

  return (
    <div className={` ${styles.containerOuter}`}>
      <div className={` ${styles.container}`}>
        <div className={`${styles.s}`}>{renderLeftSection()}</div>
        <div className={`${styles.s2}`}>{renderRightSection()}</div>
        {renderAddUserModal()}
      </div>
    </div>
  )
}

export default Index
