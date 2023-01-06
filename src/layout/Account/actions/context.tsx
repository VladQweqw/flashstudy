import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

export default function Context(data: {x: number, y: number, id: number | null}) {
   const navigate = useNavigate();

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
        top: `${data.y}px`,
        left: `${data.x}px`,
    }} className="context-menu">
        
        <div className="context-option" onClick={() => navigate(`edit?id=${data.id}`)}>Edit</div>
        <div className="context-option">Remove</div>

    </motion.div>
   )
}