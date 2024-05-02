import { Box, Card, CardHeader, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import TaskMangementCompt from '../Components/TaskMangementCompt';
import { toast } from 'react-toastify';


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function DailyTaskManagement() {
    const [pageTitle, setpageTitle] = useState("Task Management");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [taskDetails, setTaskDetails] = useState([]);
    const [updateID, setUpdateID] = useState();

    const regNo = localStorage.getItem('regNo')

    useEffect(() => {
        setTaskDetails([])
        GetAlltaskDetails();
    }, [date])

    useEffect(() => {
        if (!dialogOpen) {
            GetAlltaskDetails();
        }
    }, [dialogOpen])

    function handleClick() {
        setDialogOpen(true);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taskDetails.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function GetAlltaskDetails() {
        axios.get(`http://localhost:8000/Task/getAllTasks/${date}/${regNo}`).then((res) => {
            if (res.data.TaskDetails.length > 0) {
                setTaskDetails(res.data.TaskDetails);
            } else {
                toast.error("No record to display!!")
            }
        })
    }

    function UpdateRowData(id) {
        setDialogOpen(true);
        setUpdateID(id);
    }

    function cardTitle(titleName) {
        return (
            <Grid container spacing={1}>
                <Grid item md={11} xs={11}>
                    {titleName}
                </Grid>
                <Grid item md={1} xs={1}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center' >
                        <Tooltip title="Add Tasks">
                            <IconButton>
                                <AddCircleOutlineIcon onClick={() => handleClick()} sx={{ color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Box sx={{ height: 'calc(100vh-60px)', width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Card sx={{ padding: '10px', width: '86vw' }}>
                    <CardHeader
                        title={cardTitle(pageTitle)}
                        sx={{ fontWeight: 'bold', }}
                    />
                    <Divider />
                    <br />
                    <TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField
                                id="input-with-sx"
                                variant="standard"
                                value={date}
                                type='date'
                                color='success'
                                name='date'
                                onChange={(e) => { setDate(e.target.value) }}
                                inputProps={{
                                    max: new Date().toISOString().split('T')[0]
                                }}
                            />
                        </Box>
                        <br />
                        {taskDetails.length > 0 ?
                            <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>#</TableCell>
                                        <TableCell align='center'>Task ID</TableCell>
                                        <TableCell align='center'>Task Content</TableCell>
                                        <TableCell align='center'>Task Date</TableCell>
                                        <TableCell align='center'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? taskDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : taskDetails
                                    ).map((row, i) => (
                                        <TableRow key={row._id}>
                                            <TableCell align='center'>{i + 1}</TableCell>
                                            <TableCell align='center'>{row.taskID}</TableCell>
                                            <TableCell align='center'>{row.taskDetails}</TableCell>
                                            <TableCell align='center'>{row.taskDate}</TableCell>
                                            <TableCell align='center'>
                                                <IconButton>
                                                    <CreateIcon sx={{ color: 'black' }} onClick={() => UpdateRowData(row._id)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={7}
                                            count={taskDetails.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                },
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table> : null}
                    </TableContainer>
                </Card>
            </Box>

            {/* Task mangent component */}
            <TaskMangementCompt
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                updateID={updateID}
                setUpdateID={setUpdateID}
            />
        </>
    )
}

export default DailyTaskManagement