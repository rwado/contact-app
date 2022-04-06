import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleAppBar from './SimpleAppBar';
import AddItem from './AddItem';
import PhoneTable from './PhoneTable';
import ItemDetails from './ItemDetails';
import { v4 as uuid } from 'uuid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApiService from '../api/ApiService';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  
  const [phoneContacts, setPhoneContacts] = useState([]);


   const addPhoneContactHandler = (phoneContact) => {

    const request = {
      id: uuid(),
      ...phoneContact
    }

    ApiService.post("/phoneContacts", request)
      .then((response) => {
        setPhoneContacts([...phoneContacts, response.data]);
      })
      .catch((err) => {
        console.log(err);
      })
    
  };



  // UPDATE

  const updatePhoneContactsHandler = async (phoneContact) => {

    ApiService.update(`/phoneContacts/${phoneContact.id}`, phoneContact)
      .then((response) => {
          setPhoneContacts(phoneContacts.map((phoneContact) => phoneContact.id === response.data.id ? {...response.data} : phoneContact))
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  // DELETE

  const removePhoneContactHandler = (id) => {

    ApiService.delete(`/phoneContacts/${id}`)
      .then(() => {
        setPhoneContacts(phoneContacts.filter((phoneContact) => phoneContact.id !== id))
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // GET

  useEffect(() => {

    ApiService.get("/phoneContacts")
      .then( (response) => {
        setPhoneContacts(response.data)
      })
      .catch( (err) => {
        console.log(err);
      });
  }, [])


  return (
    <ThemeProvider theme={darkTheme} >
     <CssBaseline>
      <Router>
        <SimpleAppBar/>
          <Routes>
            <Route
              path="/"
              element={(
                <PhoneTable
                  phoneContacts={phoneContacts}
                  getPhoneContactId={removePhoneContactHandler}  
                />)}
              />
            <Route
              path="add"
              element={ (<AddItem addPhoneContactHandler={addPhoneContactHandler} />)}/>
            <Route
              path="phonecontacts/:id"
              element= { (<ItemDetails updatePhoneContactsHandler={updatePhoneContactsHandler}
            />)}/>
          </Routes>
      </Router>
      </CssBaseline>
    </ThemeProvider>
    
  );
}

export default App;
