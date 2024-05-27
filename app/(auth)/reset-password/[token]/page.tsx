"use client";

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { verifyResetToken } from '@/api/auth';
import ResetPassword from '@/components/Auth/reset-password';

const ResetPasswordPage = () => {
  const router = useRouter();
  const {token} = useParams();
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verifyToken = async () => {
      try{
        const verifyRoute = await verifyResetToken(token as string);
        if(!verifyRoute.flag){
          setIsValid(true);
        }else{
          setIsValid(false);
          setErrorMessage(verifyRoute.data);
        }        
      }catch(error){
        setIsValid(false)
        setErrorMessage("Server Error...")
      }
    }

    if(token){
      verifyToken()
    }else{
      setIsValid(false)
      setErrorMessage("Token Not Found")
    }

  }, [token, router])
  

  if(isValid === null){
    return <div>Loading...</div>;
  }

  if(!isValid){
    throw new Error(errorMessage)
  }


  return (
    <div>
      {isValid && <ResetPassword/>}
    </div>
  )
}

export default ResetPasswordPage