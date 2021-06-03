import React from 'react'
import { DemoComponent } from './components'
import './App.css'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import lightBlue from '@material-ui/core/colors/lightBlue'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: lightBlue[400]
    },
    secondary: {
      main: green[500]
    }
  }
})
function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DemoComponent />
    </ThemeProvider>
  )
}

export default App
