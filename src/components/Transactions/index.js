import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import SideBar from "../SideBar/SideBar";
import TransactionsList from "../TransactionsList";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import AddTransactionBtn from "../AddTransactionBtn";

import tabOptions from "../../constants/tab-options";
import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./index.module.css";

let allTransactionsData = [];
let userId = null;
let isAdmin = false;
let usersData = [];

const Transactions = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [currentTab, setCurrentTab] = useState("all-transactions");

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    userId = Cookies.get("user_id");
    isAdmin = userId === "3";

    // Fetching Credit Debit Totals
    let url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": isAdmin ? "admin" : "user",
        "x-hasura-user-id": userId.toString(),
      },
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    allTransactionsData = fetchedData["transactions"].sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    // Fetching All Users Data if Admin
    if (isAdmin) {
      url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
      options = {
        method: "GET",
        headers: {
          ...apiInitialOptions,
          "x-hasura-role": "admin",
          "x-hasura-user-id": "3",
        },
      };

      response = await fetch(url, options);
      fetchedData = await response.json();
      usersData = fetchedData.users.map((item) => ({
        name: item.name,
        id: item.id,
      }));
    }

    setApiStatus(apiStatusContants.success);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatus) {
      // Failure View
      case apiStatusContants.failure:
        return <FailureView fetchData={fetchData} />;

      case apiStatusContants.success:
        // Success View
        return (
          <div className={styles.content}>
            {/* Last Transaction */}
            <TransactionsList
              allTransactionsData={allTransactionsData}
              currentTab={currentTab}
              reload={fetchData}
              isAdmin={isAdmin}
              usersData={usersData}
            />
          </div>
        );

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  return (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.transactions}>
        <div className={styles.header}>
          <div>
            <h3 className="trans-head">Transactions</h3>
            {!isAdmin && <AddTransactionBtn reload={fetchData} /> }
            
          </div>
          <ul className={styles.tabsList}>
            {tabOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                className={currentTab === item.value ? styles.active : ""}
                onClick={() => setCurrentTab(item.value)}
              >
                {item.name}
              </button>
            ))}
          </ul>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Transactions;