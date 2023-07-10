import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../custom-style.css'

const AllocationForm = (props) => {
    const { dispatch,remaining,currency  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {

        if(cost === "" || isNaN(cost) || Number(cost)<=0){
            alert("Please enter valid number");
            setCost("");
            return;
        }    
        else if(cost > remaining) {
                alert("The value cannot exceed remaining funds  £"+remaining);
                setCost("");
                return;
            }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (
        <div>
            <div className='row'>
            <h2>Change Allocation</h2>
            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                
                <div className=" input-group-prepend">
                <label className="box-shadow input-group-text" htmlFor="inputGroupSelect01" style={{marginRight:"6px",}}>Department</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                <option defaultValue>Choose...</option>
                <option value="Marketing" name="marketing"> Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finance" name="finance">Finance</option>
                <option value="HR" name="hr">HR</option>
                <option value="IT" name="it">IT</option>
                {/* <option value="Admin" name="admin">Admin</option> */}
                  </select>

                
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="box-shadow input-group-text mr-5" htmlFor="inputGroupSelect02" style={{marginRight:"6px",}}>Allocation</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
                  </select>
                   
                <p style={{marginLeft: '1rem'}}>{currency}</p>
                    <input
                        required='required'
                        type='text'
                        id='cost'
                        value={cost}
                        style={{ marginLeft:'4px', size: 10}}
                        onChange={(event) => setCost(event.target.value)}>
                        </input>

                    <button className="save-button" onClick={submitEvent} style={{ marginLeft: '10px' }}>
                        Save
                    </button>
                </div>
                </div>

        </div>
    );
};

export default AllocationForm;
