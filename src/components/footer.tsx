import Logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom'

export default function Footer() {

   return(
    <footer className="footer">
         <div  className="brand">
            <img src={Logo} alt="logo" className='logo' />
        </div>

        <ul className="footer-items">
            <Link to={'/faq'}>
                <li className="footer-item">FAQ</li>
            </Link>
            <Link to={'/terms'}>
                <li className="footer-item">Terms</li>
            </Link>
        </ul>

        <p id="copyright">©All rights reserved.</p>
    </footer>
   )
}