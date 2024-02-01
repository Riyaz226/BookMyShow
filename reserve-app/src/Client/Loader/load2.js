/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState} from "react";
import RingLoader from "react-spinners/HashLoader";


function load2() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
   <div className="sweet-loading">
        <RingLoader color="#36d7b7"  loading={loading} size={42}/>
  </div>
  );
}

export default load2;