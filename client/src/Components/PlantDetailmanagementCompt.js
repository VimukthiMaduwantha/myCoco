import { Box, Button, Card, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik'
import * as Yup from "yup";
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import logo from '../Assets/cooc.png'

function PlantDetailmanagementCompt({ dialogOpen, setDialogOpen, setUpdateID, updateID }) {
    const inputRef = useRef(null);
    const [plantData, setPlantData] = useState({
        plantID: '',
        note: '',
        status: 0,
        plantDate: new Date().toISOString().substring(0, 10)
    })
    const [image, setImage] = useState();
    const [imgView, setImgView] = useState();
    const [isUpdate, setIsUpdate] = useState(false)

    const user = localStorage.getItem('name')
    const regNo = localStorage.getItem('regNo')

    useEffect(() => {
        if (updateID) {
            GetUpdateDetailsByUpdateID();
        }
    }, [updateID])


    function handleClose() {
        setDialogOpen(false);
        setImage();
        setImgView();
        setPlantData({
            ...plantData,
            plantID: '',
            note: '',
            status: 0,
        })
        setIsUpdate(false);
        setUpdateID();
    }

    function uploadImage(e) {
        setImage(e.target.files[0]);
        setImgView(URL.createObjectURL(e.target.files[0]))
    }

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setPlantData({
            ...plantData,
            [e.target.name]: value
        })
    }

    function SavePlant() {
        if (isUpdate) {
            const UpdateModel = {
                note: plantData.note,
                status: plantData.status,
                updateID: updateID
            }
            axios.put('http://localhost:8000/Plant/updatePlant', UpdateModel).then((res) => {
                if (res.data.status == 'Success') {
                    handleClose();
                }
            })

        } else {
            if (image) {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 6 * 7);
                const formattedFutureDate = futureDate.toISOString().split('T')[0];

                const formData = new FormData();
                formData.append('plantID', plantData.plantID);
                formData.append('note', plantData.note);
                formData.append('status', plantData.status);
                formData.append('plantDate', plantData.plantDate);
                formData.append('subCultureDate', formattedFutureDate);
                formData.append('creaetdByName', user);
                formData.append('createByRegNo', regNo);
                formData.append('files', image);

                axios.post('http://localhost:8000/Plant/createPlant', formData).then((res) => {
                    if (res.data.ID) {
                        toast.success("Plant details successfully added!!")
                        handleClose();
                    }
                })
            } else {
                toast.error("Please upload image!!");
            }
        }
    }

    function GetUpdateDetailsByUpdateID() {
        axios.get(`http://localhost:8000/Plant/getPlantUpdateDetails/${updateID}`).then((res) => {
            if (res.data.plantss.length > 0) {
                setImgView(res.data.plantss[0].image);
                setPlantData({
                    ...plantData,
                    plantID: res.data.plantss[0].plantID,
                    note: res.data.plantss[0].note,
                    status: res.data.plantss[0].status,
                    plantDate: res.data.plantss[0].plantDate
                })
                setIsUpdate(true);
            }
        })
    }

    function CleatDeatils() {
        setPlantData({
            ...plantData,
            plantID: '',
            note: '',
            status: 0,
        })
    }
    return (
        <>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={dialogOpen}
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {isUpdate ? 'Update Plant Details' : 'Add Plant Details'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
                <DialogContent dividers>
                    <Container maxWidth={false}>
                        <Formik
                            initialValues={{
                                plantID: plantData.plantID,
                                note: plantData.note,
                                status: plantData.status,
                                plantDate: plantData.plantDate
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    plantID: Yup.string().required('Plant ID is required'),
                                    note: Yup.string().required('Note is required'),
                                })
                            }

                            onSubmit={() => SavePlant()}
                            enableReinitialize
                        >
                            {({
                                errors,
                                handleBlur,
                                handleSubmit,
                                touched
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box mt={0}>
                                        <Grid container spacing={2}>
                                            {isUpdate ?
                                                <Grid item md={12} xs={12}>
                                                    <center>
                                                        <img
                                                            src={`http://localhost:8000/assets/PlantImages/${imgView}`}
                                                            width='120vw'
                                                            height='120vh'
                                                        />
                                                    </center>
                                                </Grid> :
                                                <Grid item md={12} xs={12}>
                                                    <center>
                                                        {image ?
                                                            <img
                                                                src={imgView}
                                                                width='120vw'
                                                                height='120vh'
                                                            />
                                                            :
                                                            <img
                                                                src={logo}
                                                                width='120vw'
                                                                height='120vh'
                                                            />
                                                        }
                                                    </center>
                                                    <input
                                                        ref={inputRef}
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={(e) => uploadImage(e)}
                                                    />
                                                </Grid>
                                            }
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.plantID && errors.plantID)}
                                                    helperText={touched.plantID && errors.plantID}
                                                    label="PlantID *"
                                                    name='plantID'
                                                    value={plantData.plantID}
                                                    id='plantID'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                    inputProps={{
                                                        readOnly: isUpdate
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size='small'
                                                    name="plantDate"
                                                    type="date"
                                                    value={plantData.plantDate}
                                                    variant="outlined"
                                                    id="plantDate"
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                    color='success'
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    select
                                                    error={Boolean(touched.status && errors.status)}
                                                    helperText={touched.status && errors.status}
                                                    label="Status *"
                                                    name='status'
                                                    value={plantData.status}
                                                    id='status'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                    <MenuItem value='0'>Select a Status</MenuItem>
                                                    <MenuItem value='Good'>Good</MenuItem>
                                                    <MenuItem value='Disease'>Disease</MenuItem>
                                                    <MenuItem value='Media Contimination'>Media Contimination</MenuItem>
                                                </TextField>
                                            </Grid>

                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.note && errors.note)}
                                                    helperText={touched.note && errors.note}
                                                    label="Task Details *"
                                                    name='note'
                                                    value={plantData.note}
                                                    id='note'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {isUpdate ? null :
                                                    <Button
                                                        variant="contained"
                                                        size='small'
                                                        fullWidth
                                                        color='success'
                                                        onClick={() => CleatDeatils()}
                                                    >
                                                        Clear
                                                    </Button>
                                                }
                                                &nbsp;
                                                <Button
                                                    variant="contained"
                                                    size='small'
                                                    fullWidth
                                                    type='submit'
                                                    color='success'
                                                >
                                                    {isUpdate ? 'Update' : 'Submit'}
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PlantDetailmanagementCompt