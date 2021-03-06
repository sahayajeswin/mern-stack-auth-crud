import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../redux/_actions/authAction';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/_actions/alertAction';
import { CLEAR_ERRORS } from '../../redux/types';

const Register = ({ history }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') && auth.isAuthenticated)
      history.push('/login');

    if (auth.error === 'User already exists') {
      dispatch(setAlert(auth.error, 'danger'));
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [auth.isAuthenticated, auth.error]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = newUser;

  const onChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '')
      dispatch(setAlert('Please enter all the fields.', 'danger'));
    else dispatch(register(newUser));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>
                Sign <span className="text-primary">Up</span>
              </h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    placeholder="Name"
                    onChange={onChange}
                    value={name}
                    name="name"
                    type="text"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={password2}
                    name="password2"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </form>
              <br />
              <p>
                Already have an account <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
