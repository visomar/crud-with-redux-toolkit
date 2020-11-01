import React from 'react';
import Login from '../login/Login';
import './loginpage.sass';

function LoginPage() {
  return (
    <section className="section main-section is-full">
      <div className="container">
        <div className="columns is-mobile is-centered is-vcentered">
          <div className="column">
            <header>
              <h1 className="title has-text-weight-bold ">Welcome to this test application</h1>
            </header>

            <Login />

            <p className="subtitle">
              Maybe you could try user: user1 and any password...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
