import './webnotise.css';
import WebNotiseApp from './components/WebNotiseApp/WebNotiseApp';
import AddNewNotise from './components/WebNotiseAdmin/WebNotiseAdmin';

const Webnotise = () => {
    return (
        <div className="web-notise-box">
            <h1 className="web-notise-box__h1">web объявления</h1>
            <div className="web-notise-app">
                < WebNotiseApp dataUrl="" />
            </div>
            <div className="web-notise-admin">
                <AddNewNotise />
            </div>
        </div>
    )
}
  
export default Webnotise;