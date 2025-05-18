import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function RegisterSaunaComponent({fetchData}) {
  const [sauna, setSauna] = useState({
    is_available: true,
    price: 0,
    image: '',
    description: '',
    name: '',
    type: '',
  });

  const Register = () => {
    const formData = new FormData();
    formData.append('name', sauna.name);
    formData.append('type', sauna.type);
    formData.append('price', sauna.price);
    formData.append('description', sauna.description);
    formData.append('is_available', sauna.is_available ? 1 : 0);

    if (sauna.image && sauna.image.length > 0) {
      formData.append('image', sauna.image[0]);
    }

    if (sauna.id_editing) {
      formData.append('id_editing', sauna.id_editing);
    }

    axios.post('http://127.0.0.1:8000/api/sauna', formData)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e, index) => {
    if (index === 'image') {
      setSauna({ ...sauna, [index]: e.target.files });
    } else if (index === 'is_available') {
      setSauna({ ...sauna, [index]: e.target.value === 'true' });
    } else {
      setSauna({ ...sauna, [index]: e.target.value });
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" data-coreui-toggle="modal" data-coreui-target="#exampleModal">
        Add A New Sauna 
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Sauna Room</h5>
              <button type="button" className="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '100%' }}>
                <div className="mb-3">
                  <label htmlFor="saunaName" className="form-label">Sauna Name</label>
                  <input
                    id="saunaName"
                    type='text'
                    className="form-control"
                    placeholder='Sauna Name'
                    value={sauna.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="saunaType" className="form-label">Sauna Type</label>
                  <input
                    id="saunaType"
                    type='text'
                    className="form-control"
                    placeholder='Sauna Type'
                    value={sauna.type}
                    onChange={(e) => handleInputChange(e, 'type')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="saunaDescription" className="form-label">Description</label>
                  <textarea
                    id="saunaDescription"
                    className="form-control"
                    placeholder='Description'
                    value={sauna.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="saunaPrice" className="form-label">Session Price</label>
                  <input
                    id="saunaPrice"
                    type='text'
                    className="form-control"
                    placeholder='Session Price'
                    value={sauna.price}
                    onChange={(e) => handleInputChange(e, 'price')}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Is Available?</label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type='radio'
                      name='is_available'
                      value={true}
                      checked={sauna.is_available === true}
                      onChange={(e) => handleInputChange(e, 'is_available')}
                      className="form-check-input"
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type='radio'
                      name='is_available'
                      value={false}
                      checked={sauna.is_available === false}
                      onChange={(e) => handleInputChange(e, 'is_available')}
                      className="form-check-input"
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>

                <Button
                  style={{ marginTop: '20px' }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleInputChange(e, 'image')}
                    multiple
                  />
                </Button>

                <div className="mt-3 d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" data-coreui-dismiss="modal">Close</button>
                  <button
                    type="button" className="btn btn-secondary" data-coreui-dismiss="modal"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={Register}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSaunaComponent;

