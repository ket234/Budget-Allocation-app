import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, dispatch,currency } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [inputBudget, setInputBudget] = useState(budget);

  const handleEditClick = () => {
    setIsEditing(true);
    
  };
 
  const handleSaveClick = () => {
    if (inputBudget>20000){
      alert('Cannot exceed value more than 20000')
    }else{dispatch({
      type: 'SET_BUDGET',
      payload: inputBudget,
    });
    setIsEditing(false);}
     
  };

  const handleInputChange = (event) => {
    setInputBudget(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.keyCode === 38) {
      // Up arrow
      setInputBudget((prevBudget) => parseInt(prevBudget) + 10);
    } else if (event.keyCode === 40) {
      // Down arrow
      setInputBudget((prevBudget) => parseInt(prevBudget) - 10);
    }
  };


  return (
    <div 
    className="alert alert-secondary p-3 d-flex align-items-center justify-content-between"
    style={{backgroundColor: 'rgb(239 235 231)', height: '60px', width:'100%',borderRadius:'8px', boxShadow:'1px 2px #b76734a3'}}
    >
      {isEditing ? (
        <>
          <input
            required
            type="number"
            step ="10"
            className="form-control mr-3"
            id="name"
            value={inputBudget}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn"
            style={{ marginRight: '5px' }}
            onClick={handleEditClick}
          >
            {'<'}
          </button>
          <span className='m-1'><h6>Budget : {currency}{budget}</h6></span>
          <button
            type="button"
            className="btn"
            onClick={handleEditClick}
          >
            {'>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;