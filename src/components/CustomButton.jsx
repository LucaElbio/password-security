import React from 'react';
import { Button } from '@mui/material';

export default function CustomButton({icon, action}) {
    return (
        <Button
            variant="outlined"
            onClick={() => action()}
            sx={{ height: '56px', ml:'15px', color: 'white', borderColor: 'white'}}
        >
            {icon}
        </Button>
    );
}