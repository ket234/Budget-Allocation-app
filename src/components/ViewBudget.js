import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
            <button type='button' class='btn btn-primary'
             style={{ marginRight: '5px' }}

             onClick={props.handleEditClick}>
                
			{'<'}
			</button>
			<span>Budget: £{props.budget}</span>
			<button type='button' class='btn btn-primary' onClick={props.handleEditClick}>
				{'>'}
			</button>
		</>
	);
};

export default ViewBudget;