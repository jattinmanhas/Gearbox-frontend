import Link from "next/link";
import styles from "./reset-password.module.css";
import { resetPassword } from "@/api/auth";
import LimeButton from "../Button/limeButton";
import { useParams, useRouter } from "next/navigation";

const ResetPassword = () => {
    const {token} = useParams();
    const router = useRouter();

    async function handleResetPassword(formData: any){
        const resetStatus = await resetPassword(formData, token as string)

        if(!resetStatus.flag){
          router.push('/login');
        }
    }


  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.resetPasswordHeadingContainer}>
        <h1>Reset Your Password...</h1>
        <p>Enter a new password for your account.</p>
      </div>
      <form className={styles.resetPasswordForm} action={handleResetPassword}>
        <label className={styles.resetPasswordLabel} htmlFor="password">Password</label>
        <input className={styles.resetPasswordInput} id="password" name="password" type="text" />

        <label className={styles.resetPasswordLabel} htmlFor="confirmPassword">Confirm Password</label>
        <input className={styles.resetPasswordInput} id="confirmPassword" name="confirmPassword" type="text" />

        <LimeButton name="Reset Password" type="submit" />

      </form>

      <Link href="/signup"> <p className="text-center mt-2">Don&apos;t have an account? <span className="text-lime-400">Sign up</span></p></Link>
    </div>
  );
};

export default ResetPassword;
