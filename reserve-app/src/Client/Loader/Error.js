/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState} from "react";
import PacmanLoader from "react-spinners/ScaleLoader";


function Error() {
  let [loading2, setLoading2] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
   <div className="sweet-loading">
        <PacmanLoader color="#36d7b7"  loading={loading2} size={82}/>
  </div>
  );
}

export default Error;