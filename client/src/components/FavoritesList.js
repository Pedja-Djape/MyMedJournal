import React, { useState } from 'react';
import Card from './UI/Card'
import Modal from './UI/Modal';
import ArticlePopup from "../components/ArticlePopup/ArticlePopup";
import { Link } from 'react-router-dom';

const FavoritesList = ({data}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState({});

    const buttonInfo = {
        method: "DELETE",
        title: "Remove from favorites",
    }

    const cardClickHandler = (title,abstract,id) => {
            setCardInfo({
                'title': title,
                'abstract': abstract,
                'id': id
            })
            setIsModalOpen(true);
    }
    const favs = data.data
    return (
        <>
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
        <div className='flex flex-col items-center justify-center w-full'>
            <h1>Your favorite articles</h1>
            {
                data && data.errors && (
                    <ul className=" text-center text-red-600">
                        {Object.values(data.errors).map(err => (
                            <li key={err}>{err}</li>
                        )
                        )}
                    </ul>
                )
            }
            {
                favs && favs.length === 0 && (
                    <p className='pt-12 text-3xl text-white'>
                        Seems like you don't have any favorites right now. 
                        Head on to the <Link to='/search' className='underline text-[#f2c11d]'>search tool</Link> and
                        start reading!
                    </p>
                )
            }
            
            <div className='flex justify-center flex-wrap gap-2'>
                { favs  && favs.length > 0 && favs.map(fav => (
                    <div  key={fav.id} className='p-6'>
                        <Card 
                            title={fav.title}
                            body={fav.abstract}
                            id={fav.id}
                            buttonInfo={buttonInfo}
                            onCardClick={cardClickHandler}
                        />
                    </div>
                    
                    ))
                }
                
            </div>
        </div>
        
        </>
        
    )
}

export default FavoritesList