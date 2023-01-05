import { useRef, useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import anime from 'animejs'
import { setBackground, getFromLocal } from '../../functions/functions'
import SideNavbar from '../../components/sideNavbar'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

export default function Account() {
    const navigate = useNavigate();
    const option1 = useRef<any>(null)
    const option2 = useRef<any>(null)
    const option3 = useRef<any>(null)
    const [isModalOpen, setIModalOpen] = useState(false)

    
    useEffect(() => {
        setBackground(JSON.parse(getFromLocal('backgroundId')) || 0)

        option1.current = anime({
            targets:'#cards > .account-option-svg path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 300,
            direction: 'initial',
            autoplay: false,
            
        })

        option2.current = anime({
            targets:'#notes > .account-option-svg path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 300,
            autoplay: false,
            
        })

        option3.current = anime({
            targets:'#exams > .account-option-svg path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 300,
            autoplay: false,
        })


        
    }, [])
    
    useEffect(() => {
        
        document.querySelectorAll('.account-option').forEach((opt) => {
            opt.classList.remove('account-option-active')
        })

        if(window.location.pathname.slice(9)  === 'cards' ) {
            option1.current.restart();

            option2.current.seek(0);
            option3.current.seek(0);

            document.getElementById('cards')?.classList.add('account-option-active')

        }else if(window.location.pathname.slice(9)  === 'notes'){
            option2.current.restart();

            option1.current.seek(0);
            option3.current.seek(0);

            document.getElementById('notes')?.classList.add('account-option-active')

        }else if(window.location.pathname.slice(9) === 'exams'){
            option3.current.restart();
        
            option1.current.seek(0);
            option2.current.seek(0);

            document.getElementById('exams')?.classList.add('account-option-active')

        }

    }, [window.location.pathname])

   return(
    <div className="account" id='account'>
        <SideNavbar />

        <AnimatePresence >
       {isModalOpen && 
           <div onClick={(e) => {
            setIModalOpen(false)
                // if(!(e.target as HTMLElement).classList.contains('not-close')) {
                //     setIModalOpen(false)
                // }
           }} className="extended-navbar-wrapper">
                <motion.div
            animate={{
                translateY: '0%'
            }}
            initial={{
                translateY: '-100%'
            }}
            exit={{
                translateY: '-100%'
            }}
            className="extended-navbar not-close">
                <div className='extended-wrapper not-close'>
                    <div onClick={() => navigate('cards')} className="extended-navbar-item category-switch not-close">Cards</div>
                    <div onClick={() => navigate('notes')} className="extended-navbar-item category-switch not-close">Notes</div>
                    <div onClick={() => navigate('exams')} className="extended-navbar-item category-switch not-close">Exam</div>
                </div>

                <div onClick={() => navigate('stats')}  className="extended-navbar-item not-close">Stats</div>
                <div onClick={() => navigate('/settings')}  className="extended-navbar-item not-close">Settings</div>


                </motion.div>
           </div>
       }
       </AnimatePresence>

        <div className="hamburger-wrapper" onClick={() => setIModalOpen(true)}>
            <div className="hamburger">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </div>
        
        <header className="account-header">
           <span ref={option1} onClick={(e) => {navigate((e.target as HTMLSpanElement).id)}} 
            className="account-option" id='cards'>
                Cards  
                <svg className='account-option-svg' viewBox="0 0 98 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.7207 14C47.8597 6.3704 25.943 12.5858 38.3891 8.76751C50.9596 4.91106 119.584 5.40032 87.5753 4.32741C55.5665 3.2545 -33.7757 6.90335 15.5402 2.96934C54.993 -0.177872 85.0136 1.43129 92.3955 1.27234" stroke="#D09683" strokeWidth="2"/>
                </svg>

            </span> / 
           <span ref={option2} onClick={(e) => {navigate((e.target as HTMLSpanElement).id)}} 
           className="account-option" id='notes'>
            Notes
            <svg className='account-option-svg' viewBox="0 0 98 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.7207 14C47.8597 6.3704 25.943 12.5858 38.3891 8.76751C50.9596 4.91106 119.584 5.40032 87.5753 4.32741C55.5665 3.2545 -33.7757 6.90335 15.5402 2.96934C54.993 -0.177872 85.0136 1.43129 92.3955 1.27234" stroke="#D09683" strokeWidth="2"/>
            </svg>
            
            </span> / 
           <span ref={option3} onClick={(e) => {navigate((e.target as HTMLSpanElement).id)}} 
           className="account-option" id='exams'>
            Exams
            <svg className='account-option-svg' viewBox="0 0 98 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.7207 14C47.8597 6.3704 25.943 12.5858 38.3891 8.76751C50.9596 4.91106 119.584 5.40032 87.5753 4.32741C55.5665 3.2545 -33.7757 6.90335 15.5402 2.96934C54.993 -0.177872 85.0136 1.43129 92.3955 1.27234" stroke="#D09683" strokeWidth="2"/>
                </svg>
            </span>
        </header>

        <Outlet />
    </div>
   )
}
