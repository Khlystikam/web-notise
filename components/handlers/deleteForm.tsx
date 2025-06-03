import './style/deleteForm.css';
import React, { FC } from 'react';

interface FormDeleteNotiseProps {
    onCloseFromDelete: () => void;
    idFromForm: any;
}

const FormDeleteNotise: FC<FormDeleteNotiseProps> = ({ idFromForm, onCloseFromDelete }) => {

    const deleteNotiseStart = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('idFromFormPost', idFromForm);

            const response = await fetch(`${"/php/web-notise/delet-notise.php"}?cacheBuster=${new Date().getTime()}`, {
                method: 'POST',
                body: formDataToSend,
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

    const exitFromDelete = () => {
        onCloseFromDelete();
    }

    return (
        <div className="form-delete-bg">
            <form className="form-delete-box">
                <label className="form-delete-box-label">Вы хотите удалить объявление?</label>
                <button type="submit" className="button-delete-notise button_start" onClick={ deleteNotiseStart }>Удалить</button>
                <button className="button-delete-notise button_cancel" onClick={ exitFromDelete }>Отмена</button>
            </form>
        </div>
    );
}

export default FormDeleteNotise;