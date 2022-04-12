import {createRoot} from 'react-dom/client';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Amplify} from 'aws-amplify';

import {MuiTheme} from './theme';
import {config} from './config';
import App from './App';

Amplify.configure(config);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={MuiTheme}>
      <App />
    </ThemeProvider>
  </>,
)
