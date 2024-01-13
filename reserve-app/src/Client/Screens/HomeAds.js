/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */

import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DLT,ADD,REMOVE } from '../redux/actions/action'

function HomeAds() {
  
  const [data,setData] = useState([]);

  const {id} = useParams();

  const history = useNavigate();

  const dispatch = useDispatch();

  
  const getdata = useSelector((state)=> state.cartreducer.carts);


  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    });
    setData(comparedata);
  }

  const send = (e)=>{
    dispatch(ADD(e));
  }
  
  const dlt = (id)=>{
    dispatch(DLT(id));
    history("/");
}

const remove = (item)=>{
  dispatch(REMOVE(item))
}


  useEffect(()=>{
    compare();
  },[id])

  function Order() {
    alert('Your Event Successfully Received');
  }

  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Event Details Page
        </h2>

        <section className='container mt-3'>
          <div className="iteamsdetails">
          {
            data.map((ele)=>{
              return (
                <>
                <div className="items_img">
              <img src={ele.Image} alt="" />
            </div>

            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p> <strong>Name</strong>  : {ele.name}</p>
                    <p> <strong>Price</strong>  : ₹{ele.Price}</p>
                    <p> <strong>Address</strong>  : {ele.Address}</p>
                    <p> <strong>Total</strong>  :₹  {ele.Price * ele.qnty}</p>
                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                    <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                    <span style={{fontSize:22}}>{ele.qnty}</span>
                    <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>

                    </div>

                  </td>
                  <td>
                    <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.Rating} ★	</span></p>
                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                    <p><strong>Remove :</strong> <span ><DeleteIcon onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}/>	</span></p>
                  </td>
                </tr>
       <button onClick={()=>Order()} className='btn btn-success' style={{marginLeft:"173px"}}>Event Booked</button>
              </Table>
            </div>
          
                </>
              )
            })
          }
          </div>
        </section>
      </div>
    </>

  )
}

export default HomeAds