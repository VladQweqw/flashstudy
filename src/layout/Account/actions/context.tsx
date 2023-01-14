import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { ENDPOINT } from '../../../functions/API';
import useFetch from '../../../functions/API';
import Loader from '../../../components/loader';
import { togglePopup } from '../../../functions/functions';

export default function Context(coords: {x: number, y: number, id: number | null}) {
   const navigate = useNavigate();

    const {data, loading, reFetch } = useFetch<any>();

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
      
      reFetch({
        method: 'DELETE',
        url: ENDPOINT + a + `?id=${coords.id}`,
        headers: {},
        data: null,
      })
      
      
    }   

    if(data?.message === 'Group Deleted') {
        window.location.reload()        
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
        {loading ? <Loader /> : 
        <>
        <div className="context-option" onClick={() => navigate(`edit?id=${coords.id}`)}>Edit</div>
        <div className="context-option" onClick={() => {
            removeGroup()
        }}>Remove</div>
        </>
    }
    </motion.div>
   )
}