import React from 'react'
import { DemoComponent } from './Demo'
import './App.css'
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import lightBlue from '@material-ui/core/colors/lightBlue'
import green from '@material-ui/core/colors/green'
import { Provider } from 'react-redux'
import { store } from './core/store'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: lightBlue[400]
    },
    secondary: {
      main: green[500]
    },
    success: {
      main: green[500]
    }
  }
})
function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DemoComponent />
      </ThemeProvider>
    </Provider>
  )
}

export default App
