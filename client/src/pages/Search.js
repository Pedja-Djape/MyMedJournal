import { useState, useEffect } from "react";
import SearchBar from "../components/SearchTools/SearchBar";
import classes from './Search.module.css';
import Card from "../components/UI/Card";


const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [articlesData, setArticlesData] = useState([]);

    

    const searchHandler = (enteredValue) => {
        // replace all whitespace with space
        setSearchQuery(enteredValue);
        
        const path = "/papers/search?" + new URLSearchParams({
            db: "pubmed",
            term: enteredValue
        });
        fetch(path)
            .then( (res) => res.json())
            .then( (data) => {
                if (data.code === 200){
                    setArticlesData(data.data);
                }
            }); 
    } 

    const cardColor = 'white'

    return (
        <div className={classes.container}>
            <div className={classes.pageTitle}>
                <h1>Search for medical articles!</h1>
            </div>
            <div className={classes['flex-container']}>
                <div className={classes['search-bar']}>
                    <SearchBar onSetQuery={searchHandler} />
                </div>
            </div>
            <div className={classes['cards-container']}>
                {
                    articlesData.length > 0 ?
                        articlesData.map( (article) => 
                        <div key={article.id} className={classes.card}>
                            <Card 
                                title={article.title}
                                body={article.abstract}
                                color={cardColor}
                            />
                        </div>
                        ) :
                        null
                }
            </div>
            
            
        </div>
    
    );
};
  
export default Search;
