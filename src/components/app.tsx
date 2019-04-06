import React, { Component } from 'react'

import { auth, db } from '../firebase/firebase'

import logo from './../assets/logo.svg'


class App extends Component {
  state = {
    isErrorMessageVisible: false,
    isLoginScreenVisible: true,
    registerEmail: '',
    registerPassword: '',
    user: null,
    userEmail: '',
    userPassword: ''
  }

  // componentDidMount() {
    // if (window.localStorage.getItem(user).length !==0) {
      // authenticate user with data from browser sessionStorage
    // }
  // }

  handleInputChange = (event: any) => {
    const target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleSignIn = () => {
    auth.signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword).then((response: any) => {
      const currentUser = {
        email: response.user.email,
        refreshToken: response.user.refreshToken,
        uid: response.user.uid,
        username: response.user.displayName
      }

      this.setState({
        user: response
      })

      window.sessionStorage.setItem('user', JSON.stringify(currentUser))

      // db.collection('users').get().then((response: any) => {
      //   response.forEach((query:any) => {
      //     console.log(query)
      //   })
      // }).catch((error:any) => {
      //   console.log(error.code)
      //   console.log(error.message)
      // })
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

          {this.state.user === null && this.state.isLoginScreenVisible && <>
            <div>
              <h3>Sign in to your account:</h3>

              <label htmlFor="userEmail">Email</label>

              <input name="userEmail" className="login__email" onChange={this.handleInputChange} type="text"/>

              <label htmlFor="userPassword">Password</label>

              <input name="userPassword" className="login__password" onChange={this.handleInputChange} type="password"/>
            </div>

            <p>Don't have account yet? <a href="#!" onClick={this.handleScreenSwitch}>Create new account.</a></p>

            <button onClick={this.handleSignIn}>Login</button>
          </>}

          {this.state.user === null && !this.state.isLoginScreenVisible && <>
            <div>
              <h3>Create new account:</h3>

              <label htmlFor="registerEmail">Email</label>

              <input name="registerEmail" className="register__email" onChange={this.handleInputChange} type="text"/>

              <label htmlFor="registerPassword">Password</label>

              <input name="registerPassword" className="register__password" onChange={this.handleInputChange} type="password"/>
            </div>

            <p>Already have an account? <a href="#!" onClick={this.handleScreenSwitch}>Sign in.</a></p>

            <button onClick={this.handleSignUp}>Register</button>
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
