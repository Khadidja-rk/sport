import React, { useEffect, useState } from 'react';
import {
  CContainer, CRow, CCol, CButton, CImage,
  CCard, CCardBody
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterSaunaComponent from './RegisterSauna';
import EditSauna from './EditSauna';

function Sauna() {
  const navigate = useNavigate();
  const [liste, setListe] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/sauna')
      .then((res) => setListe(res.data))
      .catch((err) => console.error(err));
  };

  const deleteS = (id) => {
    axios.post('http://127.0.0.1:8000/api/sauna/delete', { id })
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <CContainer className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">List Of Sauna Rooms </h2>
        <RegisterSaunaComponent fetchData={fetchData} />
      </div>

      {/* Table Header */}
      <CRow className="fw-bold text-center mb-2 border-bottom bg-light py-3">
        <CCol md={2}>Image</CCol>
        <CCol md={2}>Name</CCol>
        <CCol md={2}>Type</CCol>
        <CCol md={3}>Description</CCol>
        <CCol md={1}>Reserver</CCol>
        <CCol md={2}>Actions</CCol>
      </CRow>

      {/* Table Body */}
      {liste.length > 0 ? (
        [...liste].reverse().map((ele, index) => (
          <CRow key={index} className="align-items-center text-center mb-2 border-bottom  py-3 shadow-sm rounded" style={{backgroundColor:'white'}}>
            <CCol md={2} >
              <CImage
                src={`http://127.0.0.1:8000/storage/${ele.image}`}
                width={110}
                height={70}
                alt="sauna"
                fluid
                className="rounded"
              />
            </CCol>
            <CCol md={2}>{ele.name}</CCol>
            <CCol md={2}>{ele.type}</CCol>
            <CCol md={3}>{ele.description}</CCol>
            <CCol md={1}>
              <CButton
                color="primary"
                size="sm"
                onClick={() => navigate(`/reserveSauna`)}
              >
                Reserve
              </CButton>
            </CCol>
            <CCol md={2} className="d-flex justify-content-center gap-2">
              <CButton
                color="danger"
                size="sm"
                variant="outline"
                onClick={() => deleteS(ele.id)}
              >
                <CIcon icon={cilTrash} />
              </CButton>
              <EditSauna fetchData={fetchData} ele={ele} />
            </CCol>
          </CRow>
        ))
      ) : (
        <p className="text-center">No Disponile Sauna Rooms.</p>
      )}

      <hr className="my-5" />
    </CContainer>
  );
}

export default Sauna;

