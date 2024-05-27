"use client";
import Link from "next/link";
import styles from "./forgot-password.module.css";
import { forgotPassword } from "@/api/auth";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";

const inititalState = {
  status : 500,
  message : ''
}

const ForgotPasswordForm = () => {
  const [state, formAction] = useFormState(forgotPassword, inititalState)

  return (
      <div className={styles.forgotPasswordContainer}>
        {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
        <div className={styles.forgotPassswordHeadingContainer}>
          <h1>Forgot Your Password?</h1>
          <p>Enter email address assoicated with your account and we will send you link to reset your password.</p>
        </div>
        <form className={styles.forgotPasswordForm} action={formAction}>
          <label className={styles.forgotPasswordLabel} htmlFor="email">
            Email
          </label>
          <input
            className={styles.forgotPasswordInput}
            id="email"
            name="email"
            type="text"
          />

          <LimeButton name="Continue" type="submit" />

        </form>
        <Link href="/signup"> <p className="text-center mt-2">Don&apos;t have and account? <span className="text-lime-500">Sign up</span></p></Link>
      </div>
  );
};

export default ForgotPasswordForm;
