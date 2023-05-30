import { useState } from "react";
import SearchBar from "../components/SearchTools/SearchBar";
import classes from './Search.module.css';
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import ArticlePopup from "../components/ArticlePopup/ArticlePopup";



const Search = () => {
    const [articlesData, setArticlesData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState({});


    const searchHandler = async (enteredValue) => {
        const path = "/papers/search?" + new URLSearchParams({
            db: "pubmed",
            term: enteredValue
        });
        const response = await fetch(path);
        if (!response.ok) {
            console.log("ERROR FETCHING DATA");
        }
        const data = await response.json();
        setArticlesData(data.data);
    } 

    const cardClickHandler = (title,abstract,id) => {
        setCardInfo({
            'title': title,
            'abstract': abstract,
            'id': id
        })
        setIsModalOpen(true);
    }

    const cardColor = 'white'

   

    return (
        <div className={classes.container}>
            <div className={classes.pageTitle}>
                <h1>Search for medical articles!</h1>
            </div>
            {
                isModalOpen ?
                    <Modal open={isModalOpen} onModalClose={() => setIsModalOpen(false)}>
                        <ArticlePopup 
                            title={cardInfo.title} 
                            body={`${cardInfo.abstract}`}
                            color='#5ca1fa'
                            onClose={() => setIsModalOpen(false)}
                            id={cardInfo.id}
                        />
                    </Modal> :
                null
            }

            <div className={classes['flex-container']}>
                <div className={classes['search-bar']}>
                    <SearchBar onSetQuery={searchHandler} />
                </div>
            </div>
            <div className={classes['cards-container']}>
                {
                    articlesData.length > 0 ?
                        articlesData.map( (article) => 
                            <div key={article.id} className={classes.card} style={{cursor: 'pointer'}}>
                                <Card 
                                    title={article.title}
                                    body={article.abstract}
                                    color={cardColor}
                                    id={article.id}
                                    onCardClick={cardClickHandler}
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
