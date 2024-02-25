import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [subOn, setSubOn] = useState(true)
  const { closeModal } = useModal();

  useEffect(()=>{
    if(email.length > 4)setSubOn(false)
    else setSubOn(true)

    if(password.length > 6) setSubOn(false)
    else setSubOn(true)
  },[password, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate('/')
      closeModal();
    }
  };

  const handleDemo = async ()=>{
    setEmail('demo@aa.io')
    setPassword('password')
    navigate('/')
    const serverResponse = await dispatch(
      thunkLogin({
        "email":"demo@aa.io",
        "password":"password"
      })
    )
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  return (
    <div className="login-all">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="text-box-log">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              />
          </label>
        </div>
        {errors.email && <p className="errors">{errors.email}</p>}
        <div className="text-box-log">
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
        {errors.password && <p className="errors">{errors.password}</p>}
        <div className="submit-button-log">
          <button type="submit" className="button-log">Log In</button>
        </div>
      </form>
        <div onClick={handleDemo}>Demo User</div>
    </div>
  );
}

export default LoginFormModal;
