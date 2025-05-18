import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormLabel } from '@coreui/react';

function ShowDialog({timeData}) {
  const [week, setWeek] = useState([]);
  const [time, setTime] = useState({ status: false, end_time: '', start_time: '', id_week: '' });
 
  const Add = () => {

    axios
      .post('http://127.0.0.1:8000/api/sauna/time', time)
      .then((response) => {
        console.log(response.data);
    
      })
      .catch((err) => {
        console.log(err);
     
      });
  };


  const handleChange = (e, index) => {
    setTime({ ...time, [index]: e.target.value });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/sauna/week')
      .then((response) => {
        setWeek(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div className="modal-body">
        {/* Week selection */}
        <div style={{ marginBottom: '20px' }}>
          <CFormLabel htmlFor="select-day">Select Day</CFormLabel>
          <CFormSelect
            id="select-day"
            value={time.id_week}
            onChange={(e) => handleChange(e, 'id_week')}
          >
            <option value="">Select Day</option>
            {week.map((element, index) => (
              <option key={index} value={element.id}>
                {element.day}
              </option>
            ))}
          </CFormSelect>
        </div>

        {/* Start time selection */}
        <div style={{ marginBottom: '20px' }}>
          <CFormLabel htmlFor="start-time">Select Start Time</CFormLabel>
          <CFormInput
            type="time"
            id="start-time"
            value={time.start_time}
            onChange={(e) => handleChange(e, 'start_time')}
          />
        </div>

        {/* End time selection */}
        <div style={{ marginBottom: '20px' }}>
          <CFormLabel htmlFor="end-time">Select End Time</CFormLabel>
          <CFormInput
            type="time"
            id="end-time"
            value={time.end_time}
            onChange={(e) => handleChange(e, 'end_time')}
          />
        </div>
      </div>

   
      <div className="modal-footer p-0 m-0">
        <CButton color="primary" onClick={()=>{Add(); timeData()}}>
          Create
        </CButton>
  <CButton
  color="primary"
  onClick={() => {
    const modal2 = document.getElementById('exampleModalToggle2');
    const modal1 = document.getElementById('exampleModalToggle');

    const instance2 = window.coreui.Modal.getInstance(modal2);
    instance2?.hide();

    const instance1 = new window.coreui.Modal(modal1);
    instance1.show();
  }}
>
  Back
</CButton>


        <button type="button" className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
           
      </div>
    </div>
  );
}

export default ShowDialog;


