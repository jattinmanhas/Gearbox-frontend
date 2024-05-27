"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { signup } from "@/api/auth";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import Image from "next/image";

const initialState = {
  status: 200,
  message: ""
}

const SignUp = () => {
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupDesign}>
        <img src="/images/signupdesign.jpeg" alt="Sign Up Image" />
      </div>
      <div className={styles.signupForm}>

        <div className={styles.signupHeadingContainer}>
        {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
          <h1>Create a new account</h1>
          <p>Create Your account with Us.</p>
        </div>

        <form action={formAction}>
          <div className={styles.signupEmailContainer}>
            <div className={styles.signupEmail}>
              <label className={styles.signupLabel} htmlFor="email">
                Email <span className={styles.signupRequired}>*</span>
              </label>
              <input
                className={styles.signupInput}
                id="email"
                name="email"
                type="text"
              />
            </div>

            <div className={styles.signupUsername}>
              <label className={styles.signupLabel} htmlFor="username">
                Username <span className={styles.signupRequired}>*</span>
              </label>
              <input
                className={styles.signupInput}
                id="username"
                name="username"
                type="text"
              />
            </div>
          </div>
          <label className={styles.signupLabel} htmlFor="fullname">
            Full Name
          </label>
          <input
            className={styles.signupInput}
            id="fullname"
            name="fullname"
            type="text"
          />

          <label className={styles.signupLabel} htmlFor="password">
            Password <span className={styles.signupRequired}>*</span>
          </label>
          <input
            className={styles.signupInput}
            id="password"
            name="password"
            type="password"
          />

          <label className={styles.signupLabel} htmlFor="mobileno">
            Mobile No.
          </label>
          <input
            className={styles.signupInput}
            id="mobileno"
            name="mobileno"
            type="number"
          />

          <LimeButton name="Sign Up" type="submit" />
        </form>
        <div className={styles.loginAsk}>
        <Link href="/login">
          {" "}
          <p>
            Already have an account?{" "}
            <span>Login</span>
          </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
