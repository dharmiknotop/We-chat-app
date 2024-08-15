import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import styles from "./css/userList.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";

import { useRecoilState, useRecoilValue } from "recoil";
import { authUserAtom, messageId, theOtherUser } from "../../recoil/recoil";

import SearchMessages from "@features/searchMessage/SearchMessages";

import { FaUserCircle } from "react-icons/fa";

const UserList = ({ userList }) => {
  const router = useRouter();

  const user = useRecoilValue(authUserAtom);

  const [theChatter, setTheChatter] = useRecoilState(theOtherUser);

  const [specificMessageId, setSpecificMessageId] = useRecoilState(messageId);

  const [requestGetMessages, setRequestGetMessages] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [chatRoomId, setChatRoomId] = useState("");

  const [specificMessages, setSpecificMessages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

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

  const setChanges = (item) => {
    if (item?.chatRoomId === "") {
      getChatRoomId(item);
      setTheChatter({
        id: item?.userId,
        name: item?.userName,
        logo: item?.userLogo,
        chatRoomId,
      });
    } else {
      setTheChatter({
        id: item?.userId,
        name: item?.userName,
        logo: item?.userLogo,
        chatRoomId: item?.chatRoomId,
      });
      router.push(`/${item?.chatRoomId}`);
    }
  };

  useEffect(() => {
    getSpecificMessages();
  }, [searchQuery]);

  return (
    <Fragment>
      <SearchMessages
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* mapping the user list of the user  */}

      {searchQuery === "" ? (
        <div className={styles.s1__chatListContainer}>
          {userList &&
            userList?.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setChanges(item);
                  }}
                  className={`${styles.s1__chatListItem} ${
                    theChatter.id === item.userId &&
                    styles.s1__chatListItemActive
                  }`}
                >
                  <div className="rounded-circle">
                    {item?.userLogo && (
                      <img
                        src={item?.userLogo}
                        alt="userLogoImg"
                        width="50"
                        height="50"
                        className={`rounded-circle ${styles.s1__userImage}`}
                      />
                    )}
                    {item?.userLogo === "" && (
                      <FaUserCircle
                        className={styles.s1__userImage}
                        size={50}
                        color="gray"
                      />
                    )}
                  </div>
                  <div className={styles.s1__chatListItem__nameSection}>
                    <span className={styles.s1__chatListItem__nameTxt}>
                      {item?.userName}
                    </span>
                    <span className={styles.s1__chatListItem__lastMessageTxt}>
                      {item.lastMessageUser === user.name
                        ? "You"
                        : item.lastMessageUser}
                      : {item?.lastMessage}
                    </span>
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
              return (
                <Link
                  key={item._id}
                  href={`/${item.chatRoomId}`}
                  legacyBehavior
                >
                  <a>
                    <div
                      className={styles.specificMessages_container}
                      onClick={(e) => {
                        e.preventDefault();
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
    </Fragment>
  );
};

export default UserList;
