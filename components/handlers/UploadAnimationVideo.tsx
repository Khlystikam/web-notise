import React, { useState } from 'react';
import './style/FileUploadForm.css';

interface UploadAnimationVideoProps {
    setAddFormUploadAnimation: React.Dispatch<React.SetStateAction<Element | undefined>>;
}

const UploadAnimationVideo: React.FC<UploadAnimationVideoProps> = ({ setAddFormUploadAnimation }) => {
    const [file, setFile] = useState<File | null>(null);
    const [nameViwe, serNameViwe] = useState<string>("");

    // Обработчик выбора файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            serNameViwe(event.target.files[0].name);
        }
    };

    // Обработчик отправки формы
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            alert("Пожалуйста, выберите файл для загрузки.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${"/php/web-notise/upload-animation.php"}?cacheBuster=${new Date().getTime()}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Файл успешно загружен!");
            } else {
                console.log("Ошибка при загрузке файла.");
            }
        } catch (error) {
            console.error("Ошибка при отправке файла:", error);
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const fileUploadFormCloseFormAnimation = () => {
        setAddFormUploadAnimation(undefined);
    }

    return (
        <div className="fileUploadForm-music-box">
            <form onSubmit={handleSubmit} className="fileUploadForm-music-form" encType="multipart/form-data">
                <button
                    className='form-edite-button-close icon-close icon-close-upload-music-box'
                    onClick={ fileUploadFormCloseFormAnimation }
                >
                    <img src="/assets/web-notise/imgassets/close.png" className="close-button" alt="close" />
                </button>
                <div className="fileUploadForm-name-view">{nameViwe && <p>Загружен файл: {nameViwe}</p>}</div>
                <label htmlFor="file-upload" className="fileUploadForm-button button-upload">
                    Выбрать файл новой анимации
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Скрываем стандартный input
                />

                <button type="submit" className="fileUploadForm-button button-save">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default UploadAnimationVideo;