import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import {FaUserCircle} from "react-icons/fa"
import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import "./index.css";

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

const AdminTransactionItem = (props) => {
  const {
    id,
    transactionName,
    type,
    category,
    amount,
    date,
    reload,
    isAdmin,
    username,
    userId

  } = props;

  const icon =
    type === "credit" ? (
      <BsArrowUpCircle className="creditIcon" />
    ) : (
      <BsArrowDownCircle className="debitIcon" />
    );

  const dateTime = new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const sign = type === "credit" ? "+" : "-";

  let newUserId = Number(userId)

  const filteredUsers = profileImgs.filter((user) => user.userId === newUserId);
  
  const userProfilePictureUrl = filteredUsers.length > 0 ? filteredUsers[0].imgUrl : "";

  const renderBtns = () => {
    if (isAdmin === false){
      return (
        <div className="buttonsContainer">
          {<UpdateTransactionBtn {...props} />}
          {<DeleteTransactionButton id={id} reload={reload} isAdmin={isAdmin} />}
        </div>
      )
    }
  }

  return (
    <tr className="transactionItem">
      <td className="transactionName">
        <div>
          {icon}
          {username === "admin" ? (<FaUserCircle className="userProfileImgIcon" />):
          (<img
            className="userProfileImgIcon"
            alt="profile-logo"
            src={userProfilePictureUrl}
          />)}
          {username}
        </div>
      </td>
      <td>{transactionName}</td>
      <td>{category}</td>
      <td>{dateTime}</td>
      <td className={type}>
        {sign}${amount.toLocaleString()}
      </td>
      <td>
        <div className="buttonsContainer">
          {renderBtns()}
        </div>
      </td>
    </tr>
  );
};

export default AdminTransactionItem;