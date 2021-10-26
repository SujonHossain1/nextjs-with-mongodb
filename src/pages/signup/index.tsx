import { Button, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useState } from 'react';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '10px 12px',
    border: '1px solid',
    marginTop: '25px',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

interface IData {
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const [data, setData] = useState<IData>({
        name: '',
        email: '',
        password: '',
    });

    const [msg, setMsg] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        console.log(`${name} ${value}`);
        setData((data) => ({
            ...data,
            [name]: value,
        }));
    };
    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const user = await res.json();
        setMsg(user.message);
    };
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
        >
            <Typography variant="h4" color="brown">
                Create an Account!!
            </Typography>

            <TextField
                label="Name"
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <BootstrapButton variant="contained" type="submit" disableRipple>
                Bootstrap
            </BootstrapButton>

            <br />

            <Typography variant="subtitle2" color="CaptionText">
                {msg}
            </Typography>
        </Box>
    );
};

export default SignUp;
