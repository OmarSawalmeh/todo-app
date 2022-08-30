import React from 'react'
import { When } from 'react-if'
import './style/login.css'

import { LoginContext } from './context'

class Login extends React.Component {
  static contextType = LoginContext

  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.login(this.state.username, this.state.password)
  }

  render() {
    return (
      <>
        <When condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </When>

        <When condition={!this.context.loggedIn}>
          <div className='App'>
            <form className='form' onSubmit={this.handleSubmit}>
              <input
                id='userName'
                placeholder='UserName'
                name='username'
                onChange={this.handleChange}
              />
              <input
                placeholder='password'
                name='password'
                onChange={this.handleChange}
              />
              <button color='primary' className='form__custom-button'>
                Login
              </button>
            </form>
          </div>
        </When>
      </>
    )
  }
}

export default Login
