
export default function Popup() {

   return (
        <div className="popup popup-active" id="popup">
            <h1 className="popup-title m5" onClick={(e) => {
            ((e.target as HTMLHeadingElement).parentElement as HTMLDivElement).classList.remove('popup-active');
        }} id='popup-title'>Default</h1>
        </div>
   )
}