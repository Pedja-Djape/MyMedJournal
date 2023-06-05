import React, { useState } from 'react';
import Card from './UI/Card'
import Modal from './UI/Modal';
import ArticlePopup from "../components/ArticlePopup/ArticlePopup";

const FavoritesList = ({favs}) => {
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
        <div className='flex flex-col items-center justify-center '>
            <h1>Your favorite articles</h1>
            <div className='flex justify-center flex-wrap gap-2'>
                { favs.map(fav => (
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