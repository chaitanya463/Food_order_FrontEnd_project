import styles from './Checkout.module.css';
import {useRef} from 'react';

const Checkout = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const postal = postalInputRef.current.value;
        const city = cityInputRef.current.value;
        
    }
    return (
        <form onSubmit={confirmHandler}> 
            <div className={styles.control}>
                <label htmlFor="name">Your Name </label>
                <input type="text" id="name" ref={nameInputRef}></input>
            </div>
            <div className={styles.control}>
                <label htmlFor="street">Street </label>
                <input type="text" id="street" ref={streetInputRef}></input>
            </div>
            <div className={styles.control}>
                <label htmlFor="postal">Postal Code </label>
                <input type="text" id="postal" ref={postalInputRef}></input>
            </div>

            <div className={styles.control}>
                <label htmlFor="city">City </label>
                <input type="text" id="city" ref={cityInputRef}></input>
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
    
};

export default Checkout;