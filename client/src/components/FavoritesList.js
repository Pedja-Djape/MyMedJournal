import React from 'react'
import Card from './UI/Card'

const FavoritesList = ({favs}) => {
    
    const buttonInfo = {
        method: "DELETE",
        title: "Remove from favorites",
    }

    return (
        <>
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