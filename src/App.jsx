import {useEffect, useState} from 'react';
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Auth, API, Hub} from 'aws-amplify';

const StyledToolbar = styled(Toolbar)({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
});

function App() {
  /*
  useEffect(async () => {
    await API.get('SkillsApi', '')
    .then(response => setData(response))
    .catch(error => console.log(error));
  }, []);
  */
 
 const [user, setUser] = useState(null);
 const [username, setUsername] = useState('');
 const [data, setData] = useState({});

  useEffect(async () => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser()
            .then(userData => {
              setUser(userData)
              setUsername(userData.signInUserSession.idToken.payload.email)
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
        getData()
      });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  async function getData() {
    await API.get('SkillsApi', '')
    .then(response => setData(response))
    .catch(error => console.log(error));
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
        <Typography variant="body" component="pre">{JSON.stringify(data, null, 2)}</Typography>
      </Container>
    </>
  )
}

export default App
