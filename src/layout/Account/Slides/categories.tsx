import { cardType, noteType, slideCategories } from "../../../functions/types";
import { formatDate } from "../../../functions/functions";
import { contextMenuType } from "../../../functions/types";
import { useNavigate } from "react-router";

export function Exam(data: {
    item: cardType,
    type: slideCategories
 }) {
   
    return <CategoryOption
        {...data}
        >
        <div className="slide-text">
            <h1 className="slide-title">Test matea awd awd awd </h1>
            <p className="slide-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum libero praesentium. Necessitatibus, hic commodi.</p>

            <p className="slide-last-updated">last updated: 3 hours ago</p>
        </div>

        <div className="slide-right">
            <h1 className="exam-days-number">32</h1>
            <p className="exam-days-number-bottom" >days left</p>
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
        
        <h1 className="note-title">{item.title}</h1>
        <p className="note-description">{item.text}</p>

        <p className="slide-last-updated">Last edited: {
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
        <h1 className="slide-title">{item.question}</h1>
        <p className="slide-description">{item.answer}</p>
        <p className="slide-last-updated">Last edited: {
            formatDate(new Date(item.UpdatedAt || '')).dmhmy()
            }</p>
        </div>

        <div className="slide-thumbnail">
        <div className="card-image-overlay"></div>
        {item.image &&  <img src={item.image} className='slide-thumbnail-image' alt="slide-thumbnail" />}
        
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