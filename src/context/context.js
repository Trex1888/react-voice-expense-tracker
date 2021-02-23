import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = [
  {
    amount: 1000,
    category: "Salary",
    type: "Income",
    date: "2021-03-01",
    id: "aace4aeb-26a1-41f9-bdcf-645d511705eb",
  },
  {
    amount: 325,
    category: "Car",
    type: "Expense",
    date: "2021-02-28",
    id: "aace4aeb-26a1-41f9-bdcf-645d511705eb",
  },
  {
    amount: 125,
    category: "Gifts",
    type: "Income",
    date: "2021-03-02",
    id: "aace4aeb-26a1-41f9-bdcf-645d511705eb",
  },
  {
    amount: 100,
    category: "Internet",
    type: "Expense",
    date: "2021-03-19",
    id: "aace4aeb-26a1-41f9-bdcf-645d511705eb",
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    console.log(transactions);
  };

  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
