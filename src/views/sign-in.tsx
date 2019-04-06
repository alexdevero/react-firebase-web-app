import React from 'react'

interface SignInScreenInterface {
  handleInputChange: (event: any) => void
  handleScreenSwitch: () => void
  handleSignIn: () => void
}

export const SignInScreen: React.SFC<SignInScreenInterface> = (props) => {
  return(
    <>
      <div>
        <h3>Sign in to your account:</h3>

        <label htmlFor="userEmail">Email</label>

        <input name="userEmail" className="login__email" onChange={props.handleInputChange} type="text"/>

        <label htmlFor="userPassword">Password</label>

        <input name="userPassword" className="login__password" onChange={props.handleInputChange} type="password"/>
      </div>

      <p>Don't have account yet? <a href="#!" onClick={props.handleScreenSwitch}>Create new account.</a></p>

      <button onClick={props.handleSignIn}>Login</button>
    </>
  )
}
