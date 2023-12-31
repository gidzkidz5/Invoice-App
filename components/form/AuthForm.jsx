import { useContext, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import classes from "./AuthForm.module.css";
import { ThemeContext } from "@/ThemeContext";
import AuthLoader from "../others/AuthLoader";

async function createUser(email, password) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export default function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const [isLoginError, setIsLoginError] = useState({
    error: false,
    message: null
  })

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //could add some front end validation here

    if (isLogin) {
      //log user in
      setIsLoggingIn(true)
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
       });

       if (!result.error) {
        // setIsLoggingIn(false)
       } else if (result.error) {
        setIsLoginError({
          error: true,
          message: result.error
        })
        setIsLoggingIn(false)
       }
      
       console.log("auth result", result);
       setIsLoggingIn(false)
      } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
     {isLoggingIn && 
      <>
      <span>Logging in...</span>
     <AuthLoader/>
     </>}
    <section className={`${classes.auth} ${theme} ff-sanserif`}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
   
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${theme}`}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={`${classes.control} ${theme}`}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {isLoginError.error && <p className={`ff-sanserif fs-S`} style={{color: "#EC5757"}}>{isLoginError.message}</p>}
    </section>
    
    </>
  );
}


