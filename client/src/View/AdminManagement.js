import { Tab, Tabs, Typography, Box } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import UserRegistration from '../Components/UserRegistration';
import TaskManagement from '../Components/TaskManagement';
import PlantManagement from '../Components/PlantManagement';
import MediumManagement from '../Components/MediumManagement';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AdminManagement() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: 'calc(100vh - 60px)', width: '100%' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: '10vw' }}
            >
                <Tab label="User Management" sx={{ fontWeight: 'bold', }} {...a11yProps(0)} />
                <Tab label="Task Management" sx={{ fontWeight: 'bold', }} {...a11yProps(1)} />
                <Tab label="Plant Management" sx={{ fontWeight: 'bold', }} {...a11yProps(2)} />
                <Tab label="Medium Management" sx={{ fontWeight: 'bold', }} {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <UserRegistration />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TaskManagement />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PlantManagement />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MediumManagement />
            </TabPanel>
        </Box >
    );
}
