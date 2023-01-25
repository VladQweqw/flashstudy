import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Loader from '../../../components/loader';
import { togglePopup } from '../../../functions/functions';

export default function Context(coords: {x: number, y: number, id: number | null}) {
   const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

    function removeGroup() {
      let a;
    
      if(window.location.pathname.slice(9, 14) === 'cards') {
        a  = 'card/delete'
      }else if(window.location.pathname.slice(9, 14) === 'notes') {
        a = 'note/delete'
      }else if(window.location.pathname.slice(9, 14) === 'exams') {
        a = 'exam/delete'
      }else {
        a = 'group/delete'
      }
      
    }  

    return(
        <motion.div
    animate={{
        scale: 1,
        transition: {
            duration: .2,
            type: "spring"
        }
        
    }}
    initial={{
        scale: 0,
    }}
    style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
    }} className="context-menu">
        
      <div className="context-option" onClick={() => navigate(`edit`)}>Edit</div>
      {loading ? 
        <Loader /> : 
          <div className="context-option" onClick={() => {
              removeGroup()
          }}>Remove</div>
      }
       
    </motion.div>
   )
}