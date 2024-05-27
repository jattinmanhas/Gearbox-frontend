"use client";
import Link from "next/link";
import styles from "./login.module.css";
import { login, createUser } from "@/api/auth";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  status: 500,
  message: "",
};

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if(state.status === 200){
      router.push('/');
    }
  }, [state, router])
  

  return (
    <div className={styles.loginContainer}>
      {(state.message && state.status !== 200) && <ErrorMessage message={state.message} />}
      <div className={styles.loginHeadingContainer}>
        <h1>Sign in to you Account</h1>
        <p>Welcome Back, we are lucky to have you.</p>
      </div>
      <form className={styles.loginForm} action={formAction}>
        <label className={styles.loginLabel} htmlFor="usernameEmail">
          Username or Email
        </label>
        <input
          className={styles.loginInput}
          id="usernameEmail"
          name="usernameEmail"
          type="text"
        />

        <label className={styles.loginLabel} htmlFor="password">
          Password
        </label>
        <input
          className={styles.loginInput}
          id="password"
          name="password"
          type="text"
        />

        <LimeButton name="Log In" type="submit" />

        <p className={styles.loginForgotPassword}>
          {" "}
          <Link href="/forgot-password">Forgot Password?</Link>
        </p>
      </form>

      <Link href="/signup">
        {" "}
        <p className="text-center mt-2">
          Don&apos;t have an account?{" "}
          <span className="text-lime-400">Sign up</span>
        </p>
      </Link>
    </div>
  );
};

export default Login;
