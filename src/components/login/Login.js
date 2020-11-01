import React from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from './loginSlice';
import './login.sass';

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    const name = event.target.name.value;
    const passw = event.target.passw.value;
    dispatch(attemptLogin({name, passw}));

    event.preventDefault();
  }
  return (
    <div className="columns is-justify-content-center">
      <div className="column is-full-mobile is-half-desktop">
        <form className="mb-6 mt-6" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input is-rounded is-full-mobile is-half"
                type="text"
                name="name"
                placeholder="Insert here your name..."
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input is-rounded is-full-mobile is-half"
                type="password"
                name="passw"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="field is-grouped button-controls">
            <div className="control">
              <button className="button is-primary" type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

