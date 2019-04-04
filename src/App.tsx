import React, { Component } from 'react'

import { auth } from './firebase'

import logo from './logo.svg'

import './App.css'

class App extends Component {
  state = {
    user: null,
    userEmail: '',
    userPassword: ''
  }

  handleInputChange = (event: any) => {
    const target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleSignIn = () => {
    auth.signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword).then(response => {
      this.setState({
        user: response
      })
    }).catch(error => {
      console.log(error.code)
      console.log(error.message)
    })

  }

  handleSignOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    }).catch(error => {
      console.log(error.code)
      console.log(error.message)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {this.state.user === null && <>
            <div>
              <input name="userEmail" className="login__email" onChange={this.handleInputChange} type="text"/>

              <input name="userPassword" className="login__password" onChange={this.handleInputChange} type="password"/>
            </div>

            <button onClick={this.handleSignIn}>Login</button>
          </>}

          {this.state.user !== null && <>
            <p>Welcome back 🎉!</p>

            <button onClick={this.handleSignOut}>Logout</button>
          </>}
        </header>
      </div>
    )
  }
}

export default App
