"use client";
import styles from "./forgot-password.module.css";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import { FC } from "react";

const inititalState = {
  status: 500,
  message: "",
};

type ForgotPasswordFunction = (prevState: any, formData: FormData) => Promise<{status: number; message: string}>

type Props = {
  action : ForgotPasswordFunction
}

const ForgotPasswordForm: FC<Props> = ({action}: Props) => {
  const [state, formAction] = useFormState(action, inititalState);

  return (
    <div className={styles.forgotPasswordContainer}>
      {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
      <form action={formAction}>
        <div>
          <div className={styles.InputContainer}>
            <label className={styles.loginLabel}>Email Address</label>
            <input
              id="email"
              type="text"
              name="email"
              className={styles.loginInput}
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <LimeButton type="submit" name="Send Reset Email" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
