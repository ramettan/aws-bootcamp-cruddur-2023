import './SigninPage.css';
import React from "react";
import { ReactComponent as Logo } from '../components/svg/logo.svg';
import { Link } from "react-router-dom";
import { signIn, fetchAuthSession } from 'aws-amplify/auth';

export default function SigninPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const onsubmit = async (event) => {
    event.preventDefault();
    setErrors('');
    console.log('Signing in with Amplify...');

    try {
      // Sign in with email (Cognito configured for email sign-in)
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password
      });

      if (isSignedIn) {
        // Get Cognito tokens after sign-in
        const session = await fetchAuthSession();
        const accessToken = session.tokens?.accessToken?.toString();

        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
        }

        window.location.href = "/";
      } else if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        // Redirect if sign-up not confirmed
        window.location.href = '/confirm';
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className='field text_field password'>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
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
