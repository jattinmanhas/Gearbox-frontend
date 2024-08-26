import Link from "next/link";
import Login from "@/components/Auth/login";
import { login } from "@/api/auth";


function LoginPage() {
  
  return (
    <>
      <div className="flex flex-col items-center justify-center m-2 md:m-10">
        <h3 className="text-xl font-semibold text-neutral-400">GearBox</h3>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <Login action={login} />
        <Link className="py-3" href="/signup">
          Dont have an account?
        </Link>
      </div>
    </>
  );
}

export default LoginPage;
