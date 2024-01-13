import React from 'react'
import {DatePicker} from 'antd';

const {RangePicker} =DatePicker;

function Recieve() {
  return (
    <>
    <div className="recieve">
      <div Style={{margin:20}}>
       <RangePicker/>
        </div>
      </div>
    </>
  )
}

export default Recieve