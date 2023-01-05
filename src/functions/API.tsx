import {useState, useEffect} from 'react'
import axios from 'axios'
import { decodeAndRetrieve } from './functions';

export const ENDPOINT = 'http://trphost.go.ro:8081/api/';
const token = decodeAndRetrieve('token');


export default function useFetch<Type>(url: string, method: 'POST' | 'GET' | 'PUT') : {
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
    
        axios.interceptors.request.use(
            config => {
                config.headers!.authorization = `Bearer ${token}`
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        
        axios.request({
            method,
            url: ENDPOINT + url,
        })
        .then((response) => {            
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));
        setLoading(false)
    }, [url])

    function reFetch() {
        setLoading(true);   
        
        axios.interceptors.request.use(
            config => {
                config.headers!.authorization = `Bearer ${token}`
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        
        axios.request({
            method,
            url: ENDPOINT + url,
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


