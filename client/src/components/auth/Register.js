import React, { useState, useContext} from 'react'
import AlertContext from '../../contexts/alert/alertContext'
import AuthContext from '../../contexts/auth/authContext'

const Register = () => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { register} = authContext
  const { setAlert } = alertContext
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })

  const { name, email, password, password2} = user

  const onChange = e => setUser({...user, [e.target.name]:e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if(name ==='' || email === '' || password === ''){
      setAlert('Please enter all fields', 'danger')
    }else if(password !== password2){
      setAlert('Passwords do not match', 'danger')
    }else{
     register({
       email,name,password
     })
    }
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={name} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Email Address</label>
          <input type="email" name='email' value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="password" name='password' value={password} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Confirm Password</label>
          <input type="password" name='password2' value={password2} onChange={onChange} required/>
        </div>
        <input type="submit" value="register" className="btn btn-primary btn-block"/>
      </form>
    </div>
  )
}

export default Register
