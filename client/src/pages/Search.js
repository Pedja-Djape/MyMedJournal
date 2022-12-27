import { useState } from "react";

import SearchBar from "../components/SearchTools/SearchBar";
import classes from './Search.module.css';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const searchHandler = (enteredValue) => {
        setSearchQuery(enteredValue);
    }

    return (
        <div className={classes.container}>
            {/* <div className={classes.pageTitle}>
                <h1>Search</h1>
            </div>
            <div className={classes.searchBar}>
                <div>
                    <SearchBar onSetQuery={searchHandler}/>
                </div>
            </div> */}
            <div className={classes.pageTitle}>
                <h1>Search for medical journals!</h1>
            </div>
            <div className={classes['flex-container']}>
                <div className={classes['search-bar']}>
                    <SearchBar onSetQuery={searchHandler} />
                </div>
                <div className={classes.e1}></div>
                <div className={classes.e1}></div>
            </div>
        </div>
    
    );
};
  
export default Search;