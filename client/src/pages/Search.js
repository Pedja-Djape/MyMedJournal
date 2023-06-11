import { useState } from "react";
import SearchBar from "../components/SearchTools/SearchBar";
import classes from './Search.module.css';
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import ArticlePopup from "../components/ArticlePopup/ArticlePopup";


const Search = () => {
    const [articlesData, setArticlesData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const [retStart, setRetStart] = useState(0);

    const [isLoading, setIsLoading] = useState(false)


    const searchHandler = async (enteredValue) => {
        setIsLoading(true);
        getArticleData(enteredValue);
        setIsLoading(false);
    } 

    const getArticleData = async (queryTerm) => {
        if (!queryTerm || queryTerm.trim().length === 0) {
            return;
        }
        const path = "http://localhost:9000/papers/search?" + new URLSearchParams({
            db: "pubmed",
            term: queryTerm,
            retstart: retStart,
            retmax: 100
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
                    isLoading && (
                       <h1 className="text-center text-white">Loading ...</h1>
                    )
                }
                {
                    !isLoading && articlesData && articlesData.length > 0 ?
                        articlesData.slice(retStart, retStart + 6).map( (article) => 
                            <div key={article.id} className={classes.card}>
                                <Card 
                                    title={article.title}
                                    body={article.abstract}
                                    id={article.id}
                                    onCardClick={cardClickHandler}
                                    buttonInfo={{
                                        method: "PUT",
                                        title: "Add to favorites."
                                    }}
                                />
                            </div>
                        ) :
                        null
                }
            </div>
            {
                articlesData && (
                    <div className="flex justify-center gap 1rem">
                        {
                            retStart > 0 && (
                                <button onClick={() => {
                                    setRetStart(value => value - 6) 
                                }}
                                className="p-4 m-2 color white bg-[#f6c666] rounded-[4px] w-[100px]"    
                            >
                                    Back.
                                </button>
                            )
                        }
                    <button onClick={() => {
                            setRetStart(value => value + 6) 
                        }} 
                        className="p-4 m-2 color white bg-[#f6c666] rounded-[4px] ">
                            Next page.
                    </button>
                    
            </div>
                )
            }
            
            
            
        </div>
    
    );
};
  
export default Search;
