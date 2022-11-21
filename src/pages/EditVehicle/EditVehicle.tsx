import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
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
import { Vehicle } from '../../types/vehicle';
import { emailValidator, isNumber } from '../../utils';
import { selectVehicles, updateVehicle } from '../../store/vehicles';

type Error = {
  emailId?: string;
};
const required = (value: Vehicle) => (value ? undefined : 'Required');

export const EditVehicle = () => {
  const { id } = useParams();
  const vehicles = useSelector(selectVehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let vehicle: { Modal: any; avatar?: string | undefined; Milage: any; emailId: any };
  const [image, setImage] = useState<any[]>([]);
  const onSubmit = (values: Vehicle) => {
    const newImage = image[0]?.data_url ?? vehicle?.avatar;
    const updatedVehicle = { ...values, avatar: newImage };
    dispatch(updateVehicle(updatedVehicle));
    navigate('/');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    vehicle = vehicles.filter((u) => u.emailId === id)[0];
  }, []);

  const onChange = (img: any) => {
    setImage(img);
  };

  return (
    <Container>
      <Box sx={{ padding: '20px 0px' }}>
        <Typography variant="h6">Edit Vehicle</Typography>
      </Box>
      <Form
        onSubmit={onSubmit}
        validate={(values: any) => {
          const errors: Error = {};
          if (!values.emailId) errors.emailId = 'Required';
          else if (!emailValidator(values.emailId)) errors.emailId = 'Invalid Email';
          return errors;
        }}
        render={({ handleSubmit, form }) => (
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
                            <Grid item>
                              {vehicle?.avatar && <img width="100" src={vehicle?.avatar} />}
                            </Grid>
                            <Grid>
                              {image.length < 1 && (
                                <Button variant="contained" onClick={onImageUpload}>
                                  Update
                                </Button>
                              )}
                            </Grid>
                            {imageList.map((img: any, index: number) => (
                              <div key={index}>
                                <img src={img.data_url} alt="" width="100" />
                                <Grid item>
                                  <Button variant="contained" onClick={() => onImageUpdate(index)}>
                                    Update
                                  </Button>
                                  <Button
                                    sx={{ marginLeft: 2 }}
                                    variant="contained"
                                    color="error"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Grid>
                              </div>
                            ))}
                          </div>
                        )}
                      </ReactImageUploading>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{ paddingTop: '50px' }}>
                  <Field fullWidth name="Modal" validate={required} defaultValue={vehicle?.Modal}>
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
                  <Field fullWidth name="Milage" validate={required} defaultValue={vehicle?.Milage}>
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
                  <Field fullWidth name="Make" validate={required} defaultValue={vehicle?.Milage}>
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
                  <Field fullWidth name="Year" validate={required} defaultValue={vehicle?.Milage}>
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
                  <Field fullWidth name="emailId" defaultValue={vehicle?.emailId}>
                    {({ input }) => <TextField fullWidth disabled label="Email" {...input} />}
                  </Field>
                </Grid>
                <Grid item style={{ paddingTop: '50px' }}>
                  <MuiButton type="submit" variant="contained" onClick={handleSubmit}>
                    Update
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
