import { QueryCache } from 'react-query'

export function getCachedData(query: string) {
    const queryCache = new QueryCache({
        onError: error => {
            return null;
        },
        
        onSuccess: data => data
            
        })

    return queryCache.find(['slide',43])
}

