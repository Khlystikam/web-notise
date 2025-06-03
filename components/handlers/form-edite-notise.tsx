import './style/formEditeNotise.css';
import { useEffect, useState } from 'react';
import React, { FC } from 'react';
import FormDeleteNotise from './deleteForm';

interface FormEditeNotiseProps {
    onClose: () => void;
    idFromForm: any;
}

const FormEditeNotise: FC<FormEditeNotiseProps> = ({ onClose, idFromForm }) => {
    const [filePost, setFilePost] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    let textContentName: any = document.querySelector('.web-notise-text-box_h1') as HTMLParagraphElement | null;
    let textContentDescription: any = document.querySelector('.web-notise-text-box_text') as HTMLParagraphElement | null;
    let textContentTag: any = document.querySelector('.web-notise-text-box_tag') as HTMLParagraphElement | null;
    let textContentImg: any = document.querySelector('.web-notise-img-box_img') as HTMLImageElement | null;

    const [textNameValue, setTextNameValue] = useState<string>('');
    const [textDescriptionValue, setTextDescriptionValue] = useState<string>('');
    const [textTagValue, setTextTagValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>("Да");
    const [deleteNotise, setDeleteNotise] = useState<any>(undefined);

    useEffect(() => {
        if (textContentName) {
            setTextNameValue(textContentName.innerText);
        }
        if (textContentDescription) {
            setTextDescriptionValue(textContentDescription.innerText);
        }
        if (textContentTag) {
            setTextTagValue(textContentTag.innerText);
        }
        if (textContentImg) {
            setImageUrl(textContentImg.src);
        }
    }, [textContentName, textContentDescription, textContentTag, textContentImg]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('textNamePost', textNameValue);
            formDataToSend.append('textDescriptionPost', textDescriptionValue);
            formDataToSend.append('textTagPost', textTagValue);
            formDataToSend.append('selectedOptionPost', selectedOption);
            formDataToSend.append('idFromFormPost', idFromForm);

            if (filePost) {
                formDataToSend.append('image', filePost);
            }

            const response = await fetch(`${"/php/web-notise/update-notise.php"}?cacheBuster=${new Date().getTime()}`, {
                method: 'POST',
                body: formDataToSend,
            });
    
            const result = await response.text();
            console.log("Ответ от PHP:", result);
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
        }

        setTimeout(() => {
            window.history.go(0);
        }, 1000);
    };

    useEffect(() => {
        if (filePost) {
            setImageUrl(URL.createObjectURL(filePost));
        }
    }, [filePost]);

    const toggleEditForm = () => {
        onClose();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFilePost(selectedFile);
        }
    }

    function closeDeletNotise() {
        setDeleteNotise(undefined);
    }

    function deletNotise() {
        setDeleteNotise(<FormDeleteNotise onCloseFromDelete={ closeDeletNotise } idFromForm={idFromForm} />);
    }

    return (
        <div className="form-edite-bg">
            <form className="form-edite-box" onSubmit={handleSubmit}>
                <button className="form-edite-button-close icon-close" type="button" onClick={toggleEditForm}>
                    <img src="/assets/web-notise/imgassets/close.png" className="close-button" alt="close-button" />
                </button>
                <div className="form-edite-text">
                    <input
                        className="form-edite__name"
                        name="textNamePost"
                        type="text"
                        value={textNameValue}
                        onChange={(e) => setTextNameValue(e.target.value)}
                    />
                    
                    <textarea
                        className="form-edite__description"
                        name="textDescriptionPost"
                        value={textDescriptionValue}
                        onChange={(e) => setTextDescriptionValue(e.target.value)}
                        rows={5}
                        cols={30}
                    />

                    <input
                        className="form-edite__tag"
                        name="textTagPost"
                        type="text"
                        value={textTagValue}
                        onChange={(e) => setTextTagValue(e.target.value)}
                    />
                    <span className="button-delet-notise" onClick={deletNotise}>
                        <p>Удалить объявление?</p>
                    </span>
                </div>
                <div className="input-img-selecte-vision">
                    <div className="form-edite-img">
                        {imageUrl && (
                            <img
                                className="form-edite__img"
                                src={imageUrl}
                                alt="Uploaded"
                            />
                        )}
                    </div>
                    <div className="form-edite-upload">
                        <div className="form-add-img">
                            <label htmlFor="file-upload" className="edite-upload-img-button">
                                Загрузить новое изображение
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="selected-option-box-add">
                        <label htmlFor="decision">Выводить объявление?</label>
                        <select
                            className="selected-option-value"
                            id="decision"
                            value={selectedOption}
                            onChange={ (e) => setSelectedOption(e.target.value) }
                            >
                            <option value="Да">Да</option>
                            <option value="Нет">Нет</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="button-update-notise">Сохранить</button>
                { deleteNotise }
            </form>
        </div>
    );
}

export default FormEditeNotise;