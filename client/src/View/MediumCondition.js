import { Box, Card, CardHeader, Chip, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
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
import PlantDetailmanagementCompt from '../Components/PlantDetailmanagementCompt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MediumCompt from '../Components/MediumCompt';

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

function MediumCondition() {
    const [pageTitle, setpageTitle] = useState("Medium Condition Management");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [mediumDetails, setMediumDetails] = useState([]);
    console.log("mediumDetails::> ", mediumDetails)
    const [imagePreview, setImagePreview] = useState(false);
    const [img, setImg] = useState();
    const [updateID, setUpdateID] = useState();

    const regNo = localStorage.getItem('regNo')
    console.log("regNo:> ", regNo)

    useEffect(() => {
        GetAllMediumDetails();
    }, [])

    useEffect(() => {
        if (!dialogOpen) {
            GetAllMediumDetails();
        }
    }, [dialogOpen])

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mediumDetails.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleClick() {
        setDialogOpen(true);
    }

    function GetAllMediumDetails() {
        axios.get(`http://localhost:8000/Medium/getAllMediumForUser/${regNo}`).then((res) => {
            if (res.data.MediumDetails.length > 0) {
                setMediumDetails(res.data.MediumDetails);
            } else {
                toast.error("No record to display!!");
            }
        })
    }

    function imageView(img) {
        setImagePreview(true);
        setImg(img);
    }

    function imgClose() {
        setImagePreview(false);
        setImg();
    }

    function UpdateRowData(id) {
        setUpdateID(id);
        setDialogOpen(true);
    }



    function cardTitle(titleName) {
        return (
            <Grid container spacing={1}>
                <Grid item md={11} xs={11}>
                    {titleName}
                </Grid>
                <Grid item md={1} xs={1}>
                    <Box display='flex' justifyContent='flex-end' alignItems='center' >
                        <Tooltip title="Add Medium">
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
                        <br />
                        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>#</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Note</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Made Date</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>No Days</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? mediumDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : mediumDetails
                                ).map((row, i) => (
                                    <TableRow key={row._id}>
                                        <TableCell align='center'>{i + 1}</TableCell>
                                        <TableCell align='center'>{row.note}</TableCell>
                                        <TableCell align='center'>{row.quantity}</TableCell>
                                        <TableCell align='center'>{row.madeDate}</TableCell>
                                        <TableCell align='center'> <Chip label={Math.round((new Date().getTime() - new Date(row.madeDate).getTime()) / (1000 * 3600 * 24))} sx={{ background: '#819830' }} size='small' /></TableCell>
                                        <TableCell align='center'>
                                            <IconButton>
                                                <RemoveRedEyeIcon sx={{ color: 'black' }} onClick={() => imageView(row.image)} />
                                            </IconButton>
                                            &nbsp;
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
                                        count={mediumDetails.length}
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
                        </Table>
                    </TableContainer>
                </Card>
            </Box>

            {/* Medium managemnet componnet */}
            <MediumCompt
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                updateID={updateID}
                setUpdateID={setUpdateID}
            />

            {/* Image preview */}
            <Dialog
                open={imagePreview}
                onClose={imgClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <img
                        src={`http://localhost:8000/assets/MediumImages/${img}`}
                        width='280vw'
                        height='350vh'
                    />
                </DialogContent>
            </Dialog>

        </>
    )
}

export default MediumCondition