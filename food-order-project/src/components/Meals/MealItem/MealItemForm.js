import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useRef, useState} from 'react';

const MealItemForm = (props) => {

    const amountRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);
   
    const submitHandler = (event) => {
        event.preventDefault();

        console.log('inside the form submit handler');

        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        if (enteredAmount.trim().length === 0 ||
                enteredAmountNumber < 1 ||
                enteredAmountNumber > 5) {
                    setAmountIsValid(false);
                    return;
        }
        
        props.onAddToCart(enteredAmountNumber);
    };
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
                label="Amount" 
                ref= {amountRef} 
                input={{
                    id: props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}/>
            <button>Add</button>
            {!amountIsValid && <p> Please enter valid amount from 1 to 5.</p>}
        </form>
    );
}

export default MealItemForm;