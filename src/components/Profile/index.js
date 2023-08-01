import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

import SideBar from "../SideBar/SideBar";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import FormControl from "../../utilities/FormControl";
import AddTransactionBtn from "../AddTransactionBtn";

import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";
import profileOptions from "../../constants/profile-options";

import "./index.css";

let data = [];

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

let userId = null


const Profile = () => {
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

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
    data = {
      name: unformattedData.name,
      email: unformattedData.email,
      country: unformattedData.country || "",
      dateOfBirth: unformattedData.date_of_birth,
      city: unformattedData.city || "",
      permanentAddress: unformattedData.permanent_address || "",
      postalCode: unformattedData.postal_code || "",
      presentAddress: unformattedData.present_address || "",
    };

    setApiStatus(apiStatusContants.success);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  userId = Number(userId);
  const filteredUsers = profileImgs.filter((user) => user.userId === userId);
  
  const userProfilePictureUrl = filteredUsers.length > 0 ? filteredUsers[0].imgUrl : "";

  

  const renderSuccessView = () => {
    return (
      <div className="content">
        <div>
        {userId === 3 ? (<FaUserCircle className="icon" />):
          (<img
            className="profilepic"
            alt="profile-logo"
            src={userProfilePictureUrl}
          />)}
        </div>
        <ul className="profileDetails">
          {profileOptions.map((item) => (
            <FormControl key={item.id} {...item} value={data[item.id]} />
          ))}
        </ul>
      </div>
    );
  };

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatus) {
      // Failure View
      case apiStatusContants.failure:
        return <FailureView fetchData={fetchData} />;

      case apiStatusContants.success:
        // Success View
        return renderSuccessView();

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  return (
    <div className="page">
      <SideBar />

      <div className="profile">
        <div className="header">
          <h3>Profile</h3>
          {userId !== 3 &&  <AddTransactionBtn reload={fetchData} /> }
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;