import {useState, useEffect} from 'react'
import axios from 'axios'
import { decodeAndRetrieve, togglePopup } from './functions';

export const ENDPOINT = 'http://trphost.go.ro:8081/api/';
const token = decodeAndRetrieve('token');


export default function useFetch<Type>() : {
    data: Type | undefined,
    loading: boolean,
    error: string | null;
    reFetch: any,
} {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<Type | undefined>(undefined);

            
    function reFetch(
        options: {
            method: 'GET' | 'POST' | 'PUT',
            data: any,
            url: string,
            headers: {}
        }
        ) {
                    
        options.headers = {
            'Authorization': `Bearer ${token}`
        }
        
        setLoading(true)
        axios.request(options)
        .then((response) => {            
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
            togglePopup('Something went wrong', 'ERROR')
        })
        .finally(() => {
            setLoading(false)
        }); 
    }
    
    return {data, loading, error, reFetch}
}
