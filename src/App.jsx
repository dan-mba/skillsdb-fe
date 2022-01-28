import {CssBaseline, ThemeProvider} from '@mui/material'
import Content from './Content'
import {theme} from './theme'

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </>
  )
}

export default App
