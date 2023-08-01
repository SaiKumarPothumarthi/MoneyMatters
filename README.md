I have to develop a Personal Transaction Management App. This role-based portal will handle a user's personal transaction record, and an Admin User should be able to view all the transactions recorded across the using ReactJs,HTML,CSS,JS

1 **Admin User**
    - Admin User should be able to log in using the below credentials
        
        **Email:** `admin@gmail.com` 
        
        **Password:** Admin@123
        
- **Non-Admin User**
    - The user should be able to Login Using the following credentials
    - **Users**
    - | Email | Password | User Id |
      | ---   | ---      | ---   |
      | jane.doe@gmail.com | janedoe@123 | 1 |
      | samsmith@gmail.com | samsmith@123 | 2 |
      | rahul@gmail.com | rahul@123 | 4 |
      | teja@gmail.com | teja@123 | 5 |
      | loki@gmail.com | loki@123 | 6 |
      | ramesh@gmail.com | ramesh@123 | 7 |
      | suresh@gmail.com | suresh@123 | 8 |
      | prem@gmail.com | prem@123 | 9 |
      | piyush@gmail.com | piyush@123 | 10 |
      | isha@gmail.com | isha@123 | 12 |
      | seema@gmail.com | seema@123 | 14 |
      | seema@123 | arjun@123 | 15 |
      | radha@gmail.com  | radha@123 | 16 |
      | phani@gmail.com | phani@123 | 17 |


2 After Logging in to the application, the user to see and navigate to all the pages available to him based on his role
    
    **Admin User:**
    
    - Dashboard
    - All Transactions
    - Profile
    - Logout
  **Non-Admin User:**

- Dashboard
- Your Transactions
- Profile
- Logout

3. **Dashboard**
    - After Logging in to the application, the user should be navigated to this page by default
    - **Admin User** should be able to view the following on the page
        - **Total Credit** and **Total Debit** amounts of all the users
        - **Recent three transactions** are done in the app (Sorted based on the transaction date)
        - A **Bar Chart** showing the daily total credit and total debt of all the users in the last 7 days
          
4. **Your Transactions - Non-Admin User Only**
    - When the page is opened, the user should be able to see the following Tabs
        - All Transactions - Displays the list of all the transactions done by the user
        - Credit - Displays the list of **Credit** type of transactions done by the user
        - Debit - Displays list of the **Debit** type of transactions done by the user
    - The list of transactions should be an infinite scroll pagination list
    - Each Transaction should consist of the following details
        - Transaction Name
        - Category
        - Amount
        - Date
        - Option to Update or Delete the Transaction
    - The user should be able to update a transaction by clicking on the Edit Button on the transaction
  
   5. **All Transactions - Admin User Only**
    - When the page is opened, the user should be able to see the following Tabs
        - All Transactions - Displays the list of all the transactions done by all the users
        - Credit - Displays the list of **Credit** type of transactions done by all the users
        - Debit - Displays list of the **Debit** type of transactions done by all the users
    - The list of transactions should be an infinite scroll pagination list
    - Each Transaction should consist of the following details
        - User Name
        - Transaction Name
        - Category
        - Amount
        - Date
    6. **Add Transaction**
    - Only Non-Admin users should be able to view the **Add Transaction** button in the header
    - When the user clicks on **Add Transaction** a pop-up should be shown to enter the following details
        - Transaction Name- Input type **Text**
        - Transaction Type - Input type **Select** with options Credit, Debit
        - Transaction Category - Input type **Select** with options Entertainment, Food, Shopping, etc…
        - Amount - Input type Number
        - Date - Input type Date
        - **Validations**
            - All the above-mentioned fields are required(*)
            - **Transaction Name -** This field should have a maximum of 30 characters
            - **Amount -** Should only accept numeric values and the value should always be greater than zero
    - Once the user has added a transaction successfully show a toast saying the same
    - The newly added transaction should be displayed in the list of transactions
    - Newly updated total amounts should be displayed in the **Dashboard**
   7. **Update Transaction**
    - Only Non-Admin users should be able to update an existing transaction, by clicking on the edit icon on any existing transaction
    - When the user clicks on **Edit Icon** a pop-up should be shown to enter the following details
        - Transaction Name- Input type **Text**
        - Transaction Type - Input type **Select** with options Credit, Debit
        - Transaction Category - Input type **Select** with options Entertainment, Food, Shopping, etc…
        - Amount - Input type Number
        - Date - Input type Date
        - **Validations**
            - All the above-mentioned fields are required(*)
            - **Transaction Name -** This field should have a maximum of 30 characters
            - **Amount -** Should only accept numeric values and the value should always be greater than zero
    - Once the user has updated a transaction successfully show a toast saying the same
    - The updated transaction details should be reflected in the list of transactions
    - Newly updated total amounts should be displayed in the **Dashboard**
  8. **Delete Transaction**
    - Only Non-Admin users should be able to delete an existing transaction, by clicking on the delete icon on any existing transaction
    - When the user clicks on the **Delete** Icon show a confirmation pop-up for the action
    - Once the user has updated a transaction successfully show a toast saying the same
    - Newly updated total amounts should be displayed in the **Dashboard**
  9. **Profile**
    - When the user opens the profile page, the user should be able to view the following details
        - Profile Icon
        - Name
        - Username
        - Email
        - Date Of Birth
    10. **Logout**
    - When the user clicks logout, show a confirmation pop-up for the action
    - Once the user logs out of the application, the user should not be able to access any of the authenticated pages