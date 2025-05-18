import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditReserving({ele,time,week,liste , timeData,fetchData}) {
const [book,setBooking] = useState({...ele,id_editing: ele.id});
const Editing=()=>{
console.log(book);
 axios.post('http://127.0.0.1:8000/api/sauna/update',book).then((response)=>{
 console.log(response.data);
fetchData();
timeData();
   })
   .catch((err)=>{console.log(err);
    })
 }
const handleChange = (e, index) => {
  const value = e.target.value;

  if (index === 'id_week') {
    
    setBooking({ ...book, id_week: value, time_id: '' });
  } else {
    setBooking({ ...book, [index]: value });
  }
};

  return (
    <div>
        <div>

      <button
        type="button"
        className="btn btn-primary"
        data-coreui-toggle="modal"
        data-coreui-target={`#staticBackdrop${book.id}`}
        onClick={()=>console.log(time)
        }
      >
      Edit
      
      </button>
      <div
        className="modal fade"
        id={`staticBackdrop${book.id}`}
        data-coreui-backdrop="static"
        data-coreui-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true" 
    
      >
     <div className="modal-dialog modal-dialog-centered">
        <div className="modal-dialog"    style={{padding:'20px', width:'500px'}}>
          <div className="modal-content" style={{paddingLeft:'40px'}}>
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Sauna Reservation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-coreui-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

                        <div style={{marginBottom:'20px'}} >
                            <div className="mb-3">
                  <label className="form-label">Select Day</label>
                  <select
                    className="form-select"
                    value={book.timing.id_week}
                    onChange={(e) => handleChange(e, 'id_week')}
                  >
                    {/* <option value="">Choose a day</option> */}
                    {week.map((el, i) => (
                      <option key={i} value={el.id}>{el.day}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3 d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                    <label className="form-label">Select Time</label>
                  <select
                      className="form-select"
                      value={book.time_id}
                      onChange={(e) => handleChange(e, 'time_id')}
                    >
                      <option value="">Choose time</option>
                      {time.filter((el) => el.id_week == book.id_week).map((el, i) => (
                        <option key={i} value={el.id}>
                          {el.start_time} to {el.end_time}
                        </option>
                      ))}
                    </select>
                  </div>
                
                </div>
                        <div style={{marginBottom:'20px'}}>
                        <label>Enter Reserver Name </label> <br/> 
                        <input type='text' style={{padding:'10px', width:'300px' }}  placeholder='reserver name' value={book.reserver.name}  onChange={(e)=>handleChange(e,'reserver')} />
                        </div>
                        <select value={book.sauna_id} style={{padding:'10px', width:'325px' }}  onChange={(e) => handleChange(e, 'sauna_id')}>
                        <option value="">Select Sauna</option>
                          {liste.length > 0 ? (
                            liste.map((ele) => (
                              <option key={ele.id} value={ele.id}>
                                {ele.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>no sauna</option>
                          )}
                        </select>
                                      
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-coreui-dismiss="modal"
              >
                Close
              </button>
              <button type="button"  data-coreui-dismiss="modal" onClick={()=>{Editing()}} className="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   </div>
  )
}

export default EditReserving