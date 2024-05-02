import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik'
import * as Yup from "yup";
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

function UserRegistrationCompt({ dialogOpen, setDialogOpen, setUpdateID, updateID }) {
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        nic: '',
        mobile: '',
        email: '',
        password: '',
        cPassowrd: '',
        regNo: '',
        designation: 0
    })

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (updateID) {
            axios.get(`http://localhost:8000/User/getUSerByUserID/${updateID}`).then((res) => {
                setUserData({
                    ...userData,
                    name: res.data.UserDetails[0].name,
                    address: res.data.UserDetails[0].address,
                    nic: res.data.UserDetails[0].nic,
                    mobile: res.data.UserDetails[0].mobile,
                    email: res.data.UserDetails[0].email,
                    password: res.data.UserDetails[0].password,
                    cPassowrd: res.data.UserDetails[0].cPassowrd,
                    regNo: res.data.UserDetails[0].regNo
                })
                setIsUpdate(true);
            })
        }
    }, [updateID])

    function handleClose() {
        setDialogOpen(false);
        setUserData({
            ...userData,
            name: '',
            address: '',
            nic: '',
            mobile: '',
            email: '',
            password: '',
            cPassowrd: '',
            regNo: ''
        })
        setUpdateID();
        setIsUpdate(false);
    }

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        })
    }

    function SaveUser() {
        if (isUpdate) {
            const UpadteModel = {
                name: userData.name,
                address: userData.address,
                nic: userData.nic,
                mobile: userData.mobile,
                updateID: updateID

            }
            axios.put('http://localhost:8000/User/updateUser', UpadteModel).then((res) => {
                if (res.data.status === 'Success') {
                    handleClose();
                    toast.success("User updated successfully!!")
                }
            })
        } else {
            if (userData.password === userData.cPassowrd) {
                const saveModel = {
                    name: userData.name,
                    address: userData.address,
                    nic: userData.nic,
                    mobile: userData.mobile,
                    email: userData.email,
                    password: userData.password,
                    cPassowrd: userData.cPassowrd,
                    regNo: userData.regNo,
                    designation: userData.designation
                }

                axios.post('http://localhost:8000/User/createUser', saveModel).then((res) => {
                    if (res.data.ID) {
                        handleClose();
                        toast.success("User added successfully!!")
                    }
                })

            } else {
                toast.error("Please check the confirm password!!")
            }
        }
    }

    return (
        <>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={dialogOpen}
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {isUpdate ? 'Update User' : 'Add User'}
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
                                name: userData.name,
                                address: userData.address,
                                nic: userData.nic,
                                mobile: userData.mobile,
                                email: userData.email,
                                password: userData.password,
                                cPassowrd: userData.cPassowrd,
                                regNo: userData.regNo,
                                designation: userData.designation
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    name: Yup.string().required('Name is required'),
                                    address: Yup.string().required('address is required'),
                                    nic: Yup.string().required('nic is required'),
                                    regNo: Yup.string().required('regNo is required'),
                                    mobile: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits long'),
                                })
                            }
                            onSubmit={() => SaveUser()}
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
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.name && errors.name)}
                                                    helperText={touched.name && errors.name}
                                                    label="User Name *"
                                                    name='name'
                                                    value={userData.name}
                                                    id='name'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.address && errors.address)}
                                                    helperText={touched.address && errors.address}
                                                    label="Address *"
                                                    name='address'
                                                    value={userData.address}
                                                    id='address'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.nic && errors.nic)}
                                                    helperText={touched.nic && errors.nic}
                                                    label="NIC *"
                                                    name='nic'
                                                    value={userData.nic}
                                                    id='nic'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.mobile && errors.mobile)}
                                                    helperText={touched.mobile && errors.mobile}
                                                    label="Mobile No *"
                                                    name='mobile'
                                                    value={userData.mobile}
                                                    id='mobile'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.regNo && errors.regNo)}
                                                    helperText={touched.regNo && errors.regNo}
                                                    label="RegNo *"
                                                    name='regNo'
                                                    value={userData.regNo}
                                                    id='regNo'
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
                                                    error={Boolean(touched.email && errors.email)}
                                                    helperText={touched.email && errors.email}
                                                    label="Email *"
                                                    name='email'
                                                    value={userData.email}
                                                    id='email'
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
                                            {!isUpdate ?
                                                <>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            error={Boolean(touched.password && errors.password)}
                                                            helperText={touched.password && errors.password}
                                                            label="Password *"
                                                            name='password'
                                                            value={userData.password}
                                                            id='password'
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
                                                            error={Boolean(touched.cPassowrd && errors.cPassowrd)}
                                                            helperText={touched.cPassowrd && errors.cPassowrd}
                                                            label="Confirm Passowrd *"
                                                            name='cPassowrd'
                                                            value={userData.cPassowrd}
                                                            id='cPassowrd'
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
                                                </>
                                                : null}
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    select
                                                    error={Boolean(touched.designation && errors.designation)}
                                                    helperText={touched.designation && errors.designation}
                                                    label="Designation *"
                                                    name='designation'
                                                    value={userData.designation}
                                                    id='designation'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    onChange={(e) => handleChange(e)}
                                                    inputProps={{
                                                        readOnly: isUpdate
                                                    }}
                                                >
                                                    <MenuItem value='0'>Staff</MenuItem>
                                                    <MenuItem value='1'>Admin</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Button
                                                    variant="contained"
                                                    size='small'
                                                    fullWidth
                                                    type='submit'
                                                    color='success'
                                                >
                                                    {isUpdate ? 'Updatde' : 'Submit'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            )}

                        </Formik>
                    </Container>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default UserRegistrationCompt