import { cardType, noteType, slideCategories } from "../../../functions/types";
import { formatDate } from "../../../functions/functions";
import { useNavigate } from "react-router";

export function Exam(data: {
    item: cardType,
    type: slideCategories
 }) {
   
    return <CategoryOption
        {...data}
        >
        <div className="slide-text">
            <h1 className="slide-title m3">Test matea awd awd awd </h1>
            <p className="slide-description m5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum libero praesentium. Necessitatibus, hic commodi.</p>

            <p className="slide-last-updated m5">last updated: 3 hours ago</p>
        </div>

        <div className="slide-right">
            <h1 className="exam-days-number">32</h1>
            <p className="exam-days-number-bottom m3" >days left</p>
        </div>
    </CategoryOption>
}

export function Note(data: {
    item: noteType,
    type: slideCategories
 }) {   
    const { item } = data;    

    return <CategoryOption
        {...data}
        >
        
        <h1 className="note-title m3">{item.title}</h1>
        <p className="note-description m4">{item.text}</p>

        <p className="slide-last-updated m5">Last edited: {
            formatDate(new Date(item.UpdatedAt || '')).dmhmy()
        }</p>

    </CategoryOption>
}

export function Card(data: {
   item: cardType,
   type: slideCategories
}) {
   const { item } = data;
   
    return <CategoryOption
        {...data}
        >
        <div className="slide-text">
        <h1 className="slide-title m3">{item.question}</h1>
        <p className="slide-description m4">{item.answer}</p>
        <p className="slide-last-updated m5">Last edited: {
            formatDate(new Date(item.UpdatedAt || '')).dmhmy()
            }</p>
        </div>

        <div className="slide-thumbnail">
        <div className="card-image-overlay"></div>
        {/* {item.image &&  <img src={item.image} className='slide-thumbnail-image' alt="slide-thumbnail" />} */}
        <img src="https://images.pexels.com/photos/15476701/pexels-photo-15476701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='slide-thumbnail-image' alt="slide-thumbnail" />
        </div>
    </CategoryOption>

}

export function CategoryOption(props: {
    children: any,
    item: {ID: number}
    type: slideCategories 
}) {    
    
    const { type, item } = props;
    const navigate = useNavigate();

    return(
        <div 
        onClick={() => navigate(
            `edit/${item.ID}`,
            {state: item}
        )} 
        className={`account-slide ${type} ${type}-slide slide`}>
            {props.children}
      </div>
    )

}