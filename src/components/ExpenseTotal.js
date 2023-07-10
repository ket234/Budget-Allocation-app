import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ExpenseTotal = () => {
    const { expenses , currency , budget , backgroundColor} = useContext(AppContext);
    const totalExpenses = expenses.reduce((total , item) => {
        return (total += item.cost);
    }, 0);
    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

    if(totalExpenses >budget){
        alert('You cannot reduce the budget value lower than the spending.');
    }
    // if (totalExpenses > budget) {
    //     toast.error('You cannot reduce the budget value lower than the spending.', {
    //       autoClose: 5000, // Toast will automatically close after 5 seconds
    //     });
    //   }
    
   
    return (
        <div className={`box-shadow alert ${alertType}`} style={{backgroundColor}}>
            <span className='top-box'><h6>Spent so far : {currency}{totalExpenses}</h6></span>
          
        </div>
    );
};
export default ExpenseTotal;
