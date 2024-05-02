import { Box, Button, Card, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik'
import * as Yup from "yup";
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import logo from '../Assets/cooc.png'

function MediumCompt({ dialogOpen, setDialogOpen, setUpdateID, updateID }) {
    const inputRef = useRef(null);
    const [mediumData, setMediumData] = useState({
        note: '',
        quantity: '',
        madeDate: new Date().toISOString().substring(0, 10)
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
        setMediumData({
            ...mediumData,
            note: '',
            quantity: '',
            madeDate: new Date().toISOString().substring(0, 10)
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
        setMediumData({
            ...mediumData,
            [e.target.name]: value
        })
    }

    function SaveMedium() {
        if (isUpdate) {
            const UpdateModel = {
                quantity: mediumData.quantity,
                madeDate: mediumData.madeDate,
                note: mediumData.note,
                updateID: updateID
            }
            axios.put('http://localhost:8000/Medium/updateMedium', UpdateModel).then((res) => {
                if (res.data.status == 'Success') {
                    handleClose();
                }
            })
        } else {
            if (image) {
                const formData = new FormData();
                formData.append('note', mediumData.note);
                formData.append('quantity', mediumData.quantity);
                formData.append('madeDate', mediumData.madeDate);
                formData.append('creaetdByName', user);
                formData.append('createByRegNo', regNo);
                formData.append('files', image);

                axios.post('http://localhost:8000/Medium/createMedium', formData).then((res) => {
                    if (res.data.ID) {
                        toast.success("Medium details successfully added!!")
                        handleClose();
                    }
                })
            } else {
                toast.error("Please Upload Image!!");
            }
        }
    }

    function GetUpdateDetailsByUpdateID() {
        axios.get(`http://localhost:8000/Medium/getUpdateDetails/${updateID}`).then((res) => {
            if (res.data.medium.length > 0) {
                setImgView(res.data.medium[0].image);
                setMediumData({
                    ...mediumData,
                    note: res.data.medium[0].note,
                    quantity: res.data.medium[0].quantity,
                    madeDate: res.data.medium[0].madeDate
                })
                setIsUpdate(true);
            }
        })
    }

    function ClearData() {
        setMediumData({
            ...mediumData,
            note: '',
            quantity: '',
            madeDate: new Date().toISOString().substring(0, 10)
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
                    {isUpdate ? 'Update Medium Details' : 'Add Medium Details'}
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
                                note: mediumData.note,
                                quantity: mediumData.quantity,
                                madeDate: mediumData.madeDate
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    note: Yup.string().required('Note is required'),
                                    quantity: Yup.string().required('Quantity is required'),
                                })
                            }

                            onSubmit={() => SaveMedium()}
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
                                                            src={`http://localhost:8000/assets/MediumImages/${imgView}`}
                                                            width='120vw'
                                                            height='120vh'
                                                        />
                                                    </center>
                                                </Grid>
                                                :
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
                                                    error={Boolean(touched.quantity && errors.quantity)}
                                                    helperText={touched.quantity && errors.quantity}
                                                    size='small'
                                                    name="quantity"
                                                    type="text"
                                                    label="Quantity *"
                                                    value={mediumData.quantity}
                                                    variant="outlined"
                                                    id="quantity"
                                                    onChange={(e) => handleChange(e)}
                                                    color='success'
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size='small'
                                                    name="madeDate"
                                                    type="date"
                                                    value={mediumData.madeDate}
                                                    variant="outlined"
                                                    id="madeDate"
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                    inputProps={{
                                                        max: new Date().toISOString().split('T')[0]
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.note && errors.note)}
                                                    helperText={touched.note && errors.note}
                                                    label="Used Media Note *"
                                                    name='note'
                                                    value={mediumData.note}
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
                                                        onClick={() => ClearData()}
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

export default MediumCompt