import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import styles from "./css/userList.module.scss";

import { Modal } from "react-bootstrap";

const AddUser = dynamic(() => import("@features/addUser/AddUser"));
const Header = dynamic(() => import("@component/userListHeader/Header"));
const UserList = dynamic(() => import("@component/userList/UserList"));

const UserListContainer = () => {
  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const [userList, setUserList] = useState([]);

  const [addUserModal, setAddUserModal] = useState(false);

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

  const getUserDetails = async () => {
    try {
      setRequestGetUser({
        loading: true,
        success: "",
        error: "",
      });

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

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className={styles.s1}>
      <Header setAddUserModal={setAddUserModal} />

      {requestGetUser.loading && (
        <div className="text-center pt-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}
      {!requestGetUser.loading && requestGetUser.success !== "" && (
        <UserList userList={userList} />
      )}

      {renderAddUserModal()}
    </div>
  );
};

export default UserListContainer;
