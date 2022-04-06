import React, { useState } from "react";
import {Typography, Grid} from "@mui/material";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';

const PhoneMask = React.forwardRef(function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+(00) 000 000 000 000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
});


const ItemDetails = (props) => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [id, setId] = useState(location.state.phoneContact.id);
    const [firstName, setFirstName] = useState(location.state.phoneContact.firstName);
    const [lastName, setLastName] = useState(location.state.phoneContact.lastName);
    const [phoneNumber, setPhoneNumber] = useState(location.state.phoneContact.phoneNumber);
    const [errors, setErrors] = useState({firstName: "", lastName: "", phoneNumber: ""});

    const validate = () => {
        let temp = {};
        temp.firstName = firstName ? "" : "This field is required";
        temp.lastName = lastName ? "" : "This field is required";
        temp.phoneNumber = phoneNumber.length >= 15 ? "" : "This field is required";
        setErrors({...temp})

        return Object.values(temp).every(x => x === "");
    }

    const saveButtonHanlder = (e) => {
        e.preventDefault();
        if(!validate()) {
            return;
        }
        const val = {
            id,
            firstName,
            lastName,
            phoneNumber
        }
        props.updatePhoneContactsHandler(val);

        navigate("/");
    }
    
    return (
        <Grid>
            <Container sx={{marginBottom: '10px'}}maxWidth="xs" component={Paper} variant="outlined">
                <Stack spacing={2} my={2}>
                        <Typography variant="h5">Edit</Typography>
                        <TextField
                            variant="standard"
                            value={firstName}
                            label={"First Name"}
                            onChange={(e) => {setFirstName(e.target.value)}}
                            error={errors.firstName.length > 0}
                            helperText={errors.firstName}
                            InputLabelProps={{
                                style: {
                                    marginLeft: '14px'
                                }
                            }}
                            sx={{px: '14px'}}
                            inputProps={{ maxLength: 30 }}
                        />
                        <TextField
                            variant="standard"
                            value={lastName}
                            label={"Last Name"}
                            onChange={(e) => {setLastName(e.target.value)}}
                            error={errors.lastName.length > 0}
                            helperText={errors.lastName}
                            InputLabelProps={{
                                style: {
                                    marginLeft: '14px'
                                }
                            }}
                            sx={{px: '14px'}}
                            inputProps={{ maxLength: 35 }}
                        />
                        <FormControl sx={{px: '14px'}}>
                             <InputLabel error={errors.phoneNumber.length > 0} >Phone Number</InputLabel>
                                <Input
                                    error={errors.phoneNumber.length > 0}
                                    value={phoneNumber}
                                    onChange={ (e) => setPhoneNumber(e.target.value)}
                                    inputComponent={PhoneMask} 
                                    
                                />
                            {(errors.phoneNumber)?  (
                            <Typography
                                variant="h6"
                                sx={{color: '#d32f2f', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: '400', fontSize: '0.75rem', mt: '3px'}}>
                                Phone Number must be at least 9 digits long (plus 2 digits for country code).
                            </Typography>
                            ) : <div></div>
                            }
                        </FormControl>
                </Stack>
                <Stack direction="row" spacing={2} mb={1.5} px={2}  justifyContent="flex-end">

                            <Link to="/" style={{ textDecoration: 'none'}}>
                                <Button sx={{width: '100px'}} variant="outlined" size="medium">
                                    Cancel
                                </Button>
                            </Link>
                        

                            <Button onClick={saveButtonHanlder} sx={{width: '100px'}} variant="contained" size="medium">
                                Save
                            </Button>
                        
                    </Stack>
            </Container>
            
        </Grid>
    )
}

export default ItemDetails;