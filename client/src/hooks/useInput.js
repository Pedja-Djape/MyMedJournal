import { useState } from "react"

const useInput = (validateValue) => {
    // get and set entered value
    const [enteredValue, setEnteredValue] = useState('');
    // did step inside input
    const [isTouched, setIsTouched] = useState(false);
    // use provided function to validate value
    const valueIsValid = validateValue(enteredValue);

    // error only if value is not valid and user typed something
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = event => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }



}

export default useInput
