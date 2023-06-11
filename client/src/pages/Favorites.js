import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import FavoritesList from "../components/FavoritesList";

import store from '../store';


const Favorites = () => {
    const { data } = useLoaderData();

    return ( 
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>} >
            <Await resolve={data}>
                {
                    (loadedData) => <FavoritesList data={loadedData}/>
                }
            </Await>
        </Suspense>
    )
}


const loadFavs = async () => {
    const token = store.getState().auth.token;
    const response = await fetch('http://localhost:9000/papers/', {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    
    if (response.status === 422) {
        return await response.json();
    }
    
    if (!response.ok) {
        throw json(response);
    }

    const data = await response.json();
    
    return data;
}

export const loader = () => {
    return defer({
        data: loadFavs()
    })
}

export default Favorites
