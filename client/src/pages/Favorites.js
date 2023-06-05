import { Suspense } from "react";
import { Await, defer, useLoaderData } from 'react-router-dom';
import FavoritesList from "../components/FavoritesList";

import store from '../store';


const Favorites = () => {
    const {favs} = useLoaderData();
    return ( 
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>} >
            <Await resolve={favs}>
                {(favs) => <FavoritesList favs={favs.data}/>}
            </Await>
        </Suspense>
    )
}


const loadFavs = async () => {
    const token = store.getState().auth.token;
    const auidsResponse = await fetch('http://localhost:9000/papers/', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    const auids = await auidsResponse.json();
    const url = 'http://localhost:9000/papers/search?' + new URLSearchParams({
        db: 'pubmed',
        articleIds: auids.favorites.toString()
    }).toString()
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await response.json();

    return data;
}

export const loader = () => {
    return defer({
        favs: loadFavs()
    })
}

export default Favorites
