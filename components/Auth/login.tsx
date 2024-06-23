"use client";
import Link from "next/link";
import styles from "./login.module.css";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  status: 500,
  message: "",
};

type LoginFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ status: number; message: string }>;

type Props = {
  action: LoginFunction;
};

const Login: FC<Props> = ({ action }: Props) => {
  const [state, formAction] = useFormState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === 200) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className={styles.loginFormContainer}>
      <form action={formAction}>
      {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
        <div>
          <div className={styles.loginInputContainer}>
            <label className={styles.loginLabel}>Username Or Email Address</label>
            <input id="email" type="text" name="email" className={styles.loginInput} placeholder="Email/Username" />
          </div>
          <div className={styles.loginInputContainer}>
            <label className={styles.loginLabel}>Password</label>
            <input id="password" type="password" name="password" className={styles.loginInput} placeholder="•••••••••••••" />
          </div>
          <div>
            <LimeButton type="submit" name="Log In" />
          </div>
        </div>
      </form>

      <div><Link className="flex justify-end" href="/forgot-password">Forgot Password?</Link></div>
    </div>
  );
};

export default Login;
