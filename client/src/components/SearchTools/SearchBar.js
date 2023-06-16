import searchIcon from '../../images/search.png';

import { useRef } from 'react';

const SearchBar = (props) => {

    const searchQuery = useRef(null);


    const formSubmitHandler = event => {
        event.preventDefault();
        if (!searchQuery.current.value || searchQuery.current.value.trim().length === 0) {
            return;
        }
        props.onSetQuery(searchQuery.current.value);
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler} className="w-full bg-[rgba(255,255,255,0.2)] flex items-center rounded-3xl px-4 py-2 backdrop-blur-sm ">
                <input 
                    type="text" 
                    placeholder='Search keywords.' 
                    ref={searchQuery}
                    className=' bg-transparent flex-1 border-0 outline-none px-[10px] py-[20px] text-lg text-white'
                />

                <button type="submit" className='border-0 rounded-[50%] w-[60px] h-[60px] bg-[#100e0e] cursor-pointer flex items-center justify-center'>
                    <img src={searchIcon} alt='search-icon' className='w-[25px]'/>
                    
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
