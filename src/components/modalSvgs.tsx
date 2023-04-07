import { motion } from "framer-motion"

export default function ModalSVGS() {

    const variantLeft = {
        animate: {
            scale: 1,
            transformOrigin:'bottom left',
            transition: {
                duration: .6,
            }
        },
        initial: {
            scale: 0
        }
    }
    
    const variantRight = {
        animate: {
            scale: 1,
            transformOrigin:'bottom right',
            transition: {
                duration: .5,
            }
        },
        initial: {
            scale: 0
        }
    }

   return(
    <>
    {/* LEFT SIDE */}
        <motion.svg 
        variants={variantLeft}
        animate={'animate'}
        initial={'initial'}
        width="149" height="199" className='modal-svg modal-svg-left' viewBox="0 0 149 199" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56.5 80.8903C18.9 65.01 7 28.4522 0 0V199H149C147.5 192.383 125.5 177.661 112.5 161.284C97.3851 142.243 103.5 100.741 56.5 80.8903Z" fill="#D09683"/>
        <path d="M33 100.798C2.71812 90.9829 5.63758 93.586 0 76V199H120C118.792 194.91 77.4698 194.739 67 184.617C54.8269 172.848 70.8523 113.068 33 100.798Z" fill="#915643" fillOpacity="0.58"/>
        </motion.svg>

        {/* RIGHT SIDE */}

        <motion.svg 
        variants={variantRight}
        animate={'animate'}
        initial={'initial'}
        width="116" height="155" className='modal-svg modal-svg-right' viewBox="0 0 116 155" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 63.5897C111.424 58.6833 110.55 22.1613 116 0V155H0C1.16779 149.846 20.6163 135.258 34.5 126.683C53 115.256 45 69.0545 80 63.5897Z" fill="#D09683"/>
        <path d="M90.3496 95.8235C113.818 88.0829 111.631 74.8687 116 61L116 155H23C23.9362 151.775 24.8859 151.983 33 144C42.4341 134.719 61.0142 105.499 90.3496 95.8235Z" fill="#915643" fillOpacity="0.58"/>
        </motion.svg>
    </>
   )
}