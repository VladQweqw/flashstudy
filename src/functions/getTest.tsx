import {useState, useEffect, useCallback} from "react";
import { decodeAndRetrieve } from "./functions";

export const ENDPOINT = 'http://trphost.go.ro:8081/api/';
const token = decodeAndRetrieve('token');
export type MethodsType = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const useGetAPI= <T,>(
  url: string,
  headers: {
    authorization: string
  } = {
    authorization: `Bearer ${token}`
  },
  method: MethodsType = 'GET'
): {
    data: T | null,
    loading: boolean,
    error: string | null,

} => {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchData = async () => {

                try {
                  setLoading(true); 
                  
                  const response = await fetch(ENDPOINT + url, {
                      method,
                      headers,
                  });
                  const json = await response.json();
                  
                  setData(json);
                                    
                } catch (error: any) {
                  setError(error.message);
                }
                finally {
                  setLoading(false); 
                }
            }
            
        fetchData();      
    }, [])
    

  return { data, loading, error };
};