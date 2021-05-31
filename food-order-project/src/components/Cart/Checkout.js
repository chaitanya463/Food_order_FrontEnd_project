import styles from './Checkout.module.css';
import useInput from '../../hooks/useInput';

const isEmpty = value => value.trim() !== '';

const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {

    const {
        value: name,
        isValid: enteredNameValid,
        inputHandler: onNameChangeHandler,
        touchHandler: onNameTouchHandler,
        reset: onNameReset,
        hasError: nameInputInvalid } = useInput(isEmpty);

    const {
        value: street,
        isValid: enteredStreetValid,
        inputHandler: onStreetChangeHandler,
        touchHandler: onStreetTouchHandler,
        reset: onStreetReset,
        hasError: streetInputInvalid } = useInput(isEmpty);

    const {
        value: postal,
        isValid: enteredPostalValid,
        inputHandler: onPostalChangeHandler,
        touchHandler: onPostalTouchHandler,
        reset: onPostalReset,
        hasError: postalInputInvalid } = useInput(isSixChars);


    const {
        value: city,
        isValid: enteredCityValid,
        inputHandler: onCityChangeHandler,
        touchHandler: onCityTouchHandler,
        reset: onCityReset,
        hasError: cityInputInvalid } = useInput(isEmpty);

    let isFormValid = false;

    if (enteredNameValid && enteredStreetValid && enteredCityValid && enteredPostalValid) {
        isFormValid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        props.onConfirmed({
            name,
            street,
            city,
            postal
        });
        onNameReset();
        onStreetReset();
        onPostalReset();
        onCityReset();
    }

    const nameControlClasses = ` ${styles.control} ${!nameInputInvalid ? '' : styles.invalid}`;
    const streetControlClasses = ` ${styles.control} ${!streetInputInvalid ? '' : styles.invalid}`;
    const postalControlClasses = ` ${styles.control} ${!postalInputInvalid ? '' : styles.invalid}`;
    const cityControlClasses = ` ${styles.control} ${!cityInputInvalid ? '' : styles.invalid}`;
    console.log(nameControlClasses);

    return (
        <form onSubmit={confirmHandler}> 
            <div className= {nameControlClasses}>
                <label htmlFor="name">Your Name </label>
                <input type="text" id="name" value={name} onChange={onNameChangeHandler} onBlur= {onNameTouchHandler} ></input>
                {nameInputInvalid && <p className= {styles["error-text"]}> Enter valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street </label>
                <input type="text" id="street" value={street} onChange={onStreetChangeHandler} onBlur={onStreetTouchHandler}></input>
                {streetInputInvalid && <p className={styles["error-text"]}>Enter valid street name</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code </label>
                <input type="text" id="postal" value={postal} onChange={onPostalChangeHandler} onBlur={onPostalTouchHandler}></input>
                {postalInputInvalid && <p className={styles["error-text"]}>Enter valid postal name</p>}
            </div>

            <div className={cityControlClasses}>
                <label htmlFor="city">City </label>
                <input type="text" id="city" value={city} onChange={onCityChangeHandler} onBlur={onCityTouchHandler}></input>
                {cityInputInvalid && <p className={styles["error-text"]}>Enter valid city name</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button disabled={!isFormValid} className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
    
};

export default Checkout;