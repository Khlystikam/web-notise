import './WebNotiseApp.css';
import '../handlers/style/sliderAnimation.css';
import '../handlers/style/SliderButtonAnimation.css';
import SliderButtonAnimation from '../handlers/SliderButtonAnimation'
import { FC } from 'react';

interface dataUrlValue {
    dataUrl: string;
}

const WebNotiseApp: FC<dataUrlValue> = () => {
    return (
        <div className="web-notise-white-background">
            <SliderButtonAnimation dataUrl="/php/web-notise/notise-table.json"/>
        </div>
    )
}
  
export default WebNotiseApp;