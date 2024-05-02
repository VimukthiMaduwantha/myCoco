import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik'
import * as Yup from "yup";
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

function TaskMangementCompt({ dialogOpen, setDialogOpen, updateID, setUpdateID }) {
    const [taskData, setTaskData] = useState({
        taskDetails: '',
        taskDate: new Date().toISOString().substring(0, 10)
    })
    const [taskID, setTaskID] = useState();
    const [isUpdate, setIsUpdate] = useState(false);

    const user = localStorage.getItem('name')
    const regNo = localStorage.getItem('regNo')

    useEffect(() => {
        if (dialogOpen) {
            GenerataTaskID();
        }
    }, [dialogOpen])

    useEffect(() => {
        if (updateID) {
            axios.get(`http://localhost:8000/Task/getTaskDetailsByID/${updateID}`).then((res) => {
                setIsUpdate(true);
                setTaskID(res.data.task[0].taskID);
                setTaskData({
                    ...taskData,
                    taskDetails: res.data.task[0].taskDetails,
                    taskDate: res.data.task[0].taskDate
                })
            })
        }
    }, [updateID])

    function handleClose() {
        setTaskData({
            ...taskData,
            taskDetails: '',
        })
        setTaskID();
        setDialogOpen(false);
        setIsUpdate(false);
        setUpdateID()
    }

    function GenerataTaskID() {
        if (!isUpdate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear().toString().slice(-2);
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const date = currentDate.getDate().toString().padStart(2, '0');
            const hour = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const itemCode = `CC${year}${month}${date}${hour}${minutes}${seconds}`;
            setTaskID(itemCode);
        }
    }

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setTaskData({
            ...taskData,
            [e.target.name]: value
        })
    }

    function SaveTask() {
        if (isUpdate) {
            const UpdateModel = {
                taskDetails: taskData.taskDetails,
                updateID: updateID
            }
            axios.put('http://localhost:8000/Task/updateTask', UpdateModel).then((res) => {
                if (res.data.status) {
                    handleClose();
                    toast.success("Task updated successfully!!")
                }
            })
        } else {
            const saveModel = {
                taskDetails: taskData.taskDetails,
                taskDate: taskData.taskDate,
                taskID: taskID,
                creaetdByName: user,
                createByRegNo: regNo
            }

            console.log("saveModel", saveModel)
            axios.post('http://localhost:8000/Task/createTask', saveModel).then((res) => {
                if (res.data.ID) {
                    handleClose();
                    toast.success("Daily task successfully uploaded!!")
                }
            })
        }
    }

    function Cleardata() {
        setTaskData({
            ...taskData,
            taskDetails: ''
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
                    {isUpdate ? 'Update Task' : 'Add Task'}

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
                                taskDetails: taskData.taskDetails,
                                taslDate: taskData.taskDate
                            }}

                            validationSchema={
                                Yup.object().shape({
                                    taskDetails: Yup.string().required('Task details is required'),
                                })
                            }
                            onSubmit={() => SaveTask()}
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
                                                    value={taskID}
                                                    id='name'
                                                    variant="outlined"
                                                    size="small"
                                                    type='text'
                                                    color='success'
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    size='small'
                                                    name="taskDate"
                                                    type="date"
                                                    value={taskData.taskDate}
                                                    variant="outlined"
                                                    id="taskDate"
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    error={Boolean(touched.taskDetails && errors.taskDetails)}
                                                    helperText={touched.taskDetails && errors.taskDetails}
                                                    label="Task Details *"
                                                    name='taskDetails'
                                                    value={taskData.taskDetails}
                                                    id='taskDetails'
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
                                                        onClick={() => Cleardata()}
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
            </Dialog >
        </>
    )
}

export default TaskMangementCompt