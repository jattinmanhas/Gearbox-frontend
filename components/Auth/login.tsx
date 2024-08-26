"use client";
import Link from "next/link";
import styles from "./login.module.css";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/user";
import { User } from "@/store/user"
import { useState, FormEvent } from "react";

 const initialState = {
  status: 500,
  message: "",
  user: null
};

type UserResponse =  {
  id: number;
  username: string;
  email: string;
  name: string;
}

type LoginFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ status: number; message: string; user: UserResponse | null}>;

type Props = {
  action: LoginFunction;
};

const Login: FC<Props> = ({ action }: Props) => {
  const [state, formAction] = useFormState(action, initialState);

  console.log(state);
  const router = useRouter();
  const { setUser } = userStore();

  useEffect(() => {
    if (state.status === 200) {
      setUser(state.user as User)
      router.push("/");
    }
  }, [state, setUser, router]);
  
  return (
    <div className={styles.loginFormContainer}>
      <form action={formAction}>
      {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
        <div>
          <div className={styles.loginInputContainer}>
            <label className={styles.loginLabel}>Username Or Email Address</label>
            <input id="username" type="text" name="username" className={styles.loginInput} placeholder="Email/Username" required />
          </div>
          <div className={styles.loginInputContainer}>
            <label className={styles.loginLabel}>Password</label>
            <input id="password" type="password" name="password" className={styles.loginInput} placeholder="•••••••••••••" required />
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
