import { useNavigate, useLocation, useParams } from 'react-router'
import Logo from '../assets/images/logo.svg'

export default function SideNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, category } = useParams();
    
   return(
    <>
        <div className="account-logo-wrapper" onClick={() => navigate('/account')}>
            <img src={Logo} alt="logo" className='logo' />
        </div>
    
        <div className="side-navbar">
          
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
     
        </div>

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