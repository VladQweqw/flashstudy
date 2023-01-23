import { useParams } from 'react-router'
import { useState, useEffect } from 'react';

import CardsEdit from './actions/Cards/cardsEdit';
import NotesEdit from './actions/Notes/notesEdit';
import ExamEdit from './actions/Exams/examEdit';

export default function Edit() {
   const {category} = useParams();
   const [currentCategory, setCurrentCategory] = useState(<CardsEdit />)
    
    useEffect(() => {
        if(category === 'notes') {
            setCurrentCategory(<NotesEdit />)
    
        }else if(category === 'exams') {
            setCurrentCategory(<ExamEdit />)
    
        }else if(category === 'cards') {
            setCurrentCategory(<CardsEdit />)

        }
    }, [category])
    

   return currentCategory;
}