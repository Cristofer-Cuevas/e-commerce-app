import React, { useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginPost } from "../fetchMethods/post";
import { setCookie } from "../utils/utils.js";
import { Input, LoginError } from "./ComponentUtils";

const SignIn = ({ user, setUser }) => {
  const [formState, setFormState] = useState({});

  const navigate = useNavigate();

  const emailInpRef = useRef();
  const passwordInpRef = useRef();

  const onClickLoginBtn = (e) => {
    e.preventDefault();

    const email = emailInpRef.current.value;
    const password = passwordInpRef.current.value;
    console.log("hola");

    if (!email || !password) {
      console.log("indeed");
      setFormState({ isFormIncomplete: true });
    } else {
      const userCredentials = {
        email,
        password,
      };
      setFormState({});
      loginPost(userCredentials)
        .then((res) => res.json())
        .then((res) => {
          if (!res.isPasswordValid || !res.userExists) {
            setFormState({ isLoginWrong: true });
          }
          if (res.success) {
            setUser(res.user);
            setCookie(res.token);
            navigate("/", { replace: true });
          }
          console.log(res);
        });
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/" replace />
      ) : (
        <main className="w-full h-full flex justify-center items-center">
          <form className="w-11/12 sm:w-1/2 lg:w-2/5">
            <h1 className="font-bold text-3xl text-center">Sign in</h1>
            {formState?.isFormIncomplete ? <LoginError text="Please complete the form" /> : null}

            {formState?.isLoginWrong ? <LoginError text="There was a problem with your email or password" /> : null}
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
        </main>
      )}
    </>
  );
};

export default SignIn;
