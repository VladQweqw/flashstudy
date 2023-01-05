import React,{} from 'react'
import { motion } from 'framer-motion'

export default function Context(coords: {x: number, y: number}) {

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
        
        <div className="context-option">Edit</div>
        <div className="context-option">Remove</div>

    </motion.div>
   )
}