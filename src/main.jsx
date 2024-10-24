import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/store'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { AbilityContext } from './utility/context/Can'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<h1>Loaing</h1>}>
        <AbilityContext.Provider value={ability}>
          <App />
        </AbilityContext.Provider>
      </Suspense>

    </Provider>
  </StrictMode>,
)
