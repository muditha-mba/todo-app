import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/ui/buttons/PrimaryButton";
import "../styles/pages/register.scss";
import { useState } from "react";
import NormalInput from "../components/ui/inputs/NormalInput";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/reducers/userSlice";
import { RootState } from "../store/store";
import { setMessage } from "../store/reducers/appSlice";
import simulateApiCall from "../lib/api/simulateApiCall";
import { encryptPassword } from "../lib/helper-functions/encrypt-decrypt";
import spinner from "../assets/gif/loading.gif";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.allUsers);

  const goToSignIn = () => {
    navigate("/login");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !emailAddress || !password) {
      dispatch(
        setMessage({
          message: "All fields are required",
          messageType: "error",
        })
      );
      return;
    }

    if (users[emailAddress]) {
      dispatch(
        setMessage({
          message: `User with email ${emailAddress} already exists`,
          messageType: "error",
        })
      );
      return;
    }

    const encryptedPassword = encryptPassword(password);

    try {
      setLoading(true);
      const res = await simulateApiCall({
        email: emailAddress,
        firstName,
        lastName,
        password: encryptedPassword,
      });

      if (res.success) {
        dispatch(updateProfile(res.data));
        dispatch(
          setMessage({
            message: "Successfully registered",
            messageType: "success",
          })
        );
        goToSignIn();
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(
          setMessage({
            message: "Failed to submit data. Please try again.",
            messageType: "error",
          })
        );
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        setMessage({
          message: "An error occurred. Please try again later.",
          messageType: "error",
        })
      );
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="register">
      <div className="register__content">
        <div className="register__content--left">
          <h1>Join Us Now!</h1>
          <div className="register__content--left-text">
            <p>We help the world to stay on track</p>
          </div>

          <PrimaryButton
            classes="register-btn"
            value="Sign In"
            onClick={goToSignIn}
          />
        </div>
        <div className="register__content--right">
          <h1>Sign Up</h1>
          <form onSubmit={onSubmit}>
            <div className="register__content--right-inputs">
              <NormalInput
                id="register-form-first-name"
                value={firstName}
                type="text"
                changeListeners={[(e) => setFirstName(e.target.value)]}
                placeholder="First Name"
                required={true}
                pattern="^[A-Za-z ]{2,30}$"
                title="Name cannot exceed 30 characters and should only contain letters"
              />

              <NormalInput
                id="register-form-last-name"
                value={lastName}
                type="text"
                changeListeners={[(e) => setLastName(e.target.value)]}
                placeholder="Last Name"
                required={true}
                pattern="^[A-Za-z ]{2,30}$"
                title="Name cannot exceed 30 characters and should only contain letters"
              />

              <NormalInput
                id="register-form-email"
                value={emailAddress}
                type="email"
                changeListeners={[(e) => setEmailAddress(e.target.value)]}
                placeholder="Email Address"
                required={true}
                pattern="^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$"
                title="Expected email format: hello@example.com"
              />
              <NormalInput
                id="register-form-password"
                value={password}
                type="password"
                changeListeners={[(e) => setPassword(e.target.value)]}
                placeholder="Password"
                required={true}
                pattern="[^ ]{8,20}"
                title="Password should be between 8 to 20 characters"
              />
            </div>
            <div className="register__content--right-button">
              {loading ? (
                <img
                  src={spinner}
                  alt="loading spinner"
                  className={`login__content--right-spinner ${
                    loading ? "show" : "hide"
                  }`}
                />
              ) : (
                <PrimaryButton type="submit" value="Sign Up" />
              )}
            </div>
            <span
              onClick={goToSignIn}
              className="register__content--right-link"
            >
              Go to login
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
