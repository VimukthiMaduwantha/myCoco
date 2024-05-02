import { Box } from '@mui/material'
import React from 'react'
import logo from '../Assets/coconut.png'

function Home() {
    return (
        <>
            <Box
                sx={{
                    height: 'calc(100vh - 60px)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    textAlign: 'center', // Center the content horizontally
                    marginTop: 'auto',   // Center the content vertically
                    marginBottom: 'auto' // Center the content vertically
                }}
            >
                <img
                    src={logo}
                    height='300vh'
                    width='300vw'
                />
            </Box >
        </>
    )
}

export default Home