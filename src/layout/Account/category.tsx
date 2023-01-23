import { useParams } from 'react-router'
import { useState, useEffect } from 'react';

import Cards from './cards';
import Notes from './notes';
import Exams from './exams';

export default function Category() {
   const {category, id} = useParams();
   const [currentCategory, setCurrentCategory] = useState(<Cards />)
    
    useEffect(() => {
        if(category === 'notes') {
            setCurrentCategory(<Notes />)
    
        }else if(category === 'exams') {
            setCurrentCategory(<Exams />)
    
        }else if(category === 'cards') {
            setCurrentCategory(<Cards />)

        }
    }, [])
    

   return currentCategory;
}