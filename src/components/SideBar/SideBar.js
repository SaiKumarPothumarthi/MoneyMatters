import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { BiExit } from "react-icons/bi";

import BtnSecondary from "../../utilities/BtnSecondary";
import BtnOutline from "../../utilities/BtnOutline";
import Modal from "../../utilities/Modal";

import styles from "./SideBar.module.css";
import apiInitialOptions from "../../constants/api-initial-options";

let userId = null;

const profileImgs = [
  {
    userId: 1,
    email: 'jane.doe@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806290/68_kc2xbd.jpg",
  },
  {
    userId: 2,
    email: 'samsmith@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806317/1_fizr3z.jpg",
  },
  {
    userId: 4,
    email: 'rahul@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806290/62_yakj64.jpg",
  },
  {
    userId: 5,
    email: 'teja@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806290/86_kt8l2r.jpg",
  },
  {
    userId: 6,
    email: 'loki@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/47_utpsil.jpg",
  },
  {
    userId: 7,
    email: 'ramesh@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/61_npzetd.jpg",
  },
  {
    userId: 8,
    email: 'suresh@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/73_ol1e2j.jpg",
  },
  {
    userId: 9,
    email: 'prem@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/49_u0qfnj.jpg",
  },
  {
    userId: 10,
    email: 'piyush@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/33_sbtzvl.jpg",
  },
  {
    userId: 12,
    email: 'isha@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806289/60_vyrlej.jpg",
  },
  {
    userId: 14,
    email: 'seema@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806288/3_wh2zq4.jpg",
  },
  {
    userId: 16,
    email: 'radha@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806288/18_gjgiwz.jpg",
  },
  {
    userId: 17,
    email: 'phani@gmail.com',
    imgUrl: "https://res.cloudinary.com/dadmzulfj/image/upload/v1690806288/9_zk627z.jpg",
  },
]


const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    userId = Cookies.get("user_id");

    let url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userId.toString(),
      },
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    const unformattedData = fetchedData.users[0];
    setUserData({
      name: unformattedData.name,
      email: unformattedData.email,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onLogout = () => {
    Cookies.remove("user_id");
    navigate("/login", { replace: true });
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <div>
        <img
          alt="delete"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690718727/warning_dtqvuy.png"
        />
      </div>
      <div className={styles.modalContent}>
        <h3>You are attempting to logout from Money Matters</h3>
        <p>Are you sure?</p>
        <div className={styles.modalButtonsContainer}>
          <BtnSecondary onClick={onLogout}>Yes, Logout</BtnSecondary>
          <BtnOutline onClick={hideModal}>Cancel</BtnOutline>
        </div>
      </div>
    </Modal>
  );
  

  
  const filteredUsers = profileImgs.filter((user) => user.email === userData.email);
  
  const userProfilePictureUrl = filteredUsers.length > 0 ? filteredUsers[0].imgUrl : "";


  return (
    <>
      {isModalVisible && renderModal()}
      <div className={styles.sidebar}>
        
        <img
          className={styles.logo}
          alt="money-matters-logo"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690626504/Logo_k10a32.png"
        />

        <ul className={styles.navLinksList}>
          <Link className="reactLink" to="/">
            <li className={pathname === "/" ? styles.active : ""}>
              <AiFillHome className={styles.icon} />
              Dashboard
            </li>
          </Link>

          <Link className="reactLink" to="/transactions">
            <li className={pathname === "/transactions" ? styles.active : ""}>
              <FaMoneyBillTransfer className={styles.icon} />
              {userId === "3" ? "All Transactions" : "Transactions"}
            </li>
          </Link>

          <Link className="reactLink" to="/profile">
            <li className={pathname === "/profile" ? styles.active : ""}>
              <FaUserAlt className={styles.icon} />
              Profile
            </li>
          </Link>
        </ul>

        <div className={styles.profile}>
          <div>
          {userId === "3" ? (<FaUserCircle className={styles.icon} />):
          (<img
            className={styles.profilepic}
            alt="profile-logo"
            src={userProfilePictureUrl}
          />)}
          </div>
          <div className={styles.profileContent}>
            <p className={styles.profileName}>{userData.name}</p>
            <p className={styles.userName}>{userData.email}</p>
          </div>
          <button className={styles.exitIcon} onClick={showModal}>
            <BiExit />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;