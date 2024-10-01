import { useState } from 'react';
import { Grid2, Stack, TextField, Alert, Typography, Slide } from '@mui/material';
import { AutoAwesome, ContentCopy, RemoveRedEye, VisibilityOff } from '@mui/icons-material';

import PasswordStrengthBar from './PasswordStrengthBar';
import CustomButton from './CustomButton';

export default function SecurityLevel() {
    const [password, setPassword] = useState("")
    const [inputType, setInputType] = useState("password")
    const [strength, setStrength] = useState(-1)
    const [color, setColor] = useState("#FFFFFF")
    const [strengthText, setStrengthText] = useState("")
    const [showAlert, setShowAlert] = useState(false);

    function changePassword(pwd) {
        setPassword(pwd)
        calculateSecurityLevel(pwd)
    }

    function changeInputType() {
        setInputType(inputType === "password" ? "text" : "password")
    }

    function calculateSecurityLevel(password) {
        let level = 0
        if (password.length >= 8) level += 10
        if (password.length >= 16) level += 15
        if (/\d/.test(password)) level += 15
        if (/[A-Z]/.test(password)) level += 15
        if (/[a-z]/.test(password)) level += 5
        if (/[`·!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)) level += 20
        if (/[ñÑ]/.test(password)) level += 20
        level = parseInt(level / 20) * 20
        setStrength(level)
        let strengthText = ""
        let color = ""
        switch (level) {
            case 0:
                strengthText = "Very weak"
                color = "#db2e2e"
                break;
            case 20:
                strengthText = "Weak"
                color = "#de6535"
                break;
            case 40:
                strengthText = "Normal"
                color = "#c9a908"
                break;
            case 60:
                strengthText = "Secure"
                color = "#84c423"
                break;
            case 80:
                strengthText = "Very secure"
                color = "#5cd647"
                break;
            case 100:
                strengthText = "Unbreakable"
                color = "#2fbaa8"
                break;
            default:
                break;
        }

        setStrengthText(`${strengthText} password`)
        setColor(color)
    }

    function copyToClipboard() {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return navigator.clipboard.writeText(password)
    }

    function generatePassword() {
        const lowercase = 'abcdefghijklmnñopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?/';
        const ultraSecretHash = 'ñÑ'

        let password = [
            lowercase[Math.floor(Math.random() * lowercase.length)],
            uppercase[Math.floor(Math.random() * uppercase.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            specialChars[Math.floor(Math.random() * specialChars.length)],
            ultraSecretHash[Math.floor(Math.random() * ultraSecretHash.length)]
        ];

        const allChars = lowercase + uppercase + numbers + specialChars + ultraSecretHash;

        for (let i = password.length; i < 20; i++) {
            password.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }
        password = password.sort(() => Math.random() - 0.5);
        return changePassword(password.join(''));
    }


    return (
        <Stack>
            <Grid2 container direction="column" spacing={2} alignItems="center">
                <Typography textAlign={'center'} color='#ffffff' fontWeight={'bold'}>
                    This app calculates your password security level. Please, type it and let's find out if you are hackable or not.
                </Typography>
                <Grid2 item display={'flex'} justifyContent={'center'} alignItems="center">
                    <TextField
                        label="Password"
                        placeholder="Type your password"
                        type={inputType}
                        variant="outlined"
                        value={password}
                        onChange={(e) => changePassword(e.target.value.toString().replace(" ", ""))}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: "#FFFFFF",
                                },
                                '&:hover fieldset': {
                                    borderColor: "#FFFFFF",
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: "#FFFFFF",
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: { color },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: { color },
                            },
                            '& .MuiOutlinedInput-input': {
                                color: { color },
                            },
                        }}
                    />
                    <CustomButton icon={inputType === "password" ? <RemoveRedEye /> : <VisibilityOff />} action={changeInputType} />
                    <CustomButton icon={<ContentCopy />} action={copyToClipboard} />
                    <CustomButton icon={<AutoAwesome />} action={generatePassword} />
                </Grid2>

                <PasswordStrengthBar strength={strength} color={color} />
                <Grid2 item>
                    <Typography color={color} fontWeight={'bold'}>{strengthText}</Typography>
                </Grid2>
            </Grid2>
            {showAlert && (
                <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
                    <Alert
                        sx={{
                            position: 'absolute',
                            bottom: 30,
                            right: 30,
                            transition: 'all 0.3s ease-in-out', // Transición suave
                            opacity: showAlert ? 1 : 0
                        }}
                        severity="success"
                    >
                        Password copied to clipboard.
                    </Alert>
                </Slide>
            )}
        </Stack>
    );
}