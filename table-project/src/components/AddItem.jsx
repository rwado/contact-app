import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



const PhoneMask = React.forwardRef(function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+00 000 000 000 000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
});




const AddItem = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("48");
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState({firstName: "", lastName: "", phoneNumber: ""});

    const validate = () => {
        let temp = {};
        temp.firstName = firstName ? "" : "This field is required";
        temp.lastName = lastName ? "" : "This field is required";
        temp.phoneNumber = phoneNumber.length >= 15 ? "" : "This field is required";
        setErrors({...temp})

        return Object.values(temp).every(x => x === "");
    }

    const handleClose = () => {
        setOpen(false);
    };

    const toggleConfirmationMessage = (event) => {
        setChecked(event.target.checked);
    };
    

    const saveButtonHandler = (e) => {
        e.preventDefault();

        if(!validate()) {
            return;
        }

        const id = uuid();
        const val = {
            id,
            firstName,
            lastName,
            phoneNumber
        }
        
        props.addPhoneContactHandler(val);
        if(!checked) {
            setOpen(true);
        }
        
        clearState();
    

    }

    const clearState = () =>{
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
    }

   


    return(
        <div>
            <form>
                <Container sx={{marginBottom: '10px'}}maxWidth="xs" component={Paper} variant="outlined">
                    <Stack spacing={2} my={1.5}>
                        <Typography variant="h5">Add Contact</Typography>
                        <TextField
                            variant="standard"
                            onChange={ (e) => {setFirstName(e.target.value)}}
                            value={firstName}
                            label={"First Name"}
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
                            onChange={ (e) => {setLastName(e.target.value)}}
                            value={lastName}
                            label={"Last Name"}
                            error={errors.lastName.length > 0}
                            helperText={errors.lastName}
                            InputLabelProps={{
                            style: {
                                marginLeft: '14px'
                            } }} 
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
                        

                            <Button onClick={saveButtonHandler} sx={{width: '100px'}} variant="contained" size="medium">
                                Save
                            </Button>
                        
                    </Stack>
                
                </Container> 
                <Container maxWidth="xs" component={Paper} variant="outlined" py={10}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        
                        py={2}
                    >
                        <Typography>Disable confirmation dialog</Typography>
                    <Switch
                        checked={checked}
                        onChange={toggleConfirmationMessage}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                                
                        
                    </Stack>
                </Container>
                
            </form>
            <Container >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{minWidth: '250px'}}
            >
                <DialogTitle id="alert-dialog-title">
                {"Phone contact has been added successfully!"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Go back to the contact list if you want to see all contacts
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
            </Container>
        </div>
    );
}

export default AddItem;