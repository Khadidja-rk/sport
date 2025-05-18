import React, { useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
function AddProgram({ Week, coaches, fetchData }) {
  const [register, setRegister] = useState({
    session_price: '',
    start_time: '',
    end_time: '',
    day: '',
    id_coach: 1
  });

  const handleChange = (e, index) => {
    setRegister({ ...register, [index]: e.target.value });
  };

  const Registering = () => {
    axios.post('http://127.0.0.1:8000/api/gym', register)
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button type="button" className="btn btn-primary " style={{paddingLeft:'100px', paddingRight:'100px', margin:'20px', color:'black', backgroundColor:'#eee'}} data-coreui-toggle="modal" data-coreui-target="#exampleModal">
        Add  A New Program 
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Program</h5>
              <button type="button" className="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div style={{ padding: '30px' }}>
                {/* <h4 className="text-center mb-4"></h4> */}
                <div className="mb-3">
                  <label htmlFor="daySelect" className="form-label">Day</label>
                  <select
                    id="daySelect"
                    className="form-select"
                    value={register.day}
                    onChange={(e) => handleChange(e, 'day')}
                  >
                    {Week.map((element, index) => (
                      <option key={index} value={element}>{element}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="coachSelect" className="form-label">Coach</label>
                  <select
                    id="coachSelect"
                    className="form-select"
                    value={register.id_coach}
                    onChange={(e) => handleChange(e, 'id_coach')}
                  >
                    {coaches.length > 0 ? (
                      coaches.map((ele, index) => (
                        <option key={index} value={ele.id}>{ele.name}</option>
                      ))
                    ) : 'No coaches available'}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="startTime" className="form-label">Start Time</label>
                  <input
                    id="startTime"
                    type="time"
                    className="form-control"
                    value={register.start_time}
                    onChange={(e) => handleChange(e, 'start_time')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="endTime" className="form-label">End Time</label>
                  <input
                    id="endTime"
                    type="time"
                    className="form-control"
                    value={register.end_time}
                    onChange={(e) => handleChange(e, 'end_time')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="sessionPrice" className="form-label">Session Price</label>
                  <input
                    id="sessionPrice"
                    type="number"
                    className="form-control"
                    placeholder="Enter Session Price"
                    value={register.session_price}
                    onChange={(e) => handleChange(e, 'session_price')}
                  />
                </div>

                <div className="d-flex justify-content-space-between gap-10 mt-4">
                  <button
                    data-coreui-dismiss="modal"
                    className="btn btn-danger"
                    style={{ width: '200px',marginRight:'100px' , color:'white'}}
                    onClick={Registering}
                  >
                    Add New Program
                  </button>
                         <button type="button" className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
                </div>
            
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProgram;
