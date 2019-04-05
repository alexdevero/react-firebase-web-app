import React, { Component } from 'react'

import { auth, db } from '../firebase/firebase'

import logo from './../assets/logo.svg'


class App extends Component {
  state = {
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
              <label htmlFor="userEmail">Email</label>

              <input name="userEmail" className="login__email" onChange={this.handleInputChange} type="text"/>

              <label htmlFor="userPassword">Password</label>

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
