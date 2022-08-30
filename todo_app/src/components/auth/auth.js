import React from 'react'
import { When } from 'react-if'

import { LoginContext } from './context.js'

export const AuthContext = React.createContext()
class Login extends React.Component {
  static contextType = LoginContext
  constructor(props) {
    super(props)
    this.state = {
      capability: this.props.capability,
    }
  }
  render() {
    const isLoggedIn = this.context.loggedIn
    const canDo = this.props.capability
      ? this.context.can(this.props.capability)
      : true
    console.log('CAN DOOOOO ---', canDo)
    const okToRender = isLoggedIn && canDo

    return (
      <When condition={okToRender}>
        <AuthContext.Provider value={this.state}>
          {this.props.children}
        </AuthContext.Provider>
      </When>
    )
  }
}

export default Login
