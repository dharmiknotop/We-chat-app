import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { DebounceInput } from "react-debounce-input";
import { useRecoilState } from "recoil";
import { messageId } from "../../recoil/recoil";

import AddUser from "../AddUser";

import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import styles from "./css/leftSection.module.scss";

const LeftSection = ({ user, setTheChatter }) => {
  const locationRef = useRef();
  const router = useRouter();

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [requestGetMessages, setRequestGetMessages] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [specificMessageId, setSpecificMessageId] = useRecoilState(messageId);

  const [userList, setUserList] = useState([]);

  const [specificMessages, setSpecificMessages] = useState([]);

  const [chatRoomId, setChatRoomId] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);

  const [addUserModal, setAddUserModal] = useState(false);

  const getUserDetails = async (item) => {
    setRequestGetUser({
      loading: true,
      success: "",
      error: "",
    });
    try {
      const res = await axios.get(`/api/aboutUser/getUserDetail`, {
        withCredentials: true,
      });

      setUserList(res.data.data.userList);

      setRequestGetUser({
        loading: false,
        success: "Added Successfully.",
        error: "",
      });
    } catch (error) {
      console.log("error: ", error);
      setRequestGetUser({
        loading: false,
        success: "",
        error: "Some unexpected error occur.",
      });
    }
  };

  const getChatRoomId = async (item) => {
    setRequestGetUser({
      loading: true,
      success: "",
      error: "",
    });
    try {
      const res = await axios.post(
        `/api/chatRoom/addChatRoom`,
        { otherUserId: item?.userId, otherUserName: item?.userName },
        {
          withCredentials: true,
        }
      );

      setChatRoomId(res.data.data._id);

      router.push(`/${res.data.data._id}`);

      setRequestGetUser({
        loading: false,
        success: "Added Successfully.",
        error: "",
      });
    } catch (error) {
      console.log("error: ", error);
      setRequestGetUser({
        loading: false,
        success: "",
        error: "Some unexpected error occur.",
      });
    }
  };

  const getSpecificMessages = async () => {
    setRequestGetMessages({
      loading: true,
      success: "",
      error: "",
    });
    try {
      const res = await axios.post(
        `/api/messages/getSpecificMessages`,
        { searchQuery },
        {
          withCredentials: true,
        }
      );

      setSpecificMessages(res.data.data);

      setRequestGetMessages({
        loading: false,
        success: "Added Successfully.",
        error: "",
      });
    } catch (error) {
      console.log("error: ", error);
      setRequestGetMessages({
        loading: false,
        success: "",
        error: "Some unexpected error occur.",
      });
    }
  };

  const logOut = async (item) => {
    setRequestGetUser({
      loading: true,
      success: "",
      error: "",
    });
    try {
      const res = await axios.post(
        `/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      router.push("/login");

      setRequestGetUser({
        loading: false,
        success: "Added Successfully.",
        error: "",
      });
    } catch (error) {
      console.log("error: ", error);
      setRequestGetUser({
        loading: false,
        success: "",
        error: "Some unexpected error occur.",
      });
    }
  };

  const changeDropDownStatus = () => {
    setShowDropDown(false);
  };

  const setChanges = (item) => {
    console.log(item);

    if (item?.chatRoomId === "") {
      getChatRoomId(item);
      setTheChatter({
        id: item?.userId,
        name: item?.userName,
        chatRoomId,
      });
    } else {
      setTheChatter({
        id: item?.userId,
        name: item?.userName,
        chatRoomId: item?.chatRoomId,
      });
      router.push(`/${item?.chatRoomId}`);
    }
  };

  const renderAddUserModal = () => {
    return (
      <Modal
        show={addUserModal}
        size="lg"
        onHide={() => setAddUserModal(false)}
        style={{
          borderRadius: "0px",
        }}
      >
        <Modal.Body
          style={{
            padding: "0px",
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

  // this hook is used to close the dropdown if the user click anywhere outside the dropdown section

  useOnClickOutside(locationRef, changeDropDownStatus);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    getSpecificMessages();
  }, [searchQuery]);

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
      <div className={styles.search__searchOuterContainer}>
        <div className={styles.search__searchContainer}>
          <AiOutlineSearch className="mx-2" />
          <DebounceInput
            debounceTimeout={500}
            type="text"
            className={`${styles.search__searchContainer__input}`}
            // value={searchQuery}
            placeholder={`Search `}
            onChange={(t) => {
              setSearchQuery(t.target.value);
            }}
          />
        </div>
      </div>
      {/* mapping the user list of the user  */}{" "}
      {searchQuery === "" ? (
        <div className={styles.s1__chatListContainer}>
          {userList?.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  setChanges(item);
                }}
                className={styles.s1__chatListItem}
              >
                {/* {console.log('item', item)} */}
                <div className="rounded-circle mx-3">
                  {item?.userLogo && (
                    <Image
                      src={item?.userLogo}
                      alt="userLogoImg"
                      width="50"
                      height="50"
                      className="rounded-circle"
                    />
                  )}
                  {item?.userLogo === "" && (
                    <Fragment>
                      <FaUserCircle size={50} color="gray" />
                    </Fragment>
                  )}
                </div>
                <div className={styles.s1__chatListItem__nameSection}>
                  <span className={styles.s1__chatListItem__nameTxt}>
                    {item?.userName}
                  </span>
                  <span>{item?.lastMessage} </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.specificMessages}>
          {requestGetMessages.loading && (
            <div className="text-center pt-4">
              <div className="spinner-border text-primary" role="status" />
            </div>
          )}

          {!requestGetMessages.loading &&
            specificMessages.map((item) => {
              // console.log('specificMeassage', item)
              return (
                <Link key={item._id} href={`/${item.chatRoomId}`}>
                  <a>
                    {" "}
                    <div
                      className={styles.specificMessages_container}
                      onClick={() => {
                        console.log(item);
                        setTheChatter({
                          id: item?.id,
                          name: item?.userName,
                          chatRoomId,
                        });
                        setSpecificMessageId({ id: item?._id });
                      }}
                    >
                      <h1>{item?.userName}</h1>
                      <h2> {item?.message} </h2>
                    </div>
                  </a>
                </Link>
              );
            })}

          {!requestGetMessages.loading && specificMessages.length === 0 && (
            <div className="text-center pt-4">
              <h1>No messages Found</h1>
            </div>
          )}
        </div>
      )}
      {renderAddUserModal()}
    </div>
  );
};

export default LeftSection;
