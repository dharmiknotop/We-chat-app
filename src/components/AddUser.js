import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './css/addUser.module.scss';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authUserAtom } from '../recoil/recoil';

import { ImCross } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';

import toast, { Toaster } from 'react-hot-toast';

const AddUser = ({ setAddUserModal, getUserDetails }) => {
  let displayOrNot = true;

  let tempUserArr = [];

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const userList = useRecoilValue(authUserAtom);

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

  const addUserToChatSection = async (item) => {
    setRequestGetUser({
      loading: true,
      success: '',
      error: '',
    });
    try {
      const res = await axios.post(
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

      getUserDetails();
      setAddUserModal(false);

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
            for (let i = 0; i < tempUserArr?.length; i++) {
              console.log(item?._id === tempUserArr[i]);
            }

            return (
              <Fragment key={item?.id}>
                <div
                  className={styles.s__userContainer}
                  onClick={() => {
                    console.log(item);
                    for (let i = 0; i < userList?.userList?.length; i++) {
                      if (item?._id === userList?.userList[i].userId) {
                        toast.error('User Already exist', {
                          position: 'bottom-center',
                        });

                        return;
                      }
                      // console.log(tempUserArr);
                    }

                    addUserToChatSection(item);
                  }}
                >
                  <Fragment>
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
                        <Fragment>
                          <FaUserCircle size={50} color="gray" />
                        </Fragment>
                      )}
                    </div>
                    <h1 className={styles.s__userName}> {item.name}</h1>
                  </Fragment>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}{' '}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddUser;
