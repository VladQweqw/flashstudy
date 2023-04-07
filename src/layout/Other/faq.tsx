import { Link } from "react-router-dom"

export default function FAQ() {

   return(
    <div className="faq navbar-spacing">
        <h1 className="center m1">FAQ</h1>
        <br />

        <div className="faq-wrapper">
            <div className="faq-item">
                <h2 className="title m2">How to create an account?</h2>
                <p>The procees of creating an account is very easy and staightforward, firstly follow this link <Link to={'/form'}>this</Link></p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellat nesciunt id maxime impedit sapiente ipsa temporibus, deserunt est quos consequuntur, aspernatur quam, sed culpa earum laudantium. Nostrum corporis nam unde dolor libero, eius iure et aperiam debitis commodi quam.</p>
            </div>

            <div className="faq-item">
                <h2 className="title m2">How to create an account?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iure tempore veniam fugit sit officiis sequi inventore veritatis, minus ratione? Hic qui natus nesciunt nobis.</p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellat nesciunt id maxime impedit sapiente ipsa temporibus, deserunt est quos consequuntur, aspernatur quam, sed culpa earum laudantium. Nostrum corporis nam unde dolor libero, eius iure et aperiam debitis commodi quam.</p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellat nesciunt id maxime impedit sapiente ipsa temporibus, deserunt est quos consequuntur, aspernatur quam, sed culpa earum laudantium. Nostrum corporis nam unde dolor libero, eius iure et aperiam debitis commodi quam.</p>
                
            </div>

            <div className="faq-item">
                <h2 className="title m2">How to create an account?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iure tempore veniam fugit sit officiis sequi inventore veritatis, minus ratione? Hic qui natus nesciunt nobis.</p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellat nesciunt id maxime impedit sapiente ipsa temporibus, deserunt est quos consequuntur, aspernatur quam, sed culpa earum laudantium. Nostrum corporis nam unde dolor libero, eius iure et aperiam debitis commodi quam.</p>
                <br />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam repellat nesciunt id maxime impedit sapiente ipsa temporibus, deserunt est quos consequuntur, aspernatur quam, sed culpa earum laudantium. Nostrum corporis nam unde dolor libero, eius iure et aperiam debitis commodi quam.</p>
                
            </div>

        </div>
    
    </div>
   )
}