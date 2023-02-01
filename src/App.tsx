import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './contexts/CyclesContext'

import { Router } from './Router'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/themes/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <Router />
        <GlobalStyle />
      </CyclesProvider>
    </ThemeProvider>
  )
}
