import React, { Component } from 'react'

import { auth, db } from '../firebase/firebase'

import { SignInScreen } from '../views/sign-in'
import { SignUpScreen } from '../views/sign-up'

import logo from './../assets/logo.svg'


class App extends Component {
  state = {
    isErrorMessageVisible: false,
    isLoginScreenVisible: true,
    registerEmail: '',
    registerPassword: '',
    user: window.sessionStorage.getItem('user') !== null && window.sessionStorage.getItem('user')!.length !== 0 ? JSON.parse(window.sessionStorage.getItem('user')!) : null,
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
    auth.signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword).then((firebaseUserData: any) => {
      const currentUser = {
        email: firebaseUserData.user.email,
        refreshToken: firebaseUserData.user.refreshToken,
        uid: firebaseUserData.user.uid,
        username: firebaseUserData.user.displayName
      }

      this.setState({
        user: firebaseUserData
      })

      // Sign in user locally (app will remember the user when page refreshes)
      window.sessionStorage.setItem('user', JSON.stringify(currentUser))
    }).catch(error => {
      console.log(error.code)
      console.log(error.message)
    })
  }

  handleSignUp = () => {
    if (this.state.registerEmail, this.state.registerPassword) {
      auth.createUserWithEmailAndPassword(this.state.registerEmail, this.state.registerPassword).then((response: any) => {
        console.log('Account created.')
      }).catch((error: any) => {
        console.log(error.code)
        console.log(error.message)
      })
    } else {
      this.setState({
        isErrorMessageVisible: true
      })
    }
  }

  handleSignOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })

      // Sign out user locally
      window.sessionStorage.removeItem('user')

      console.log('Sign out successful.')
    }).catch(error => {
      console.log(error.code)
      console.log(error.message)
    })
  }

  handleScreenSwitch = () => {
    this.setState({
      isLoginScreenVisible: !this.state.isLoginScreenVisible
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {this.state.user === null && this.state.isLoginScreenVisible && <SignInScreen handleInputChange={this.handleInputChange} handleScreenSwitch={this.handleScreenSwitch} handleSignIn={this.handleSignIn} />}

          {this.state.user === null && !this.state.isLoginScreenVisible && <SignUpScreen handleInputChange={this.handleInputChange} handleScreenSwitch={this.handleScreenSwitch} handleSignUp={this.handleSignUp} />}

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
