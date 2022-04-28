import React, { useRef, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signupPost } from "../fetchMethods/post";
import { Input, LoginError } from "./ComponentUtils";
import { setCookie } from "../utils/utils";

const SignUp = ({ user, setUser }) => {
  const [formState, setFormState] = useState({});

  const navigate = useNavigate();

  const nameInpRef = useRef(null);
  const emailInpRef = useRef(null);

  const lastNameInpRef = useRef(null);
  const passwordInpRef = useRef(null);

  const handleSignupPost = (e) => {
    e.preventDefault();

    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

    const name = nameInpRef.current.value;
    const lastName = lastNameInpRef.current.value;
    const email = emailInpRef.current.value;
    const password = passwordInpRef.current.value;

    const userCredentials = {
      name,
      lastName,
      email,
      password,
    };

    if (!name || !lastName || !email || !password) {
      setFormState({ isFormIncomplete: true });
    } else if (!regEx.test(email)) {
      setFormState({ isEmailInvalid: true });
    } else {
      setFormState({});
      signupPost(userCredentials)
        .then((res) => res.json())
        .then((res) => {
          if (res.userExists) {
            setFormState({ userExists: true });
          }
          if (res.success) {
            setUser(res.user);
            setCookie(res.token);
            navigate("/");
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
            <h1 className="font-bold text-3xl text-center">Sign up</h1>
            {formState?.userExists ? <LoginError text="This user already exists" /> : null}
            {formState?.isEmailInvalid ? <LoginError text="Please enter a valid email" /> : null}
            <div className="my-5 w-full bg-user-icon bg-no-repeat bg-left bg-gray-100 rounded-md">
              <Input inputRef={nameInpRef} autoComplete="first-name" placeholder="Name" type="text" />
            </div>
            <div className="my-5 w-full bg-user-icon bg-no-repeat bg-left bg-gray-100 rounded-md">
              <Input inputRef={lastNameInpRef} placeholder="Last Name" type="text" autoComplete="family-name" />
            </div>
            <div className="my-5 w-full bg-mail-icon bg-no-repeat bg-left bg-gray-100 rounded-md">
              <Input inputRef={emailInpRef} placeholder="Email" type="email" autoComplete="email" />
            </div>
            <div className="my-5 w-full bg-lock-icon bg-no-repeat bg-left bg-gray-100 rounded-md">
              <Input inputRef={passwordInpRef} placeholder="Password" type="password" autoComplete="new-password" />
            </div>
            <button className="mx-auto block my-3 w-full py-4 rounded-md bg-sky-500 text-white font-bold text-xl" onClick={handleSignupPost}>
              Sign Up
            </button>
            <p className="text-center mt-5">
              Already have an account?{" "}
              <Link className="text-sky-500" to="/signin">
                Log In
              </Link>
            </p>
          </form>
        </main>
      )}
    </>
  );
};

export default SignUp;
