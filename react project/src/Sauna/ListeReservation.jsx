import React from 'react';
import axios from 'axios';
import {
  CButton,
  CCardImage,
  CFormSwitch,
  CContainer
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import EditReserving from './EditReserving';

function ListeReservation({ week, liste,timeData, time, handleChange, fetchData, reservation, children }) {

  const deleteR = (id) => {
    axios.post('http://127.0.0.1:8000/api/sauna/book/delete', { id })
      .then(() => fetchData())
      .catch(console.error);
  };

  const activate = (id) => {
    axios.post('http://127.0.0.1:8000/api/sauna/book/active', { id })
      .then(() => fetchData())
      .catch(console.error);
  };

  return (
    <CContainer className="py-4">
  
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">List Of Reservation Sauna Rooms </h3>
        {children}
      </div>

    
      <div className="d-grid grid-template-columns border bg-light fw-bold py-3 px-3 mb-2"
        style={{ gridTemplateColumns: '150px 120px 100px 250px 80px 140px 80px 100px', gap: '15px' }}>
        <div>Image</div>
        <div>Sauna Name</div>
        <div>Reserver</div>
        <div>Email</div>
        <div>Day</div>
        <div>Hour</div>
        <div>Activate</div>
        <div>Actions</div>
      </div>

   
      {reservation.length > 0 ? [...reservation].reverse().map((ele) => (
        <div
          key={ele.id}
          className="d-grid align-items-center bg-white border rounded shadow-sm px-3 py-2 mb-3"
          style={{ gridTemplateColumns: '150px 120px 100px 250px 80px 140px 80px 100px', gap: '15px' }}
        >
          <div>
            <CCardImage
              orientation="top"
              src={`http://127.0.0.1:8000/storage/${ele.sauna.image}`}
              style={{ width: '100%', maxHeight: '80px', objectFit: 'cover', borderRadius: '5px' }}
            />
          </div>
          <div>{ele.sauna.name}</div>
          <div>{ele.reserver.name}</div>
          <div>{ele.reserver.email}</div>
          <div>{ele.timing.week.day}</div>
          <div>{`${ele.timing.start_time} à ${ele.timing.end_time}`}</div>
          <div>
            <CFormSwitch
              checked={ele.active === 1}
              onChange={() => activate(ele.id)}
            />
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <CButton
              color="danger"
              size="sm"
              variant="outline"
              onClick={() => deleteR(ele.id)}
            >
              <CIcon icon={cilTrash} />
            </CButton>
            <EditReserving
              ele={ele}
              liste={liste}
              time={time}
              fetchData={fetchData}
              week={week}
              timeData={timeData}
              handleChange={handleChange}
            />
          </div>
        </div>
      )) : (
        <p className="text-center mt-4 text-muted">There Is No Reservation Yet.</p>
      )}
    </CContainer>
  );
}

export default ListeReservation;

