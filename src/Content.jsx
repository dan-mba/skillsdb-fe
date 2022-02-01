import {Button, Typography} from '@mui/material';
import {Code} from '@mui/icons-material';
import {withAuthenticator} from '@aws-amplify/ui-react';

function Content({user, signOut}) {
  return (
    <>
      <Typography variant="h1"><Code fontSize="inherit"/>Hello Vite + MUI + React!</Typography>
      <Typography variant="h2">{user.username}</Typography>
      <Button variant="outlined" onClick={signOut}>Sign Out</Button>

    </>
  )
}

export default withAuthenticator(Content)
