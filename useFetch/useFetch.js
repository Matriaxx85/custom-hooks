import { useEffect, useState } from 'react';

const localCache = {};


export const useFetch = ( url ) => {

    const [estado, setEstado] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {
        getFetch();
    
    }, [url]);

    const setLoadingState = () => {
        setEstado({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async() => {

        if ( localCache[url] ){
            console.log('Usando caché');
            setEstado({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            })


            return
        }

        setLoadingState();

        const resp = await fetch( url );

        // sleep
        await new Promise( resolve => setTimeout(resolve, 1500) );

        if ( !resp.ok ){
            setEstado({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }

        const data = await resp.json();
        setEstado({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })

        // Manejo del caché
        localCache[url] = data;

    }
    

    return {
        data: estado.data,
        isLoading: estado.isLoading,
        hasError: estado.hasError
    }
}
