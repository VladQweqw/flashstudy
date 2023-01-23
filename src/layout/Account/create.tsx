import { useParams } from 'react-router'
import { useState, useEffect } from 'react';

import CardsAdd from './actions/Cards/cardsAdd';
import NotesAdd from './actions/Notes/notesAdd';
import ExamsAdd from './actions/Exams/examsAdd';

export default function Create() {
   const {category} = useParams();
   const [currentCategory, setCurrentCategory] = useState(<CardsAdd />)

    useEffect(() => {
        if(category === 'notes') {
            setCurrentCategory(<NotesAdd />)
    
        }else if(category === 'exams') {
            setCurrentCategory(<ExamsAdd />)
            
        }else if(category === 'cards') {
            setCurrentCategory(<CardsAdd />)
        }
    }, [category])
    

   return currentCategory;
}