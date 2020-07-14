import React, { Fragment } from 'react'
import Navbar from './layout/Navbar'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import ContactState from '../contexts/contact/ContactState'
import AuthState from '../contexts/auth/AuthState'
import AlertState from '../contexts/alert/AlertState'
import Register from './auth/Register'
import Login from './auth/Login'
import Alerts from './layout/Alerts'
import '../App.css'

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <BrowserRouter>
      <Fragment>
      <Navbar />
        <div className="container">
          <Alerts />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
    </AlertState>
    </ContactState>
    </AuthState>
  )
}

export default App
