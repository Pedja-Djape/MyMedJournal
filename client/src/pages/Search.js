import { useEffect, useState } from "react";
import SearchBar from "../components/SearchTools/SearchBar";
import classes from './Search.module.css';
import Card from "../components/UI/Card";
import Modal from "../components/UI/Modal";
import ArticlePopup from "../components/ArticlePopup/ArticlePopup";
import getBackendHostname from "../util/host";
import { json } from "react-router-dom";

const ARTICLES_PER_PAGE = 6;

const Search = () => {
    const [articlesData, setArticlesData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState(null);
    const [pagesInfo, setPagesInfo] = useState({
        currentPage: 0,
        furthestPage: -1
    });

    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        async function getArticles() {
            if (!searchTerm || searchTerm.trim().length === 0) {
                return;
            }
            const response = await searchForArticles(searchTerm, 0, ARTICLES_PER_PAGE * 3);
            if (!response.ok) {
                throw json(response);
            }
            const data = await response.json();
            setArticlesData(data.data);
            setPagesInfo((pagesInfo) => ({
                ...pagesInfo,
                furthestPage: 2
            }))
        }
        getArticles();

    }, [searchTerm]);

    const cardClickHandler = (title,abstract,id) => {
        setCardInfo({
            'title': title,
            'abstract': abstract,
            'id': id
        })
        setIsModalOpen(true);
    }

    const paginationHandler = async (direction) => {
        if (direction === "next") {
            if (pagesInfo.currentPage >= pagesInfo.furthestPage && pagesInfo.furthestPage !== -1) {
                const res = await searchForArticles(
                    searchTerm, 
                    pagesInfo.currentPage * ARTICLES_PER_PAGE,
                    2 * ARTICLES_PER_PAGE
                );
                const data = await res.json()
                setArticlesData(oldData => [...oldData, ...data.data])
                setPagesInfo(
                    pagesInfo => ({
                        currentPage: pagesInfo.currentPage + 1,
                        furthestPage: pagesInfo.furthestPage + 2
                    })
                )
                return;
            }
            setPagesInfo(pagesInfo => ({
                ...pagesInfo,
                currentPage: pagesInfo.currentPage + 1
            }))
        }
        if (direction === "back") {
            setPagesInfo(pagesInfo => ({
                ...pagesInfo,
                currentPage: pagesInfo.currentPage - 1
            }))
        }
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

                    <SearchBar onSetQuery={(t) => setSearchTerm(t)} />
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
                        articlesData.slice(
                            pagesInfo.currentPage * ARTICLES_PER_PAGE, 
                            (pagesInfo.currentPage * ARTICLES_PER_PAGE) + 6
                        ).map( (article) => 
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
                            pagesInfo.currentPage > 0 && (
                                <button onClick={() => paginationHandler("back")}
                                className="p-4 m-2 color white bg-[#f6c666] rounded-[4px] w-[100px]"    
                            >
                                    Back.
                                </button>
                            )
                        }
                    <button onClick={() => paginationHandler("next")} 
                        className="p-4 m-2 color white bg-[#f6c666] rounded-[4px] ">
                            Next page.
                    </button>
                    
            </div>
                )
            }
            
            
            
        </div>
    
    );
};

const searchForArticles = async (term, startIndex, numArticles) => {
    return await fetch(getBackendHostname() + "/papers/search?" + new URLSearchParams({
        db: "pubmed",
        term,
        retstart: startIndex,
        retmax: numArticles
    }));
}

  
export default Search;
