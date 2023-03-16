import { slideCategories } from '../../../functions/types';

import { Card, Exam, Note } from '../Slides/categories';

function Slide(data: {
    item: any,
    type: slideCategories
 }): JSX.Element {

    

    if(data.type === 'card') return  <Card  {...data} />
    if(data.type === 'note')  return  <Note  {...data} />
    if(data.type === 'exam')  return  <Exam  {...data} />
    
    return <h1>err</h1>
}