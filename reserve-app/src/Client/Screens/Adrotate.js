/* eslint-disable jsx-a11y/iframe-has-title */
import React,{useState,useEffect} from 'react';
import './Style.css'
import ClockLoader from "react-spinners/ClockLoader";
//import CloseIcon from '@mui/icons-material/Close';
import './Style.css'


const Adrotate = () => {
  const [ads, setAds] = useState([
    { content: 'Pushpa2', duration: 6000, videoUrl: '08cfjZNKZbQ?si=UPeFEuddUxVucKNk' },
  ]); 
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, ads[currentAdIndex].duration);

    const closeTimer = setTimeout(() => {
      setShowAd(false);
    }, 8000);

    return () => {
      clearTimeout(adTimer);
      clearTimeout(closeTimer);
    };
  }, [ads, currentAdIndex]);

  return (
    <>
     {showAd && ( 
        <div className="advertisement" id="ad">
        <div>
        <div className="vb">  
           <h3>{ads[currentAdIndex].content}</h3>
          </div>
          <iframe
                title={"Ad"}
                src={`https://www.youtube.com/embed/${ads[currentAdIndex].videoUrl}`}
              ></iframe>
              
        </div>
        <ClockLoader color="#36d7b7" size={23} className="ro"/>
      </div>
    )}
    </>
  );
};

export default Adrotate;
