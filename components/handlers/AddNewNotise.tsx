import { useState, useEffect } from 'react';
import './style/addNewNotise.css';

interface OtherComponentProps {
    setAddForm: React.Dispatch<React.SetStateAction<Element | undefined>>;
}

const AddNewNotise: React.FC<OtherComponentProps> = ({ setAddForm }) => {
    const [textNameValue, setTextNameValue] = useState<string>("");
    const [textDescriptionPost, setTextDescriptionPost] = useState<string>("");
    const [textTagPost, setTextTagPost] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("Да");
    const [filePost, setFilePost] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Создаем объект FormData для отправки данных
        const formData = new FormData();
        formData.append('textNamePost', textNameValue);
        formData.append('textDescriptionPost', textDescriptionPost);
        formData.append('textTagPost', textTagPost);
        formData.append('selectedOptionPost', selectedOption);

        if (filePost) {
            formData.append('image', filePost);  // Добавляем изображение
        }

        try {
            const response = await fetch('/php/web-notise/add-notise.php', {
                method: 'POST',
                body: formData, 
            });

            const result = await response.text();
            console.log("Ответ от PHP:", result);

        } catch (error) {
            console.error("Ошибка отправки данных:", error);
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    useEffect(() => {
        if (filePost) {
            setImageUrl(URL.createObjectURL(filePost));
        }
    }, [filePost]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFilePost(selectedFile);
        };
    }

    const closeFormAdd = () => {
        setAddForm(undefined);
    }

    return (
        <div className="form-edite-bg">
            <form className="form-edite-box" onSubmit={ handleSubmit }>
                <button className="form-edite-button-close icon-close" type="button" onClick={ closeFormAdd }>
                    <img src="/assets/web-notise/imgassets/close.png" className="close-button" alt="close-button" />
                </button>
                <div className="form-edite-text">
                    <input
                        className="form-edite__name"
                        name="textNamePost"
                        type="text"
                        value={ textNameValue }
                        onChange={ (e) => setTextNameValue(e.target.value) }
                    />
                    <textarea
                        className="form-edite__description"
                        name="textDescriptionPost"
                        value={ textDescriptionPost }
                        onChange={ (e) => setTextDescriptionPost(e.target.value) }
                        rows={5}
                        cols={30}
                    />
                    <input
                        className="form-edite__tag"
                        name="textTagPost"
                        type="text"
                        value={ textTagPost }
                        onChange={ (e) => setTextTagPost(e.target.value) }
                    />
                </div>
                <div className="input-img-selecte-vision">
                    <div className="form-add-img">
                        {imageUrl && (
                            <img
                                className="form-add__img"
                                src={imageUrl}
                                alt="Uploaded"
                            />
                        )}
                    </div>


                    <div className="form-edite-upload">
                        <div className="form-add-img">
                            <label htmlFor="file-upload" className="add-upload-img-button">
                                Загрузить изображение
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // Скрываем стандартный input
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
            </form>
        </div>
    );
}

export default AddNewNotise;
