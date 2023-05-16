import { useNavigate, useLocation, useParams } from 'react-router'
import Logo from '../assets/images/logo.svg'
import { motion } from 'framer-motion'

export default function SideNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, category } = useParams();
    
   return(
    <>
        <motion.div
        animate={{
            scale: 1,
        }}
        initial={{
           scale: 0
        }}
        className="account-logo-wrapper" onClick={() => navigate('/account')}>
            <svg className='logo' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="208" height="291" viewBox="0 0 208 291">
  <image x="13" y="14" width="186" height="269" xlinkHref="data:img/png;base64,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"/>
            </svg>

        </motion.div>
    
        <motion.div 
        animate={{
            translateX: '0%',
            transition: {
                duration: .4
            }
        }}
        initial={{
            translateX: '-100%'
        }}
        className="side-navbar">
          
            {category != undefined && 
            <NavbarItem navigate={navigate} id={'stats'} redirect={{
                path: `/account/cards/${id}/stats`,
                state: {},
            }}>
                <i className="fa-solid fa-chart-simple"></i>     
            </NavbarItem>
            }
            
            <NavbarItem navigate={navigate} id={'settings'} redirect={{
                path: '/settings',
                state: {state: {background: location}}
            }}>
                <i className="fa-solid fa-gear"></i>
            </NavbarItem>
     
        </motion.div>

    </>
   )
}

function NavbarItem(props: {
    children: any,
    id: string,
    redirect: {
        path: string,
        state: any
    },
    navigate: (url: string, state: any) => void
}) {
    const {id, redirect, navigate, children} = props;

    return <span onClick={() => {
        navigate(redirect.path, redirect.state)
    }} className={`${id}-icon side-navbar-item`} id={id}>
            {children}
    </span>
}