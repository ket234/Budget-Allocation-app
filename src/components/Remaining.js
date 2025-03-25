import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext'; 
import '../custom-style.css';
const Remaining = () => {
    const { expenses, budget ,currency,backgroundColor } = useContext(AppContext);
    
      
    const totalExpenses = expenses.reduce((total, item) => {
      return  total + item.cost;
    }, 0);
    const remaining = budget- totalExpenses; 
    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';
    return (
        <div className={`box-shadow alert ${alertType}`} style={{backgroundColor}}>
            <span className=' top-box'><h6>Remaining : {currency}{remaining}</h6></span>
        </div>
    );
};
export default Remaining;
