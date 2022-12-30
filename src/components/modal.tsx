import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

export default function Modal(props: any) {
    const navigate = useNavigate();

   return(
    <motion.div 
    initial={{
     opacity: 0
    }}
     animate={{
        opacity:1
     }}
    onClick={(e) => {
        if((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
           navigate(-1)
        }
     
    }} className="modal-wrapper">
        {props.children}
    </motion.div>
   )
}