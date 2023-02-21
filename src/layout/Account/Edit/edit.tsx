import { useParams } from 'react-router'
import { useState, useEffect } from 'react';

import { CardsEdit, NotesEdit, ExamsEdit } from './editCategories';

export default function Edit() {
   const {category} = useParams();
   const [currentCategory, setCurrentCategory] = useState(<CardsEdit />)
     

    useEffect(() => {
        if(category === 'notes') {
            setCurrentCategory(<NotesEdit />)
    
        }else if(category === 'exams') {
            setCurrentCategory(<ExamsEdit />)
    
        }else if(category === 'cards') {
            setCurrentCategory(<CardsEdit />)

        }
    }, [category])
    

   return currentCategory;
}