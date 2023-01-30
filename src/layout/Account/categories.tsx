import { cardType, slideCategories } from "../../functions/types";
import { formatDate } from "../../functions/functions";
import { contextMenuType } from "../../functions/types";

export function Exam(data: {
    item: cardType,
    setIsContextMenu: (arg0: boolean) => void,
    setContextMenuCoords: (arg0: contextMenuType) => contextMenuType,
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

export function Note(data: any) {   
    return <CategoryOption
        {...data}
        >
        
        <h1 className="note-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam veniam maiores totam vel dolores hic voluptate sit, consequuntur laborum iure ullam recusandae porro quae!</h1>

        <p className="note-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem suscipit quas iste tempora inventore ipsum qui est corporis, repellendus neque et doloremque excepturi at illo ut sit odit, consequuntur eaque saepe quod ratione deleniti natus? Accusamus quam dignissimos nam recusandae, sint iste officiis minima corporis odio similique ducimus inventore perspiciatis!
        </p>

        <p className="slide-last-updated">last updated: 3 hours ago</p>

    </CategoryOption>
}

export function Card(data: {
   item: cardType,
   setIsContextMenu: (arg0: boolean) => void,
   setContextMenuCoords: (arg0: contextMenuType) => contextMenuType,
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
    setIsContextMenu: (arg0: boolean) => void,
    setContextMenuCoords: (arg0: contextMenuType) => contextMenuType,
    type: slideCategories 
}) {    
    
    const { setIsContextMenu, setContextMenuCoords, type, item} = props;
    

    return(
        <div 
        onClick={() => setIsContextMenu(false)} onContextMenu={(e) => {
            setIsContextMenu(true)
   
            let x = e.pageX - (e.target as HTMLDivElement).offsetLeft
            let y = e.pageY - (e.target as HTMLDivElement).offsetTop
   
            setContextMenuCoords({x, y, id: item.ID}) 
   
          }}
        className={`account-slide ${type} card-slide`}>
            {props.children}
      </div>
    )

}