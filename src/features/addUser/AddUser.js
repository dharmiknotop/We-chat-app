import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './css/addUser.module.scss';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authUserAtom } from '../../recoil/recoil';

import { ImCross } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';

import toast, { Toaster } from 'react-hot-toast';

const AddUser = ({ setAddUserModal, getUserDetails }) => {
  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const user = useRecoilValue(authUserAtom);

  const [allUsers, setAllUsers] = useState([]);

  const getAllUser = async () => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
    try {
      const res = await axios.post(
        `/api/aboutUser/getAllUser`,
        {},
        {
          withCredentials: true,
        }
      );

      setAllUsers(res.data.data);
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

  const uploadDetails = (item) => {
    if (checkIfUserExists(item) === true) {
      return;
    }

    addUserToChatSection(item);
  };

  const addUserToChatSection = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
    try {
      await axios.post(
        `/api/aboutUser/addUser`,
        {
          otherUserId: item._id,
          otherUserName: item.name,
          otherUserLogo: item.logoUrl,
        },
        {
          withCredentials: true,
        }
      );

      setAddUserModal(false);

      getUserDetails();

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

  const checkIfUserExists = (item) => {
    let userList = user?.userList;

    for (let i = 0; i < userList.length; i++) {
      if (item._id === userList[i].userId) {
        toast.error('User Already exist', {
          position: 'bottom-center',
        });

        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className={styles.s__container}>
      <div className={styles.s__topSection}>
        <div className={styles.s__title}>Add a User to the chat Section</div>
        <ImCross
          onClick={() => {
            setAddUserModal(false);
          }}
          className={styles.s__crossIcon}
          color="black"
        />
      </div>
      {requestGetUser.loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
      {!requestGetUser.loading && (
        <div>
          {allUsers?.map((item) => {
            console.log(item);
            return (
              <div
                key={item._id}
                className={styles.s__userContainer}
                onClick={() => {
                  uploadDetails(item);
                }}
              >
                <div>
                  {item?.logoUrl && (
                    <Image
                      src={item?.logoUrl}
                      alt="User Image"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  )}
                  {item?.logoUrl === '' && (
                    <FaUserCircle size={50} color="gray" />
                  )}
                </div>
                <h1 className={styles.s__userName}> {item.name}</h1>
              </div>
            );
          })}
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddUser;
