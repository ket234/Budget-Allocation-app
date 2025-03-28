import React, { createContext, useReducer,useState } from 'react';


// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
   
    let budget = 0;
    switch (action.type) {
        case 'SET_BUDGET':
            action.type ="DONE";
            state.budget = action.payload;
            return {
                ...state,
              
                   };
        // case 'ADD_EXPENSE':
        //     let total_budget = 0;
        //    console.log("adding Expense to:", action.payload);
        //     total_budget = state.expenses.reduce(
        //         (previousExp, currentExp) => {
        //             return previousExp + currentExp.cost
        //         },0
        //     );
        //     total_budget = total_budget + action.payload.cost;
        //     action.type = "DONE";
        //     console.log("total_budget:", total_budget);
           
        //     if(total_budget <= state.budget) {
        //         total_budget = 0;
        //         state.expenses.map((currentExp)=> {
        //             if(currentExp.name === action.payload.name) {
        //                 currentExp.cost = action.payload.cost + currentExp.cost;
        //             }
        //             return currentExp
        //         });
        //         return {
        //             ...state,
        //         };
        //     } else {
        //         alert("Cannot increase the allocation! Out of funds");
        //         return {
        //             ...state
        //         }
        //     }
        case 'ADD_EXPENSE':
            console.log("Adding expense to:", action.payload);

         let total_budget = state.expenses.reduce(

                (previousExp, currentExp)   =>  previousExp + currentExp.cost,
                0 
            ) + action.payload.cost;
            console.log("total budget after adding:", total_budget);
            if(total_budget <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp)=> 
                currentExp.name === action.payload.name ? {...currentExp , cost: currentExp.cost + action.payload.cost}
                : currentExp
            );
                return {
                    ...state,
                    expenses : updatedExpenses,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return  state;
                
            }





            case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };

            // case 'DELETE_EXPENSE':
            // action.type = "DONE";
            // console.log("Deleting expense:", action.payload);

            // state.expenses.map((currentExp)=> {
            //     if (currentExp.name === action.payload) {
            //         budget = state.budget + currentExp.cost
            //         currentExp.cost =  0;
            //     }
            //     return currentExp
            // })
            // action.type = "DONE";
            // return {
            //     ...state,
            //     budget
            // };
            case 'DELETE_EXPENSE':
                console.log("deleting expenses:", action.payload);
            
                const updatedExpenses = state.expenses.map(exp =>
                    exp.name === action.payload ? { ...exp, cost: 0 } : exp
                );
               
                console.log("updated expenses:", updatedExpenses);
                const totalExpensesAfterDeletion = updatedExpenses.reduce((total, item) => total + item.cost, 0);
                const newRemaining = state.budget - totalExpensesAfterDeletion;
                console.log("Budget before:", state.budget);
                console.log("Total expenses before deletion:", state.expenses.reduce((total, item) => total + item.cost, 0));
                console.log("Total expenses after deletion:", totalExpensesAfterDeletion);
                console.log("Updated expenses:", updatedExpenses);
                console.log("Remaining after deletion:", newRemaining);
            
               return {
                    ...state,
                    expenses: updatedExpenses, // ✅ State updates correctly
                    remaining: newRemaining
                };

            
        case 'CHG_Currency':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }
       

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
export const initialState = {
    budget:2000,
    expenses: [
      
        { id: "Marketing", name: 'Marketing', cost: 0 },
        { id: "Finance", name: 'Finance', cost: 0 },
        { id: "Sales", name: 'Sales', cost: 0 },
        { id: "HR", name: 'HR', cost: 0 },
        { id: "IT", name: 'IT', cost: 0 },
        
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {

     
    const [alertType, setAlertType] = useState('alert-success');
    const backgroundColor = alertType === 'alert-success' ? 'rgb(239, 235, 231)' : '';
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }
    

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                remaining: remaining,
                backgroundColor,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
