import { useState, useEffect } from 'react';
import './OnlineNotiseApp.css';
import './handlers/OnlineSliderAnimation.css';
import OnlineSliderAnimation from './handlers/OnlineSliderAnimation';
import AudioPlayer from '../../components/handlers/AudioPlayer';
// import AnimationUpdate from '../../components/handlers/Animation-update';
import LoadingSite from '../../components/handlers/loading-site';

const OnlineNotiseApp = () => {
    const dataUrl = `/php/web-notise/notise-table-online.json?cacheBuster=${new Date().getTime()}`;
    const [showApp, setShowApp] = useState<boolean>(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowApp(true);
      }, 2000);
  
      return () => clearTimeout(timer); // Очистка таймера
    }, []);
  
    return (
      <div className="online-notise-app-background-1">
        {showApp ? (
            <>
                <OnlineSliderAnimation dataUrl={dataUrl} />
                <AudioPlayer />
            </>
        ) : (
          <LoadingSite />
        )}
      </div>
    );
  };
  
export default OnlineNotiseApp;