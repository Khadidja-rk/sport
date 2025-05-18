
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
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
import { IconButton } from '@mui/material'



function EditCoach({ fetchData , ele}) {
  const [visible, setVisible] = useState(false)
 const [coach,setCoach] = useState(ele);
  const handleChange = (e, field) => {
    setCoach({ ...coach, [field]: e.target.value })
  }

  const registerCoach = () => {
    axios
      .post('http://127.0.0.1:8000/api/gym/coach/edit', coach)
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
    <div>
<IconButton onClick={() => setVisible(true)}>
<EditIcon/>
</IconButton>
   {/* <CButton color="primary" >
        Add Coach
      </CButton> */}

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit Coach Information</CModalTitle>
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
          <CButton color="success" onClick={()=>{registerCoach() ;  setVisible(false);}}>
            Edit
          </CButton>
        </CModalFooter>
      </CModal>

</div>
  )
}

export default EditCoach