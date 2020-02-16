import React, { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'rx/store'
import FxLoader from 'components/FxLoader/FxLoader'
import 'sass/main.scss'

const FxCalculator = lazy(() => import('components/FxCalculator/FxCalculator'))
const Layout = () => {
  return (
    <>
      <header className="l-header">
        {/* Header content */}
      </header>
      <main className="l-main">
        <div className="container">
          {/* Lazy Loading React Components with lazy and suspense */}
          <Suspense fallback={ <FxLoader /> }>
            <FxCalculator />
          </Suspense>
        </div> 
      </main>
      <footer className="l-footer" >
        {/* Footer content */}
      </footer>
    </>
  )
}

const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  )
}

export default App

