import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CRow,
  CCol,
  CContainer
} from '@coreui/react'
import Rating from '@mui/material/Rating';

function Sport() {
 const [value, setValue] = React.useState(5);

  const [liste, setListe] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/sport')
      .then((response) => setListe(response.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <CContainer className="mt-5">
      <h2 className="text-center mb-4 fw-bold" style={{border:'4px #eee dashed', display:'flex',justifySelf:'center',padding:'20px', width:'fit-content',fontFamily:'roboto'}}>Welcome To <span style={{color:'rgb(221.7, 90.3, 90.3)', padding:'0px 7px 0px 7px '}}>  Our Luxery  </span>  Services</h2>
      <CRow className="g-4 justify-content-center" style={{display:'flex', flexDirection:'column'}}>
        {liste.length > 0 && liste.map((ele, index) => (
          <CCol key={index} xs={12} md={6} lg={5} xl={4}>
            <CCard className="shadow-sm h-100 border-0" style={{backgroundColor:'#eee', width:'1200px', borderRadius: '20px' ,display:'flex', flexDirection: index/2 == 0 ?'row-reverse':'row'}}>
              <CCardImage
                orientation="top"
                src={`http://127.0.0.1:8000/storage/${ele.image}`}
                style={{width:'800px', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <CCardBody className=" d-flex flex-column justify-content-between">
       <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
                <CCardTitle className="fw-bolder fs-4 mb-2" style={{fontFamily:'roboto'}}>{ele.name}</CCardTitle>
                   
                <CCardText className="text-muted" style={{ minHeight: '60px' }}>
                  {ele.description}
                </CCardText>
                <CButton

                   style={{color:'white',backgroundColor:'rgb(221.7, 90.3, 90.3)',display:'flex',alignSelf:'center',justifyContent:'center', width:'180px',fontWeight:'bolder'}}
                  className="mt-0 px-4"
                  onClick={() => ele.name === 'Gym Sport' ? navigate('/gym') : navigate('/sauna')}
                >
                  See More
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  )
}

export default Sport
