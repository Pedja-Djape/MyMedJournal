import classes from './SearchBar.module.css';
import searchIcon from '../../images/search.png';

import { useState } from 'react';

const SearchBar = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const inputChangeHandler = event => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredValue(event.target.value);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        if (enteredValue.trim().length === 0) {
            setIsValid(false);
            return;
        }
        props.onSetQuery(enteredValue);
    }


    return (
        <div>
            <form onSubmit={formSubmitHandler} className={classes.searchBar}>
                <input 
                    type="text" 
                    placeholder='Search Query.' 
                    onChange={inputChangeHandler}
                />

                <button type="submit"><img src={searchIcon}/></button>
            </form>
        </div>
    );
}

export default SearchBar;
