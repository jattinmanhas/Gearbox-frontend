"use client";
import Link from "next/link";
import LimeButton from "../Button/limeButton";
import { useFormState } from "react-dom";
import ErrorMessage from "../common/ErrorMessage";
import {FC, useEffect} from 'react';
import { useRouter } from "next/navigation";

const initialState = {
  status: 500,
  message: "",
};

type SignupForm = (prevState: any, formData: FormData) => Promise<{status: number; message: string}>

type Props = {
  action : SignupForm
}

const SignUp:FC<Props> = ({action}: Props) => {
  const [state, formAction] = useFormState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === 200) {
      router.push("/login");
    }
  }, [state, router]);
  
  return (
    <form action={formAction} className="mt-2 grid grid-cols-6 gap-4">
      <div className="col-span-6">
      
      {(state.message && state.status !== 200) && <ErrorMessage message={state.message} /> }
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="FirstName"
          className="block text-sm font-medium text-gray-200"
        >
          First Name
        </label>

        <input
          type="text"
          id="FirstName"
          name="first_name"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="LastName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Last Name
        </label>

        <input
          type="text"
          id="LastName"
          name="last_name"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email <span className="text-red-500">*</span>
        </label>

        <input
          type="email"
          id="Email"
          name="email"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Username <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Password <span className="text-red-500">*</span>
        </label>

        <input
          type="password"
          id="Password"
          name="password"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="MobileNumber"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Mobile Number
        </label>

        <input
          type="number"
          id="MobileNumber"
          name="mobileNo"
          className="mt-1 w-full rounded-md text-sm p-2 bg-inherit border border-l-zinc-50 focus:outline-lime-500"
        />
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our 
          <a href="#" className="text-gray-700 underline dark:text-gray-200">
            &nbsp;terms and conditions&nbsp;
          </a>
          and
          <a href="#" className="text-gray-700 underline dark:text-gray-200">
            &nbsp;privacy policy&nbsp;
          </a>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <LimeButton type="submit" name="Create an Account" />
        <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400 text-center">
          Already have an account?
          <Link href="/login" className="text-gray-700 underline dark:text-gray-200">
          &nbsp;Log in
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default SignUp;
