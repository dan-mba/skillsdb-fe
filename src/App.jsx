import {useEffect, useState} from 'react';
import {AppBar, Button, Container, Dialog, Toolbar, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Hub} from 'aws-amplify/utils';
import {fetchAuthSession, signOut, signInWithRedirect} from 'aws-amplify/auth';
import {get} from 'aws-amplify/api';

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

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log('Hub:', event)
      switch (event) {
        case 'signInWithRedirect':
          getUser()
            .then(userData => {
              setUser(userData);
              setUsername(userData.idToken.payload.email);
            });
            break;
        case 'signOut':
          setUser(null);
          setUsername('');
          break;
        case 'signIn_failure':
        case 'signInWithRedirect_failure':
          console.log('Sign in failure', data);
          break;
        }
      });
    
    async function getSkillsData() {
      const userData = await getUser()
      if (userData) {
          setUser(userData);
          setUsername(userData.idToken.payload.email);
          await getData(userData);
      }
    }
    getSkillsData();
  }, []);

  async function getUser() {
    if (user) return user;
    try {
      const {tokens} = await fetchAuthSession()
      return tokens
    } catch {
      console.log('Not signed in');
    }
  }

  async function getData(userData = user) {
    try {
      const getOperation =  get({
        apiName: 'SkillsApi',
        path: '',
        options: {
          headers: {
            Authorization: userData.accessToken.toString()
          }
        }
      })
      const res = await getOperation.response;
      const data = await res.body.json();
      setData(mapData(data))
    } catch(error) {
      console.log(error);
    }
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
            <Button color="inherit" onClick={() => signOut()}>Sign Out</Button> :
            <Button color="inherit" onClick={() => signInWithRedirect()}>Sign In</Button>
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
        <AddDialog onClose={handleAddClose} user={user}/>
      </Dialog>
      <Dialog open={Boolean(editOpen)} onClose={handleEditClose}>
        <EditDialog value={editOpen} onClose={handleEditClose} user={user}/>
      </Dialog>
      <Dialog open={Boolean(deleteOpen)} onClose={handleDeleteClose}>
        <DeleteDialog value={deleteOpen} onClose={handleDeleteClose}  user={user}/>
      </Dialog>
    </>
  )
}

export default App
