import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import FavoritesList from "../components/FavoritesList";

import getBackendHostname from "../util/host";
import { getRehydratedState } from '../store/util';


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
    const currentState = await getRehydratedState();
    const token = currentState.token;
    const response = await fetch(getBackendHostname() + '/papers/', {
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
