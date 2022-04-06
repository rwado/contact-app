import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const SimpleAppBar = () => {
    return (
        <Box mb={4}>
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>Phone Book</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default SimpleAppBar;