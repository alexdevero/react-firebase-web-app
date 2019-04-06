import React from 'react'

interface SignUpScreenInterface {
  handleInputChange: (event: any) => void
  handleScreenSwitch: () => void
  handleSignUp: () => void
}

export const SignUpScreen: React.SFC<SignUpScreenInterface> = (props) => {
  return (
    <>
      <div>
        <h3>Create new account:</h3>

        <label htmlFor="registerEmail">Email</label>

        <input name="registerEmail" className="register__email" onChange={props.handleInputChange} type="text"/>

        <label htmlFor="registerPassword">Password</label>

        <input name="registerPassword" className="register__password" onChange={props.handleInputChange} type="password"/>
      </div>

      <p>Already have an account? <a href="#!" onClick={props.handleScreenSwitch}>Sign in.</a></p>

      <button onClick={props.handleSignUp}>Register</button>
    </>
  )
}
