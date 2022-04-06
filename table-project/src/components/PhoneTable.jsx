import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box'

const PhoneTable = (props) => {
    
    return (
        <Box>
            <Container component={Paper}  maxWidth="md" sx={{paddingTop: 2}} >
                <Stack direction="row" justifyContent="end" alignItems="center">
                    <Link to="/add" style={{ textDecoration: 'none'}}>
                        <Button variant="contained">Add Contact</Button>
                    </Link>
                </Stack>
                    <Table sx={{ minWidth: 450}} >
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.phoneContacts.map((phoneContact) => (
                                <TableRow
                                    key={phoneContact.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell>{phoneContact.firstName}</TableCell>
                                    <TableCell>{phoneContact.lastName}</TableCell>
                                    <TableCell>{phoneContact.phoneNumber}</TableCell>
                                    <TableCell sx={{width: "100px"}}>
                                        <Link
                                            to={{pathname:`/phonecontacts/${phoneContact.id}`}}
                                            state={{phoneContact: phoneContact}}
                                            style={{ textDecoration: 'none'}}
                                        >
                                            <Button
                                                variant="outlined"
                                                startIcon={<EditIcon/>}
                                                sx={{width: '100px'}}
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            onClick={ () => props.getPhoneContactId(phoneContact.id)}
                                            sx={{width: "100px"}}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </Container>
        </Box>
    );
}

export default PhoneTable;