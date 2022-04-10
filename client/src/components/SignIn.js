import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "../fetchMethods/get";
import { loginPost } from "../fetchMethods/post";
import { setCookie } from "../utils/utils.js";

const SignIn = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  const [formState, setFormState] = useState({});

  const navigate = useNavigate();

  const emailInpRef = useRef();
  const passwordInpRef = useRef();

  const onClickLoginBtn = (e) => {
    e.preventDefault();

    const emailInpValue = emailInpRef.current.value;
    const passwordInpValue = passwordInpRef.current.value;

    if (!emailInpValue || !passwordInpValue) {
      console.log("indeed");
      setFormState({ isFormIncomplete: true });
    } else {
      const userCredentials = {
        email: emailInpValue,
        password: passwordInpValue,
      };
      loginPost(userCredentials)
        .then((res) => res.json())
        .then((res) => {
          if (res.isPasswordValid === false) {
            setFormState({ isPasswordInvalid: true });
            console.log("fired");
          }
          if (res.success) {
            setCookie(res.token);
            navigate("/", { replace: true });
          }
          console.log(res);
        });
    }
  };

  useEffect(() => {
    getAuth()
      .then((res) => res.json())
      .then((res) => {
        if (res.unauthorized) {
          setShowSpinner(false);
          console.log(res);
        } else if (res.success) {
          navigate("/", { replace: true });
        }
      });
  }, [navigate]);

  return (
    <>
      {showSpinner ? (
        <div className="sk-chase mx-auto mt-20 ">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      ) : (
        <main className="w-full h-full flex justify-center items-center">
          <form className="w-11/12">
            <h1 className="font-bold text-3xl text-center">Sign in</h1>
            {formState?.isFormIncomplete ? <p className="text-center text-red-600 mt-5 text-green border-red-500 border-2 rounded-md py-2">Please complete the form</p> : null}

            {formState?.isPasswordInvalid ? <p className="text-center text-red-600 mt-5 text-green border-red-500 border-2 rounded-md py-2">There was a problem with your email or password.</p> : null}
            <div className="my-6 w-full bg-mail-icon bg-no-repeat bg-left bg-gray-100 rounded-md  ">
              <Input inputRef={emailInpRef} placeholder="Email" type="email" autoComplete="email" />
            </div>
            <div className="my-6 w-full bg-lock-icon bg-no-repeat bg-left bg-gray-100 rounded-md">
              <Input inputRef={passwordInpRef} placeholder="Password" type="password" autoComplete="current-password" />
            </div>

            <button className="mx-auto block my-3 w-full py-4 rounded-md bg-sky-500 text-white font-bold text-xl" onClick={onClickLoginBtn}>
              Log in
            </button>

            <p className="text-center mt-5">
              Don't have an account? {"  "}
              <Link className="text-sky-500" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
          <div class="spinner-box">
            <div class="circle-border">
              <div class="circle-core"></div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export const LogInForm = ({ getAuth, children }) => {
  useEffect(() => {
    getAuth()
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [getAuth]);

  return (
    <div>
      <h1>Log in form</h1>
      <form>{children}</form>
    </div>
  );
};

export const Input = ({ placeholder, type, inputRef, autoComplete, className }) => {
  return <input className={`${className || ""} w-full h-16 bg-transparent pl-12 focus:border-transparent outline-none focus:border-sky-500 focus:border-2 focus:rounded-md border-2 border-transparent placeholder:text-slate-600`} ref={inputRef} type={type} placeholder={placeholder} autoComplete={autoComplete} />;
};

export default SignIn;
