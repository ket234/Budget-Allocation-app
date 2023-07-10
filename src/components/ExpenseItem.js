import React, { useContext } from 'react';
import { TiDelete, TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { IconContext } from 'react-icons/lib';
import {AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { green } from '@mui/material/colors';
import { AppContext } from '../context/AppContext';
import {red} from '@mui/material/colors';
import '../custom-style.css';
const ExpenseItem = (props) => {
    const { dispatch , currency} = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch( {
            type: 'RED_EXPENSE',
            payload: expense
        })
    }

    return (
        <tr>
        <td>{props.name}</td>
        <td>{currency}{props.cost}</td>
        <td>
            <button onClick={event=> increaseAllocation(props.name)} className='minus-button'>
                <IconContext.Provider value={{ color: green[600] }}>
                     <AiFillPlusCircle size="2rem" />
                </IconContext.Provider> 
            </button></td>
        <td>
            <button onClick={(event) => decreaseAllocation(props.name)} className='minus-button'>
                 <IconContext.Provider value={{ color: red[600] }}>
                     
                     <AiFillMinusCircle size="2rem" />
                   
                 </IconContext.Provider>
            </button>
        </td>
        <td>
            <TiDelete size='1.5em' onClick={handleDeleteExpense}>
            </TiDelete>
        </td>
        </tr>
    );
};

export default ExpenseItem;
