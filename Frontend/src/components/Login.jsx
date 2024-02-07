import { useContext, useEffect } from "react";
import cookie from "js-cookie"; // cookie parser
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    backendApiUrl,
    hasToken,
    setHasToken,
    error,
    setError,
    msg,
    setMsg,
    user,
    setUser,
    userId,
    setUserId,
  } = useContext(UserContext);

  console.log("userId", userId);

  const resetMessages = () => {
    setMsg("");
    setError("");
  };

  const setErrorMessages = (error) => {
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    resetMessages();

    try {
      const resp = await axios.post(
        `${backendApiUrl}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("resp: ", resp.data.msg);
      setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
      setHasToken(true);

      navigate("/workflow");
      // setRerender((prev) => !prev); // Force re-render
    } catch (error) {
      setErrorMessages(error);
      console.log("error while logging in:", error);
    }
  };

  console.log("userId---", userId);
  console.log("user._id---", user._id);

  // Dependency added for re-render

  return (
    <>
      {!hasToken ? (
        <>
          <div className="login-box">
            <p>Login</p>
            <form onSubmit={loginHandler}>
              <div className="user-box">
                <input
                  required=""
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="user-box">
                <input
                  required=""
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" className="btn-style">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>

            <hr className="br-style" />
            <p className="p-style">
              Forgot Password ? <br />
              <button
                onClick={() => navigate("/update-password")}
                className="sign-up-link btn-style-secondary"
              >
                click
              </button>
              {/* <Link to="/changePassword">Forgot Password</Link> */}
            </p>
            <p className="sign-up-label">
              Don't have an account?
              <br />
              <button
                onClick={() => navigate("/signup")}
                className="sign-up-link btn-style-secondary"
              >
                Sign up
              </button>
            </p>
          </div>
        </>
      ) : (
        ""
        // <>
        //   <Navigate to="/logout" /> state = {{ from: location }}
        // </>
      )}
      {/* <hr />
            <button onClick={userInfoHandler}>Show personal information</button>
            {hasToken && <p>i had the id</p>} */}
    </>
  );
}

export default Login;
//  <>
//         <button onClick={getUserByIdHandler}>Get User by ID</button>

//         <hr />
//         <form onSubmit={logoutHandler}>
//           <button type="submit">Logout</button>
//         </form>
//       </>
//     )}
//     <hr />
//     <button onClick={userInfoHandler}>Zeige persönliche Daten</button>
//     {hasToken && <p>i had the id</p>}
//   </>
