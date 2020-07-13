import React, { Fragment } from 'react'
import Navbar from './layout/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import ContactState from '../contexts/contact/ContactState'
import '../App.css'

const App = () => {
  return (
    <ContactState>
    <BrowserRouter>
      <Fragment>
      <Navbar />
        <div className="container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
        </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
    </ContactState>
  )
}

export default App
