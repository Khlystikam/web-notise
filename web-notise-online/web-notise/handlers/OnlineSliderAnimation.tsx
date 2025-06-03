import { useEffect, useState, Fragment } from 'react';

interface FormEditeNotiseValue {
  dataUrl: string;
}

const OnlineSliderAnimation: React.FC<FormEditeNotiseValue> = ({ dataUrl }) => {

  interface DefinedNotisItems {
    notisItems: any;
    idNotise: string;
    TitleNotise: string;
    TextNotise: string;
    TagNotise: string;
    ImgNotise: string;
    activeClassText: string;
    item: number;
  }

  const urlBgFile: string = `${"/php/web-notise/animation-file.json"}?cacheBuster=${new Date().getTime()}`;


  const [notisItems, setNotisItems] = useState<DefinedNotisItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeClassText, setActiveClassText] = useState('');
  const [activeClassImg, setActiveClassImg] = useState('');
  let [item, setItem] = useState<number>(0);
  const [backgroundImgGif, setBackgroundImgGif] = useState<string>("");


  useEffect(() => {
      const fetchData = async () => {
        let data:any;

        try {
        const response = await fetch(dataUrl);
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


  useEffect(() => {
    const fetchDataBgFile = async () => {
      try {
        const response = await fetch(urlBgFile);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const dataBgFile = await response.json();
        setBackgroundImgGif(dataBgFile.fileName);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    if (urlBgFile) {
      fetchDataBgFile();
    }

  }, [urlBgFile]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveClassText(' close-text');
      setActiveClassImg(' close-img-box');
      const timeoutId = setTimeout(() => {
        setActiveClassText(' open-text');
        setActiveClassImg(' open-img-box');
      }, 2000);

		setTimeout(()=> setItem(timeInterval()), 1500);


		// Очищаем таймер на каждом цикле
		return () => clearTimeout(timeoutId);
  	}, 6000);


	  // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  });


  function timeInterval(){
		if(item === notisItems.length - 1){
			item = 0;
			return item;
		} else {
			item += 1;
			return item;
		}
	}


  if (loading) {
  return <div>Loading...</div>;
  }

  if (error) {
  return <div>Error: {error}</div>;
  }

  let backgroundImgGifUrl:string = `/assets/web-notise/animation/${backgroundImgGif}`;

  return (
    <Fragment>
      <div className="online-notise-background">
        <video
          src={ backgroundImgGifUrl }
          muted
          autoPlay
          loop 
        />

        {notisItems.slice(item, item + 1).map((element: DefinedNotisItems) => (
          <div className="online-web-notise-app_block" key={ element.idNotise }>
            <div className={`online-web-notise-text-box` + activeClassText}>
                <h1 className='online-web-notise-text-box_h1'>{ element.TitleNotise }</h1>
                <p className='online-web-notise-text-box_text'>{ element.TextNotise }</p>
                <span className='online-web-notise-text-box_line'></span>
                <p className='online-web-notise-text-box_tag'>{ element.TagNotise }</p>
            </div>
            <div className={`online-web-notise-img-box` + activeClassImg}>
                <img className="online-web-notise-img-box_img" src={ element.ImgNotise } alt={ element.TitleNotise } />
            </div>
          </div>
        ))}
        
      </div>
    </Fragment>
  );  
}

export default OnlineSliderAnimation;