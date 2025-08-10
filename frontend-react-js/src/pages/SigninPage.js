import './SigninPage.css';
import React from "react";
import { ReactComponent as Logo } from '../components/svg/logo.svg';
import { Link } from "react-router-dom";
import { signIn } from 'aws-amplify/auth';

export default function SigninPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const onsubmit = async (event) => {
    event.preventDefault();
    setErrors('');
    console.log('Signing in with Amplify...');

    try {
      const { isSignedIn } = await signIn({
        username: email,
        password: password
      });

      if (isSignedIn) {
        // Store token if needed (placeholder here)
        localStorage.setItem("access_token", "some_token_value");
        window.location.href = "/";
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      if (error.name === 'UserNotConfirmedException') {
        window.location.href = '/confirm';
      } else {
        setErrors(error.message || 'An error occurred during sign-in');
      }
    }
  };

  return (
    <article className="signin-article">
      <div className='signin-info'>
        <Logo className='logo' />
      </div>
      <div className='signin-wrapper'>
        <form 
          className='signin_form'
          onSubmit={onsubmit}
        >
          <h2>Sign into your Cruddur account</h2>
          <div className='fields'>
            <div className='field text_field username'>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className='field text_field password'>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          {errors && <div className='errors'>{errors}</div>}
          <div className='submit'>
            <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
            <button type='submit'>Sign In</button>
          </div>
        </form>
        <div className="dont-have-an-account">
          <span>Don't have an account?</span>
          <Link to="/signup">Sign up!</Link>
        </div>
      </div>
    </article>
  );
}
