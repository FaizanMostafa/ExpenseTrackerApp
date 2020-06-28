import React from 'react';
import ExpenseApp from './Screens/ExpenseApp';
import {TransactionProvider} from './transactionsContext';

function App() {
  return (
    <TransactionProvider>
      <ExpenseApp />
    </TransactionProvider>
  );
}


export default App;