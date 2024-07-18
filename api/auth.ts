"use server";

import axios from "axios";
import { redirect } from "next/navigation";

interface loginUser {
  username: string;
  password: string;
}

type UserResponse =  {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface signupUser {
  email: string;
  name?: string;
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

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your API base URL
  withCredentials: true, // Send cookies with requests
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
});

const url = "http://localhost:5000/admin/";

export async function login(prevState: any, formData: FormData): Promise<{status: number; message:string; user: UserResponse | null; }>{
  const username: string = formData.get("email") as string;
  const password: string = formData.get("password") as string;

  if (!username || !password) {
    return {
      status: 400,
      message: "Username/Email or Password cannot be empty",
      user: null
    };
  }

  const data: loginUser = {
    username: username,
    password: password, // Consider using secure password hashing in production
  };

  try {
    const response = await axiosInstance.post('/admin/login', data);
    console.log(response.data.data.userdata)

    return {
      status: response.data.statusCode,
      message: response.data.message,
      user : {
        id : response.data.data.userdata.id,
        username: response.data.data.userdata.username,
        email: response.data.data.userdata.email,
        name: response.data.data.userdata.name
      }
    }; 
    
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
        user: null
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500,
        message: 'Server is not responding. Please try again later.',
        user: null
      };
    }
  }
}

export async function signup(prevState: any, formData: FormData): Promise<{status: number; message: string}> {
  const email: string = formData.get("email") as string;
  const username: string = formData.get("username") as string;
  const password: string = formData.get("password") as string;
  const first_name: string = formData.get("first_name") as string;
  const last_name: string = formData.get("last_name") as string;
  const mobileno: string = formData.get("mobileNo") as string;

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
    name: first_name + " " + last_name,
    mobileNo: mobileno,
  };

  try {
    const response = await axios.post(signupUrl, data);

    return {
      status: response.data.statusCode,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.error,
      };
    } else {
      // Handle the case where error.response is undefined
      return {
        status: 500, // or any default status code you prefer
        message: 'Server is not responding. Please try again later.',
      };
    }
  }

}

export async function forgotPassword(prevState: any, formData: FormData): Promise<{status: number; message:string;}> {
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
        message: 'Server is not responding. Please try again later.',
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
        message: 'Server is not responding. Please try again later.',
      };
    }

  }
}

export async function getUserDetails(){
  console.log('inside user details');
  try {
    const userUrl = `${url}user`;

    const response = await axios.get(userUrl)
    console.log(response)
    
  } catch (error : any) {
    // console.log(error);
  }
}

export async function getShopDetails(){
  try{
    const shopUrl = `http://localhost:5000/shop`;

    const response = await fetch(shopUrl,{
      credentials: 'include',
      cache: 'no-store'
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

  }catch(error: any){
    // console.log(error);
  }
}

async function refreshTokenRoute(){

}