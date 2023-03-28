import { useNavigate } from 'react-router'
import { ColorVariants } from '../functions/functions';

export default function NoContent() {
   const navigate = useNavigate();
    let i = 0;

   return(
    <div className="no-content-wrapper section">
        <div className="no-content">
            <h1 className="no-content-title">An error occured</h1>

            <div className="interactive">
                <div className="square" onClick={(e) => {
                    const elem = (e.target as HTMLDivElement)
                    if(i > ColorVariants.length) i = 0;

                    elem.style.borderRadius = `${Math.random() * 50}px`
                    elem.style.background = ColorVariants[i++]
                }}></div>
                <p className="m4">Please try again later.</p>
            </div>

            <div className="btn-wrapper">
                <button className="primary-btn " onClick={() => navigate('/account')}>Home page</button>
                <button className="secondary-btn " onClick={() => window.location.reload()}>Refresh</button>
            </div>
        </div>
    </div>
   )
}