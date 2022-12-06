import React,{useState, useEffect} from 'react'
import axios from 'axios'

type METHOD = 'post' | 'get';
export const ENDPOINT = 'https://localhost:7021/';

export default function useFetch<Type>(url: string, method: METHOD, options: any = '') : {
    data: Type | undefined,
    loading: boolean,
    error: string | null;
    reFetch: any,
} {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<Type | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        
        axios[method]<Type>(ENDPOINT + url, options, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {            
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));
    }, [url])

    function reFetch() {
        setLoading(true);
        
        axios[method]<Type>(ENDPOINT + url, options, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {            
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));
    }
    
    return {data, loading, error, reFetch}
}


