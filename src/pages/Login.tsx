import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import "../styles/pages/login.scss";
import { useState } from "react";
import CustomSVGs from "../components/abstracts/CustomSVGs";
import PrimaryInput from "../components/ui/inputs/PrimaryInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setMessage } from "../store/reducers/appSlice";
import { decryptPassword } from "../lib/helper-functions/encrypt-decrypt";
import generateRandomString from "../lib/helper-functions/generateRandomString";
import simulateApiCall from "../lib/api/simulateApiCall";
import { logIn } from "../store/reducers/authSlice";
import spinner from "../assets/gif/loading.gif";

function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.allUsers);
  const [loading, setLoading] = useState(false);

  const goToSignUp = () => {
    navigate("/register");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailAddress || !password) {
      dispatch(
        setMessage({
          message: "All fields are required",
          messageType: "error",
        })
      );
      return;
    }

    if (!users[emailAddress]) {
      dispatch(
        setMessage({
          message: `Wrong email or password!`,
          messageType: "error",
        })
      );
      return;
    }

    const userSavedPassword = users[emailAddress].password;
    if (userSavedPassword) {
      const decryptedPassword = decryptPassword(userSavedPassword);
      if (decryptedPassword !== password) {
        dispatch(
          setMessage({
            message: `Wrong email or password!`,
            messageType: "error",
          })
        );
        return;
      }
    }

    try {
      setLoading(true);
      const accessToken = generateRandomString(32);
      const res = await simulateApiCall({
        accessToken: accessToken,
        currentUserId: emailAddress,
      });

      if (res.success) {
        dispatch(logIn(res.data));
        dispatch(
          setMessage({
            message: "Successfully logged in",
            messageType: "success",
          })
        );
        navigate("/");
        setLoading(false);
      } else {
        dispatch(
          setMessage({
            message: "Failed to submit data. Please try again.",
            messageType: "error",
          })
        );
        setLoading(false);
      }
    } catch (error) {
      dispatch(
        setMessage({
          message: "An error occurred. Please try again later.",
          messageType: "error",
        })
      );
      setLoading(false);
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__content--left">
          <h1
            onClick={() => {
              navigate("/");
            }}
          >
            Sign In
          </h1>
          <form onSubmit={onSubmit}>
            <div className="login__content--left-inputs">
              <PrimaryInput
                icon={<CustomSVGs fillColor="#cecece" svgName="messageSVG" />}
                id="login-form-email"
                value={emailAddress}
                type="email"
                changeListeners={[(e) => setEmailAddress(e.target.value)]}
                placeholder="Email Address"
                required={true}
                pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$"
                title="Expected email format: hello@example.com"
              />
              <PrimaryInput
                icon={<CustomSVGs fillColor="#cecece" svgName="lockSVG" />}
                id="login-form-password"
                value={password}
                type="password"
                changeListeners={[(e) => setPassword(e.target.value)]}
                placeholder="Password"
                required={true}
                pattern="[^ ]{8,20}"
                title="Password should be between 8 to 20 characters"
              />
            </div>
            <div className="login__content--left-button">
              {loading ? (
                <img
                  src={spinner}
                  alt="loading spinner"
                  className={`login__content--right-spinner ${
                    loading ? "show" : "hide"
                  }`}
                />
              ) : (
                <PrimaryButton value="Sign In" type="submit" />
              )}
            </div>
            <span onClick={goToSignUp} className="login__content--left-link">
              Create Account
            </span>
          </form>
        </div>
        <div className="login__content--right">
          <h1>Welcome Back!</h1>
          <div className="login__content--right-text">
            <p>Enter your details and start</p>
            <p>your journey with us</p>
          </div>

          <PrimaryButton
            classes="login-btn"
            value="Sign Up"
            onClick={goToSignUp}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
