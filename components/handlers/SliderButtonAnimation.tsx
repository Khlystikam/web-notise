import { useEffect, useState } from 'react';
import FormEditeNotise from './form-edite-notise';
import React, { FC, Fragment } from 'react';

interface FormEditeNotiseValue {
    dataUrl: any;
}

const SliderButtonAnimation: FC<FormEditeNotiseValue> = ({ dataUrl }) => {

    interface DefinedNotisItems {
        notisItems: any;
        id: string;
        TitleNotise: string;
        TextNotise: string;
        TagNotise: string;
        ImgNotise: string;
        activeClassText: string;
        item: number;
    }

    const [notisItems, setNotisItems] = useState<DefinedNotisItems[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    let [item, setItem] = useState<number>(0);
    const [editeForm, setEditForm] = useState<any>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            let data:any;

            try {
            const response = await fetch(`${dataUrl}?cacheBuster=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response) {
                data = await response.json();
            }

            setNotisItems(data);
            setLoading(false);

            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchData();
    }, [dataUrl]);


    function previousSlide () {
    if(item === 0){
        setItem(notisItems.length -1);
        return item;
    } else {
        setItem(item = item - 1);
        return item;
    }
    };

    function nextSlide () {
    if(item === notisItems.length - 1){
        setItem(item = 0);
        return item;
    } else {
        setItem(item = item + 1);
    }
    };

    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error}</div>;
    }

    const closeEditeForm = () => {
        setEditForm(undefined);
    };

    const editFormOpen = (event: React.MouseEvent<HTMLElement>) => {
        const element = event.currentTarget as HTMLElement;
        const elementId = element.id;

        setEditForm(<FormEditeNotise onClose={closeEditeForm} idFromForm={elementId} />);
    }

    return (
        <Fragment>
            {notisItems.slice(item, item + 1).map((element: DefinedNotisItems) => (
                <div className="container-notise">
                    <button className="button-slide icon-edite" onClick={ editFormOpen } id={ element.id }>
                        <div className="img-box__icon-edit">
                            <img src="/assets/web-notise/imgassets/edit.png" alt="edit-button" />
                        </div>
                    </button>
                    <button className="button-slide button-previous-slide" onClick={ previousSlide }>
                        <img className="slide-previous-arraw" src="/assets/web-notise/imgassets/back.png" alt="back arraw" />
                    </button>
                    
                        <div className="web-notise-app_block" key={ element.id }>
                            <div className="web-notise-text-box">
                                <h1 className="web-notise-text-box_h1">{ element.TitleNotise }</h1>
                                <p className="web-notise-text-box_text">{ element.TextNotise }</p>
                                <span className="web-notise-text-box_line"></span>
                                <p className="web-notise-text-box_tag">{ element.TagNotise }</p>
                            </div>
                            <div className="web-notise-img-box">
                                <img className="web-notise-img-box_img--admin" src={ element.ImgNotise } alt={ element.TitleNotise } />
                            </div>
                        </div>
                    
                    <button className="button-slide button-next-slide" onClick={ nextSlide }>
                        <img className="slide-next-arraw" src="/assets/web-notise/imgassets/back.png" alt="next arraw" />
                    </button>
                    { editeForm }
                </div>
            ))}
        </Fragment>
    );  
}

export default SliderButtonAnimation;