import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NextPage, NextPageContext } from 'next';
import * as React from 'react';
import { IVehicle } from 'types';

interface IProps {
    success: boolean;
    data: IVehicle[];
    message: string;
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Vehicle: NextPage<IProps> = ({ success, data, message }: IProps) => {
    return (
        <Container maxWidth="md" style={{ marginTop: '10px' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Owner Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.brand}
                                </TableCell>
                                <TableCell>{row.model}</TableCell>
                                <TableCell>{row.ownerId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

Vehicle.getInitialProps = async (context: NextPageContext): Promise<IProps> => {
    const res = await fetch('http://localhost:3000/api/vehicle');
    const data: IProps = await res.json();
    return {
        success: data?.success,
        data: data?.data,
        message: data?.message,
    };
};

export default Vehicle;
