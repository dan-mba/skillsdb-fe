import {render} from 'react-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Amplify} from 'aws-amplify';

import {MuiTheme} from './theme';
import {config} from './config';
import App from './App';

Amplify.configure(config);

render(
  <>
    <CssBaseline />
    <ThemeProvider theme={MuiTheme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
)
