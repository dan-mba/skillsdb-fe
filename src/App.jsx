import {CssBaseline, ThemeProvider} from '@mui/material';
import {AmplifyProvider} from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify';
import Content from './Content';
import {MuiTheme} from './theme';
import {config} from './config';
import '@aws-amplify/ui-react/styles.css';

function App() {
  Amplify.configure(config);

  return (
    <AmplifyProvider>
      <CssBaseline />
      <ThemeProvider theme={MuiTheme}>
        <Content />
      </ThemeProvider>
    </AmplifyProvider>
  )
}

export default App
