import {useEffect, useState} from 'react';
import {AppBar, Button, Container, Dialog, Toolbar, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Auth, API, Hub} from 'aws-amplify';

import AddDialog from './Components/AddDialog';
import EditDialog from './Components/EditDialog';
import DeleteDialog from './Components/DeleteDialog';
import DataDisplay from './Components/DataDisplay';
import mapData from './util/mapData';

const StyledToolbar = styled(Toolbar)({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
});

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState('');
  const [deleteOpen, setDeleteOpen] = useState('');

  useEffect(async () => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser()
            .then(userData => {
              setUser(userData);
              setUsername(userData.signInUserSession.idToken.payload.email);
            });
            break;
            case 'signOut':
              setUser(null);
              setUsername('');
              break;
              case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                  console.log('Sign in failure', data);
                  break;
                }
              });
              
    getUser()
      .then(userData => {
        setUser(userData);
        setUsername(userData.signInUserSession.idToken.payload.email);
        getData()
      });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  function getData() {
    API.get('SkillsApi', '')
      .then(response => setData(mapData(response)))
      .catch(error => console.log(error));
  }

  function handleAddClose() {
    setAddOpen(false);
    getData();
  }

  function handleEditOpen(value) {
    setEditOpen(value);
  }

  function handleEditClose() {
    setEditOpen("");
    getData();
  }

  function handleDeleteOpen(value) {
    setDeleteOpen(value);
  }

  function handleDeleteClose() {
    setDeleteOpen("");
    getData();
  }


  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username}
          </Typography>
          {user ?
            <Button color="inherit" onClick={() => Auth.signOut()}>Sign Out</Button> :
            <Button color="inherit" onClick={() => Auth.federatedSignIn()}>Sign In</Button>
          }
        </StyledToolbar>
      </AppBar>
      <Container maxWidth="lg">
        {user ?
          <Button onClick={() => setAddOpen(true)}>Add Skill</Button> :
          null
        }
        {data ? <DataDisplay data={data} edit={handleEditOpen} remove={handleDeleteOpen}/> : null}
      </Container>
      <Dialog open={addOpen} onClose={handleAddClose}>
        <AddDialog onClose={handleAddClose}/>
      </Dialog>
      <Dialog open={Boolean(editOpen)} onClose={handleEditClose}>
        <EditDialog value={editOpen} onClose={handleEditClose}/>
      </Dialog>
      <Dialog open={Boolean(deleteOpen)} onClose={handleDeleteClose}>
        <DeleteDialog value={deleteOpen} onClose={handleDeleteClose}/>
      </Dialog>
    </>
  )
}

export default App
