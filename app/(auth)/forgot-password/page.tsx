import ForgotPasswordForm from '@/components/Auth/forgot-password'
import { forgotPassword } from "@/api/auth";
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center m-2 md:m-10'>
      <h3 className='text-xl font-semibold text-neutral-400'>Gearbox</h3>
      <div className='w-full flex flex-col justify-center items-center place-content-center'>
      <h1 className='text-3xl mt-14 font-bold'>Forgot Password?</h1>
      <ForgotPasswordForm action={forgotPassword} />
      </div>
      <Link className='mt-4' href='/login'>Back to Log in</Link>
    </div>
  )
}

export default ForgotPassword