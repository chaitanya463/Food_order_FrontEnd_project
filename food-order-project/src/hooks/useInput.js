import {useState} from 'react';

const useInput = (validityFunc) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const inputValid = validityFunc(enteredValue);
    const hasError = !inputValid && isTouched;

    const userInputHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const inputTouchHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return ( {
        value: enteredValue,
        isValid: inputValid,
        inputHandler: userInputHandler,
        touchHandler: inputTouchHandler,
        reset,
        hasError
    });

}

export default useInput;