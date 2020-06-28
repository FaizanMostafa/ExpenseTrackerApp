import React, {useContext, useState} from 'react';
import {TransactionContext} from '../transactionsContext';

export default function ExpenseApp() {

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const {transactions, addTransaction, removeTransaction} = useContext(TransactionContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(amount !== 0 && description.trim().length > 0) {
            addTransaction({
                amount: parseInt(amount),
                description
            });
            setAmount(0);
            setDescription("");
        } else {
            alert("Please make sure you have entered non zero amount and some description!")
        }
    }

    const handleRemoveTransaction = (index) => {
        removeTransaction({index});
    }

    const getIncome = () => {
        let income = 0;
        for(let i=0; i<transactions.length; i++) {
            if(transactions[i].amount>0){
                income += transactions[i].amount;
            }
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0;
        for(let i=0; i<transactions.length; i++) {
            if(transactions[i].amount<0){
                expense += transactions[i].amount;
            }
        }
        return expense;
    }

    return (
        <div style={{display: "flex", justifyContent: "center", backgroundColor: "#f6f6f6", minHeight: "100vh"}}>
            <div style={{padding: "40px", width: "400px"}}>
                <h1 style={{textAlign: "center", marginBottom: 10}}>Expense Tracker App</h1>
                <h3 style={{textAlign: "center", margin: "5px 0px"}}>CURRENT BALANCE</h3>
                <h2 style={{textAlign: "center", marginTop: 5}}>${getIncome() + getExpense()}</h2>
                <div style={{display: "flex", padding: "30px 0px", justifyContent: "center", backgroundColor: "white"}}>
                    <div style={{width: 180, borderRight: "1px solid #c6c6c6"}}>
                        <h3 style={{textAlign: "center", marginBottom: 5}}>INCOME</h3>
                        <h3 style={{textAlign: "center", marginTop: 5, color: "green"}}>${getIncome()}</h3>
                    </div>
                    <div style={{width: 180}}>
                        <h3 style={{textAlign: "center", marginBottom: 5}}>EXPENSE</h3>
                        <h3 style={{textAlign: "center", marginTop: 5, color: "red"}}>${getExpense()}</h3>
                    </div>
                </div>
                <div>
                    <p style={{textAlign: "center", fontSize: 19, borderBottom: "1px solid #c6c6c6", margin: 14, paddingBottom: 7, fontWeight: "bold"}}>Transaction History</p>
                    {
                        transactions.map((transaction, index) => (
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between", backgroundColor: "white", padding: "4px 4px 4px 2px", marginBottom: 8, borderRight: `5px solid ${transaction.amount > 0 ? "green" : "red"}`}}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <span onClick={()=>handleRemoveTransaction(index)} style={{fontWeight: "bold", cursor: "pointer", padding: "0px 5px", color: "white", backgroundColor: "red"}}>X</span>
                                    <p style={{margin: 5}}>{transaction.description}</p>
                                </div>
                                <p style={{margin: 5}}>{transaction.amount} $</p>
                            </div>
                        ))
                    }
                </div>
                <form onSubmit={handleFormSubmit} style={{paddingTop: 5}}>
                    <p style={{textAlign: "center", fontSize: 19, borderBottom: "1px solid #c6c6c6", margin: 14, paddingBottom: 7, fontWeight: "bold"}}>Add New Transaction</p>
                    <label style={{fontWeight: "bold"}}>
                        Description
                    </label><br/>
                    <input
                        value={description}
                        placeholder="Description"
                        onChange={(e)=>setDescription(e.target.value)}
                        style={{height: 30, fontSize: 17, color: "#404040", borderRadius: 5, borderWidth: 1, margin: "5px 0px", width: "100%"}}
                        type="text"
                    />
                    <label style={{fontWeight: "bold"}}>
                        Transaction Amount
                    </label><br/>
                    <input
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        style={{height: 30, fontSize: 17, color: "#404040", borderRadius: 5, borderWidth: 1, marginTop: 5, width: "100%"}} 
                        type="number"
                    />
                    <input style={{backgroundColor: "#3b5998", color: "white", cursor: "pointer", borderRadius: 5, borderWidth: 1, margin: "25px 0px", padding: 10, fontSize: 17, fontWeight: "bold", width: "100%"}} value="Add Transaction" type="submit" />
                </form>
            </div>
        </div>
    )
}
