import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import AddUser from '../AddUser';

import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from './css/leftSection.module.scss';
import ChattingList from './ChattingList';

const LeftSection = ({ user, setTheChatter }) => {
  const locationRef = useRef();
  const router = useRouter();

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const [userList, setUserList] = useState([]);

  const [showDropDown, setShowDropDown] = useState(false);

  const [addUserModal, setAddUserModal] = useState(false);

  const logOut = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
    try {
      const res = await axios.post(
        `/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      router.push('/login');

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

  const changeDropDownStatus = () => {
    setShowDropDown(false);
  };

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
    );
  };

  const getUserDetails = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
    try {
      const res = await axios.get(`/api/aboutUser/getUserDetail`, {
        withCredentials: true,
      });

      setUserList(res.data.data.userList);

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

  // this hook is used to close the dropdown if the user click anywhere outside the dropdown section

  useOnClickOutside(locationRef, changeDropDownStatus);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className={styles.s1}>
      <div className={styles.s1__headerContainer}>
        <div className="d-flex align-items-center ms-3">
          {user?.userLogo && (
            <Image
              src={user?.logoUrl}
              alt="userLogoImg"
              width="50"
              height="50"
              className="rounded-circle "
            />
          )}
          <h3 className={styles.s1__headerContainer__heading}>{user?.name}</h3>
        </div>
        {/* Header Section */}
        <div
          className={styles.s1__headerContainer__threeDotIconContainer}
          ref={locationRef}
        >
          <BsThreeDotsVertical
            onClick={() => {
              setShowDropDown(!showDropDown);
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
                setAddUserModal(true);
                setShowDropDown(false);
              }}
            >
              Add a user
            </li>
            <li
              onClick={() => {
                logOut();
              }}
            >
              log out
            </li>
          </ul>
        </div>
      </div>

      <ChattingList userList={userList} setTheChatter={setTheChatter} />
      {renderAddUserModal()}
    </div>
  );
};

export default LeftSection;
