import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';

function EditProgram({ Week, coaches, fetchData, ele }) {
  const [visible, setVisible] = useState(false);
  const [register, setRegister] = useState({
    day: '',
    id:'',
    id_coach: '',
    start_time: '',
    end_time: '',
    session_price: '',
  });

  const handleChange = (e, field) => {
    setRegister({ ...register, [field]: e.target.value });
  };

  const openModal = () => {
    setRegister({ ...ele }); 
    setVisible(true);
  };

  const Registering = () => {
    axios
      .post('http://127.0.0.1:8000/api/gym/edit', register)
      .then((response) => {
        fetchData();
        console.log(response.data);
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <IconButton onClick={openModal}>
        <EditIcon />
      </IconButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit Program</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Day</label>
            <select
              className="form-select"
              value={register.day || ''}
              onChange={(e) => handleChange(e, 'day')}
            >
              {Week.map((day, index) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Coach</label>
            <select
              className="form-select"
              value={register.id_coach || ''}
              onChange={(e) => handleChange(e, 'id_coach')}
            >
              {coaches.map((coach, index) => (
                <option key={index} value={coach.id}>
                  {coach.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              className="form-control"
              value={register.start_time || ''}
              onChange={(e) => handleChange(e, 'start_time')}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Time</label>
            <input
              type="time"
              className="form-control"
              value={register.end_time || ''}
              onChange={(e) => handleChange(e, 'end_time')}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Session Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Session Price"
              value={register.session_price || ''}
              onChange={(e) => handleChange(e, 'session_price')}
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="success" onClick={Registering}>
            Save Changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default EditProgram;
