import React, { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'

function AddCoach({ fetchData }) {
  const [visible, setVisible] = useState(false)
  const [coach, setCoach] = useState({ name: '', phone: '', salary: 0 })

  const handleChange = (e, field) => {
    setCoach({ ...coach, [field]: e.target.value })
  }

  const registerCoach = () => {
    axios
      .post('http://127.0.0.1:8000/api/gym/coach', coach)
      .then((response) => {
        console.log(response.data)
        fetchData()
        setVisible(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <CButton style={{paddingRight:'100px', paddingLeft:'100px', marginLeft:'300px'}} color="primary" onClick={() => setVisible(true)}>
        Add A New Coach
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add New Coach</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            className="mb-3"
            type="text"
            placeholder="Enter Coach Name"
            value={coach.name}
            onChange={(e) => handleChange(e, 'name')}
          />
          <CFormInput
            className="mb-3"
            type="text"
            placeholder="Phone Number"
            value={coach.phone}
            onChange={(e) => handleChange(e, 'phone')}
          />
          <CFormInput
            className="mb-3"
            type="number"
            placeholder="Coach Salary"
            value={coach.salary}
            onChange={(e) => handleChange(e, 'salary')}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="success" onClick={registerCoach}>
            Create
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddCoach
