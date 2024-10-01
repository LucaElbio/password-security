import { Box, LinearProgress} from '@mui/material';
export default function PasswordStrengthBar({ strength, color }) {
    return (
        <Box sx={{ width: '40%', mt: "20px", mb: "10px", display: strength == -1 ? "none" : "block" }}>
            <LinearProgress
                variant="determinate"
                value={strength}
                sx={{
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        backgroundColor: color,
                    },
                }}
            />
        </Box>
    );
}