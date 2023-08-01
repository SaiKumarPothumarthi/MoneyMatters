import styles from "./index.module.css";

const SummaryCard = ({ value, type }) => {
  const imgUrl =
    type === "credit"
      ? "https://res.cloudinary.com/dadmzulfj/image/upload/v1690725564/Group_f8m0zt.png"
      : "https://res.cloudinary.com/dadmzulfj/image/upload/v1690725593/Group_1_yddcud.png";

  return (
    <div className={styles.summaryCard}>
      <div className={styles.content}>
        <p className={styles[type]}>${value.toLocaleString()}</p>
        <p className={styles.type}>{type === "credit" ? "Credit" : "Debit"}</p>
      </div>
      <img src={imgUrl} alt={type === "credit" ? "credit" : "debit"} />
    </div>
  );
};

export default SummaryCard;