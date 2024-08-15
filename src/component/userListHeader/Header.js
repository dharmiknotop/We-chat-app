import { useRef, useState } from "react";
import styles from "./css/header.module.scss";

import { useRouter } from "next/router";

import { useRecoilValue } from "recoil";
import { authUserAtom } from "@src/recoil/recoil";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

const Header = (props) => {
  let { setAddUserModal } = props;

  const [showDropDown, setShowDropDown] = useState(false);

  const locationRef = useRef();
  const router = useRouter();

  const user = useRecoilValue(authUserAtom);

  const [requestGetUser, setRequestGetUser] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const logOut = async () => {
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

      router.push("/auth/login");

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

  // this hook is used to close the dropdown if the user click anywhere outside the dropdown section

  useOnClickOutside(locationRef, changeDropDownStatus);

  return (
    <div className={styles.s1}>
      <div className="d-flex align-items-center">
        {user?.logoUrl && (
          <img
            src={user?.logoUrl}
            alt="userLogoImg"
            width="50"
            height="50"
            className="rounded-circle "
          />
        )}
        <h3 className={styles.s1__heading}>{user?.name}</h3>
      </div>

      <div className={styles.s1__threeDotIconContainer} ref={locationRef}>
        <BsThreeDotsVertical
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
        />
        <ul
          className={
            showDropDown === true
              ? `${styles.s1__dropdownActive} ${styles.s1__dropdown}`
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
  );
};

export default Header;
