import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListeReservation from './ListeReservation';
import ShowDialog from './ShowDialog';

function ReserveSauna() {
  const { id } = useParams();
  const [week, setWeek] = useState([]);
  const [time, setTime] = useState([]);
  const [liste, setListe] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [book, setBooking] = useState({
    reserver: '',
    sauna_id: id,
    time_id: '',
    status: false,
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/sauna')
      .then((res) => setListe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const timeData = () => {
    axios.get('http://127.0.0.1:8000/api/sauna/time')
      .then((res) => {
        setWeek(res.data.week);
        setTime(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    timeData();
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/sauna/book')
      .then((res) => { setReservation(res.data) })
      .catch((err) => console.log(err));
  };

  const Booking = () => {
    axios.post('http://127.0.0.1:8000/api/sauna/book', book)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const handleChange = (e, index) => {
    fetchData();
    timeData();
    setBooking({ ...book, [index]: e.target.value });
  };

  const deleteT = (id) => {
    axios.post('http://127.0.0.1:8000/api/sauna/time/delete', { id })
      .then(() => timeData())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container my-5 d-flex gap-5">
      <ListeReservation
        fetchData={fetchData}
        reservation={reservation}
        week={week}
        liste={liste}
        timeData={timeData}
        time={time}
        book={book}
        handleChange={handleChange}
      >

      <div>
       
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title"> Reserve Sauna</h5>
                <button type="button" className="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Day</label>
                  <select
                    className="form-select"
                    value={book.id_week}
                    onChange={(e) => handleChange(e, 'id_week')}
                  >
                    <option value="">Choose a day</option>
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
                  {book.time_id ? (
                    <IconButton style={{ marginTop: '30px' }} onClick={() => deleteT(book.time_id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary mt-4"
                      onClick={() => {
                        const modal1 = document.getElementById('exampleModalToggle');
                        const modal2 = document.getElementById('exampleModalToggle2');
                        const instance1 = window.coreui.Modal.getInstance(modal1);
                        instance1?.hide();
                        const modal2Instance = new window.coreui.Modal(modal2);
                        modal2Instance.show();
                      }}
                    >
                      Add Time
                    </button>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Reserver Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={book.reserver}
                    onChange={(e) => handleChange(e, 'reserver')}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Choose Sauna</label>
                  <select
                    className="form-select"
                    value={book.sauna_id}
                    onChange={(e) => handleChange(e, 'sauna_id')}
                  >
                    <option value="">Select sauna</option>
                    {liste.length > 0 ? (
                      liste.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                          {ele.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No sauna available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" data-coreui-dismiss="modal" onClick={Booking}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

       
        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-secondary text-white">
                <h5 className="modal-title"> Time Details</h5>
                <button type="button" className="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <ShowDialog timeData={timeData} />
              </div>
            </div>
          </div>
        </div>

     
        <button
          className="btn btn-primary"
          data-coreui-toggle="modal"
          data-coreui-target="#exampleModalToggle"
        style={{marginRight:'200px'}}
        >
          Add A New Reservation
        </button>
      </div>
      </ListeReservation >
    </div>
  );
}

export default ReserveSauna;