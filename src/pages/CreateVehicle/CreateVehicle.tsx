import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import ReactImageUploading from 'react-images-uploading';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button as MuiButton,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../../store/vehicles';
import { Vehicle } from '../../types/vehicle';
import { emailValidator, isNumber } from '../../utils';

type Error = {
  emailId?: string;
};
const required = (value: Vehicle) => (value ? undefined : 'Required');
// const minValue = min => value => isNaN(value) || value >= min ? undefined : 'Enter a Valid year';
// const composeValidators = (...validators) => value => {
//   validators.reduce((error, validator) => error || validator(value), undefined)
// }


export const CreateVehicle = () => {
  const [image, setImage] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (values: Vehicle) => {
    const newImage = image[0]?.data_url ?? '';
    const vehicle = { ...values, avatar: newImage };
    dispatch(addVehicle(vehicle));
    navigate('/');
  };

  const onChange = (img: any) => {
    setImage(img);
  };

  return (
    <Container>
      <Box sx={{ padding: '20px 0px' }}>
        <Typography variant="h6">Add New Vehicle Details</Typography>
      </Box>
      <Form
        onSubmit={onSubmit}
        validate={(values: any) => {
          const errors: Error = {};
          if (!values.emailId) errors.emailId = 'Required';
          else if (!emailValidator(values.emailId)) errors.emailId = 'Invalid Email';
          return errors;
        }}
        render={({ handleSubmit, form, pristine, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={12}>
                <Grid item xs={12}>
                  <Field fullWidth name="avatar">
                    {() => (
                      <ReactImageUploading
                        multiple
                        value={image}
                        onChange={onChange}
                        maxNumber={1}
                        dataURLKey="data_url"
                      >
                        {({ imageList, onImageUpdate, onImageRemove, onImageUpload }) => (
                          <div>
                            <Button variant="contained" onClick={onImageUpload}>
                              Upload
                            </Button>
                            {imageList.map((img: any, index: number) => (
                              <div key={index}>
                                <img src={img.data_url} alt="" width="100" />
                                <div>
                                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ReactImageUploading>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="Modal" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        label="Modal"
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="Milage" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Milage"
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="Make" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Make"
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="Year" validate={required}>
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Year"
                        error={meta.error && meta.touched && meta.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="emailId">
                    {({ input, meta }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        {...input}
                        error={meta?.error && meta.touched && meta?.error}
                        helperText={meta?.error && meta.touched && meta?.error}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton
                    disabled={pristine || submitting}
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Save
                  </MuiButton>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton
                    type="button"
                    color="error"
                    onClick={() => {
                      form.reset();
                      navigate('/');
                    }}
                    variant="contained"
                  >
                    Cancel
                  </MuiButton>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </Container>
  );
};
