import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [empty, setEmpty] = useState(true)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submited, setSubmited] = useState(false)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const currErrors = {}
    if (!email.length || !username.length || !password.length || !confirmPassword.length) setEmpty(false)
    else setEmpty(true)
    if(username.length < 4 || password.length < 6|| !confirmPassword.length) setEmpty(true)
    else setEmpty(false)
    if (submited) {
      if (!email.length) {
        currErrors.email = 'Email is required'
      }
      if (!username.length || username.length < 4) {
        currErrors.username = 'Username is required and must be more than 4 characters'
      }
      if (!password.length || password.length < 6) {
        currErrors.password = 'Password is required and must be more than 6 characters'
      }
      if (!confirmPassword.length) {
        currErrors.confirmPassword = 'Confirm password is required'
      }
    }
    setErrors(currErrors)
  }, [email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    setSubmited(true)
    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-all">
      <h1>Sign Up</h1>
      {errors.server && <p className='errors'>{errors.server}</p>}
      <form className="signup-all" onSubmit={handleSubmit}>
        <div className="text-box">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              />
          </label>
        </div>
        {errors.email && <p className='errors'>{errors.email}</p>}
        <div className="text-box">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              />
          </label>
        </div>
        {errors.username && <p className='errors'>{errors.username}</p>}         
        <div className="text-box">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              />
          </label>
        </div>
        {errors.password && <p className='errors'>{errors.password}</p>}
        <div className="text-box">
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              />
          </label>
        </div>
        {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
        <div className="submit-button">
          <button type="submit" className="button" disabled={empty || Object.values(errors).length}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
