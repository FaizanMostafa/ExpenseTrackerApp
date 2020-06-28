import React, {createContext, useReducer} from 'react';
import transactionsReducer from './transactionsReducer';

const initialTransactions = [];

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({children}) => {
    const [state, dispatch] = useReducer(transactionsReducer, initialTransactions);

    function addTransaction(transaction) {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: transaction
        })
    }

    function removeTransaction(index) {
        dispatch({
            type: "REMOVE_TRANSACTION",
            payload: index
        })
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction,
            removeTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
