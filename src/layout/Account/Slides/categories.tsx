import { cardType, noteType, slideCategories } from "../../../functions/types";
import { formatDate } from "../../../functions/functions";
import { useNavigate } from "react-router";

export function Exam(data: {
    item: any,
    type: slideCategories
 }) {
   
    function convertTime(timeInMs: number) {
        let examDate = new Date(
            timeInMs - new Date().getTime()
        ).getTime();
            
        let days = Math.ceil((examDate / (1000 * 60* 60 * 24)))
            
        return days;
    }
    let convertedStoreDate = convertTime(new Date(data.item.examDate).getTime())
    


    return <CategoryOption
        {...data}
        >
        <div className="slide-text">
            <h1 className="slide-title m3">{data.item?.name}</h1>
            <p className="slide-description m5">{data.item?.description}</p>

            <p className="slide-last-updated m5">Last edited: {
            formatDate(new Date(data.item.UpdatedAt || '')).dmhmy()
            }</p>
        </div>

        <div className="slide-right">
            {convertedStoreDate > 0 ? <>
                    <h1 className="exam-days-number">{convertedStoreDate}</h1>
                    <p className="exam-days-number-bottom m3">Days left</p>
                </> :
                convertedStoreDate === 0 ? <h1 className="exam-days-number m1">Today</h1> :
                <h1 className="exam-days-number m2">Expired</h1>
            }
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
            <img src={`http://trphost.go.ro:8081/${item.image}`} onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/15476701/pexels-photo-15476701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }} className='slide-thumbnail-image' alt="slide-thumbnail" />
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
        onClick={() => {
            if(type === 'note') {
                navigate(
                    `view/${item.ID}`, {
                        state: item
                    }
                )
            }
        }}
        onContextMenu={() => navigate(
            `edit/${item.ID}`,
            {state: item}
        )} 
        className={`account-slide ${type} ${type}-slide slide`}>
            {props.children}
      </div>
    )

}


