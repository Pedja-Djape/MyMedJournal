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
            <form onSubmit={formSubmitHandler} className="w-full bg-[rgba(255,255,255,0.2)] flex items-center rounded-3xl px-4 py-2 backdrop-blur-sm backdrop-saturate-200">
                <input 
                    type="text" 
                    placeholder='Search Query.' 
                    onChange={inputChangeHandler}
                    className=' bg-transparent flex-1 border-0 outline-none px-[10px] py-[20px] text-lg text-[cac7ff]'
                />

                <button type="submit" className='border-0 rounded-[50%] w-[60px] h-[60px] bg-[#58629b] cursor-pointer flex items-center justify-center'>
                    <img src={searchIcon} className='w-[25px]'/>
                    
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
