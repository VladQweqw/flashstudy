import NoContentImage from '../assets/images/noContent.png'

export default function NoContent() {

   return(
    <div className="no-content section">
        <img src={NoContentImage} alt="no-content" />
    </div>
   )
}