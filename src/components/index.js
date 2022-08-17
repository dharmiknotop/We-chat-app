import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { authUserAtom } from '../recoil/recoil'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from '../../styles/mainScreen.module.scss'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { Modal } from 'react-bootstrap'
import AddUser from './AddUser'

const index = () => {
  const locationRef = useRef()

  const user = useRecoilValue(authUserAtom)

  const [showDropDown, setShowDropDown] = useState(false)

  const [addUserModal, setAddUserModal] = useState(false)

  const changeDropDownStatus = () => {
    setShowDropDown(false)
  }

  const renderLeftSection = () => {
    return (
      <div className={styles.s1}>
        <div className={styles.s1__headerContainer}>
          <h3 className={styles.s1__heading}>{user?.name}</h3>
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
      </div>
    )
  }

  const renderAddUser = () => {
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
          <AddUser />
        </Modal.Body>
      </Modal>
    )
  }

  // this hook is used to close the dropdown if the user click anywhere outside the dropdown section

  useOnClickOutside(locationRef, changeDropDownStatus)
  return (
    <div className={` ${styles.containerOuter}`}>
      <div className={` ${styles.container}`}>
        <div className={` ${styles.s} `}>{renderLeftSection()}</div>
        <div className={` ${styles.s2} `}>sadf</div>
        {renderAddUser()}
      </div>
    </div>
  )
}

export default index
