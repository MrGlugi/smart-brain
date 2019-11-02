import React, { Component } from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', name: '' }
  }

  onPasswordChange = e => {
    const password = e.target.value
    this.setState({ password })
  }
  onEmailChange = e => {
    const email = e.target.value
    this.setState({ email })
  }
  onNameChange = e => {
    const name = e.target.value
    this.setState({ name })
  }

  onSubmitSignIn = () => {
    if (this.state.email && this.state.password && this.state.name) {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
        .then(resp => {
          return resp.json()
        })
        .then(respObj => {
          if (respObj.status === 'created') {
            this.props.loadUser(respObj.user)
            this.props.onRouteChange('home')
          }
        })
        .catch(e => {
          console.log('error', e)
        })
    }
  }
  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='Name'>
                  Name
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='name'
                  id='name'
                  onChange={this.onNameChange}
                />
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                onClick={this.onSubmitSignIn}
                value='Register'
              />
            </div>
          </div>
        </main>
      </article>
    )
  }
}