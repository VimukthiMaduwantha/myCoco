import React, { useState } from 'react'
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    TextField
} from '@mui/material'
import { Formik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserLogin() {
    const navigate = useNavigate();
    const [UserLogin, setUserLogin] = useState({
        userName: '',
        password: ''
    })

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setUserLogin({
            ...UserLogin,
            [e.target.name]: value
        })
    }

    function LoginUser() {
        const loginModel = {
            userName: UserLogin.userName,
            password: UserLogin.password
        }

        axios.post('http://localhost:8000/User/loginUser', loginModel).then((res) => {
            if (res.data.user == null) {
                toast.error("Login Failed!!")
            } else {
                if (res.data.user._id) {
                    localStorage.setItem('user', res.data.token);
                    localStorage.setItem('role', res.data.user.designation);
                    localStorage.setItem('regNo', res.data.user.regNo);
                    localStorage.setItem('name', res.data.user.name);
                    navigate('/')
                }
            }

        })
    }

    return (
        <>
            <Box sx={{ height: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ width: '40%', padding: '20px' }}>
                    <Container maxWidth={false}>
                        <Formik
                            initialValues={{
                                userName: UserLogin.userName,
                                password: UserLogin.password
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    userName: Yup.string().required('User Name is required'),
                                    password: Yup.string().required('Password is required')
                                })
                            }

                            onSubmit={() => LoginUser()}
                            enableReinitialize
                        >
                            {({ errors,
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
                                                    error={Boolean(touched.userName && errors.userName)}
                                                    helperText={touched.userName && errors.userName}
                                                    name='userName'
                                                    value={UserLogin.userName}
                                                    placeholder='User Name'
                                                    variant="outlined"
                                                    color='success'
                                                    size='small'
                                                    type='text'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    helperText={touched.password && errors.password}
                                                    name='password'
                                                    value={UserLogin.password}
                                                    placeholder='Password'
                                                    variant="outlined"
                                                    color='success'
                                                    size='small'
                                                    type='text'
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Button
                                                    variant='contained'
                                                    type='submit'
                                                    color='success'
                                                    size='small'
                                                    fullWidth
                                                >
                                                    Login
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Container>
                </Card>
            </Box>
        </>
    )
}

export default UserLogin