import {render} from 'react-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AmplifyProvider} from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify';

import {MuiTheme} from './theme';
import {config} from './config';
import App from './App';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(config);

render(
  <AmplifyProvider>
    <CssBaseline />
    <ThemeProvider theme={MuiTheme}>
      <App />
    </ThemeProvider>
  </AmplifyProvider>,
  document.getElementById('root')
)
