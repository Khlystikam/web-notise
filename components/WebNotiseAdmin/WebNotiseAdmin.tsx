import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewNotise from '../handlers/AddNewNotise';
import FileUploadForm from '../handlers/FileUploadForm';
import UploadAnimationVideo from '../handlers/UploadAnimationVideo';

import './WebNotiseAdmin.css';
import '../../style-media-request/laptop-max-1440.css';
import '../../style-media-request/laptop-max-1024.css';
import '../../style-media-request/table-max-768.css';
import '../../style-media-request/mobile-max-425.css';


const WebNotiseAdmin = () => {
    const [addForm, setAddForm] = useState<any | "">();
    const [addFormUploadAnimation, setAddFormUploadAnimation] = useState<any>(undefined);
    const navigate = useNavigate();

    function openEditeForm() {
        setAddForm(<AddNewNotise setAddForm={setAddForm} />);
    }

    function musicFileUpload() {
        setAddForm(<FileUploadForm setAddForm={setAddForm} />);
    }

    function UploadAnimation() {
        setAddFormUploadAnimation(<UploadAnimationVideo setAddFormUploadAnimation={setAddFormUploadAnimation} />);
    }

    const handleRedirect = () => {
        navigate("online-notice");
    };

    return (
        <div className="web-notise-admin">
            <Fragment>
                { addForm }
            </Fragment>
            <Fragment>
                { addFormUploadAnimation }
            </Fragment>
            <div className="block-button-admin">
                <button className="button-admin add-new-notice" onClick={ openEditeForm }>Добавить новое объявдение</button>
                <button className="button-admin add-new-background-animation" onClick={ UploadAnimation }>Добавить новую анимацию фона</button>
                <button className="button-admin add-playlist-songs" onClick={ musicFileUpload }>Добавить/удалить музыку</button>
            </div>
            <div className="block-button-online">
                <button className="button-admin button-admin--blue" onClick={ handleRedirect }>Открыть объявления онлайн</button>
            </div>
        </div>
    )
}
  
export default WebNotiseAdmin;