import { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./login.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { getConfig } from "../../../Utils/config";
import { tokenChecker } from "../../../Utils/token";
import { motion } from "framer-motion";
import { UserContext } from "../../../Contexts/User/context";

const LoginScreen = ({ history }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {idHandler} = useContext(UserContext)
  

  const getError = localStorage.getItem("error-message");

  useEffect(() => {
    if (tokenChecker()) {
      return navigate("/app/dash");
    }
    if (getError) {
      setError(getError);
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = getConfig();
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      
      localStorage.setItem("id",data.user.id);
      localStorage.setItem("authToken", data.token);
      localStorage.removeItem("error-message");

      return navigate("/app/dash");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div className={styles.loginscreen}>
        <form className={styles.loginScreen__form} onSubmit={loginHandler}>
          <motion.div
            className="box"
            whileHover={{ x: -5 }}
            transition={{ type: "spring" }}
          >
            <Link to="/">
              <IoIosArrowBack className="backIcon fs-3" />
            </Link>
          </motion.div>
          <h3 className="text-center">Login</h3>
          {error && (
            <span className=" bg-danger error-message rounded p-1 text-white">
              {error}
            </span>
          )}

          <div className="form-group d-flex flex-column py-2">
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="email"
              required
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" form-group d-flex flex-column pb-2">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              required
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgotpassword" className="pt-2">
             <b> Forgot Password? </b>
            </Link>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <span className="pt-2 login-screen__subtext">
          <Link to="/auth/register"><b className=""> Do not have an account? </b></Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;