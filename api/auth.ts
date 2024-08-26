"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@/store/user";

async function setCookie(name: string, value: string, maxage: number) {
  cookies().set(name, value, { maxAge: maxage, httpOnly: true });
}

interface loginUser {
  username: string;
  password: string;
}

type UserResponse = {
  id: number;
  username: string;
  email: string;
  name: string;
};

interface signupUser {
  email: string;
  fullname?: string;
  username: string;
  password: string;
  mobileNo?: string;
}

interface forgotPasswordUser {
  email: string;
}

interface returnResponse {
  flag: boolean;
  data: string;
}

interface resetPassswordUser {
  password: string;
  confirmPassword: string;
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Your API base URL
  withCredentials: true, // Send cookies with requests
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const url = "http://localhost:8080/user/";

function checkInput(input: string) {
  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test if the input matches the email pattern
  if (emailRegex.test(input)) {
    return true;
  } else {
    return false;
  }
}

export async function login(
  prevState: any,
  formData: FormData
): Promise<{ status: number; message: string; user: UserResponse | null }> {
  const username: string = formData.get("username") as string;
  const password: string = formData.get("password") as string;

  if (!username || !password) {
    return {
      status: 400,
      message: "Username/Email or Password cannot be empty",
      user: null,
    };
  }

  let data = {};

  if (await checkInput(username)) {
    data = {
      email: username,
      password: password,
    };
  } else {
    data = {
      username: username,
      password: password,
    };
  }

  try {
    const response = await axiosInstance.post("/user/login", data);

    const token = response.data.data.tokens.token;
    const refreshToken = response.data.data.tokens.refreshToken;

    setCookie("token", token, 900);

    setCookie("refreshToken", refreshToken, 86400);

    return {
      status: response.data.statusCode,
      message: response.data.message,
      user: response.data.data.data,
    };
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        user: null,
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500,
        message: "Server is not responding. Please try again later.",
        user: null,
      };
    }
  }
}

export async function signup(
  prevState: any,
  formData: FormData
): Promise<{ status: number; message: string }> {
  const email: string = formData.get("email") as string;
  const username: string = formData.get("username") as string;
  const password: string = formData.get("password") as string;
  const fullName: string = formData.get("fullname") as string;

  if (!email || !username || !password) {
    return {
      status: 400,
      message: "Username, Email and Password is Required...",
    };
  }

  const signupUrl = `${url}register`;
  const data: signupUser = {
    email: email,
    username: username,
    password: password,
    fullname: fullName,
  };

  try {
    const response = await axios.post(signupUrl, data);
    console.log(response);
    return {
      status: response.data.statusCode,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500,
        message: "Server is not responding. Please try again later.",
      };
    }
  }
}

export async function forgotPassword(
  prevState: any,
  formData: FormData
): Promise<{ status: number; message: string }> {
  const email: string = formData.get("email") as string;

  if (!email) {
    return {
      status: 400,
      message: "Email cannot be empty.",
    };
  }

  let forgotPasswordUrl = `${url}forgot-password`;

  const data: forgotPasswordUser = {
    email: email,
  };

  try {
    const response = await axios.post(forgotPasswordUrl, data);

    return {
      status: response.data.statusCode,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500,
        message: "Server is not responding. Please try again later.",
      };
    }
  }
}

export async function verifyResetToken(token: string): Promise<returnResponse> {
  const resetUrl = `${url}reset-password/${token}`;

  try {
    const response = await axios.get(resetUrl);

    if (response.status === 200) {
      return {
        flag: false,
        data: response.data.message,
      };
    }

    return {
      flag: true,
      data: response.data.message,
    };
  } catch (error: any) {
    return {
      flag: true,
      data: error.response.data.message,
    };
  }
}

export async function resetPassword(formData: any, token: string) {
  const password: string = formData.get("password");
  const confirmPassword: string = formData.get("confirmPassword");

  const resetPasswordUrl = `${url}reset-password/${token}`;

  const data: resetPassswordUser = {
    password: password,
    confirmPassword: confirmPassword,
  };

  try {
    const response = await axios.post(resetPasswordUrl, data);
    if (response.status === 200) {
      return {
        flag: false,
        data: response.data.message,
      };
    }

    return {
      flag: true,
      data: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500, // or any default status code you prefer
        message: "Server is not responding. Please try again later.",
      };
    }
  }
}

export async function getUserDetails() {
  console.log("inside user details");
  try {
    const userUrl = `${url}user`;

    const response = await axios.get(userUrl);
    console.log(response);
  } catch (error: any) {
    // console.log(error);
  }
}

export async function getShopDetails() {
  try {
    const shopUrl = `http://localhost:5000/shop`;

    const response = await fetch(shopUrl, {
      credentials: "include",
      cache: "no-store",
    });

    console.log(response);
    // if(response.status === 401 && response.statusText == 'Unauthorized'){
    //   console.log('inside shop details');
    //   const extendToken = await fetch(`${url}refresh-token`, {
    //     method: 'POST',
    //     headers:{
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({refreshToken: true}),
    //     credentials: 'include',
    //   })

    //   console.log(extendToken)
    // }
  } catch (error: any) {
    // console.log(error);
  }
}

export async function renewAccessToken(refreshToken: string){
  try{
   const response = await fetch("http://localhost:8080/user/refreshToken", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${refreshToken}`,
     },
   });

   const result = await response.json();

   // setting cookies again..
   await setCookie('token', result.data.tokens.token, 900);
   await setCookie(
     "refreshToken",
     result.data.tokens.refreshToken,
     86400
   );

   return result.data;

  }catch(error){
    console.log(error);
  }
}

export async function getUserDetailsFromToken() {
  const token = cookies().get("token")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;
  let user = null;

  if (!token && !refreshToken) {
    return user;
  } else if (!token && refreshToken) {
    // generate tokens again and return user...
    const allData = await renewAccessToken(refreshToken);
    user = allData.data;

    return user;

  } else if (token && refreshToken) {
    const response = await fetch("http://localhost:8080/user/getTokenDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json();
    
    user = {
      id: result.data.id,
      username: result.data.username,
      email: result.data.username,
      role: result.data.role
    }

    return user as User;
  }

  return user;
}

export async function logout(){
  cookies().delete('token')
  cookies().delete('refreshToken')
  
}
